import { useEffect, useRef } from 'react';
import type * as THREE from 'three';

// Vertex Shader for gradient mesh
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader - Gradient noise
const gradientShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Create flowing noise
    float noise1 = snoise(uv * 3.0 + uTime * 0.1);
    float noise2 = snoise(uv * 2.0 - uTime * 0.15 + 100.0);
    float noise3 = snoise(uv * 4.0 + uTime * 0.05 + 200.0);
    
    // Mouse influence
    float mouseDist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
    
    // Combine noises
    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    combinedNoise += mouseInfluence;
    
    // Colors - Anarchy Red palette
    vec3 color1 = vec3(0.902, 0.188, 0.188); // #E63030
    vec3 color2 = vec3(0.1, 0.1, 0.1);       // Dark
    vec3 color3 = vec3(0.9, 0.4, 0.1);       // Orange accent
    
    // Mix colors based on noise
    vec3 finalColor = mix(color2, color1, combinedNoise * 0.5 + 0.5);
    finalColor = mix(finalColor, color3, mouseInfluence * 2.0);
    
    gl_FragColor = vec4(finalColor, 0.25);
  }
`;

// Plasma Shader
const plasmaShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    float t = uTime * 0.3;
    
    float v1 = sin(uv.x * 10.0 + t);
    float v2 = sin(uv.y * 8.0 + t * 1.5);
    float v3 = sin((uv.x + uv.y) * 6.0 + t * 0.5);
    float v4 = sin(sqrt(uv.x * uv.x + uv.y * uv.y) * 12.0 + t);
    
    float plasma = (v1 + v2 + v3 + v4) / 4.0;
    
    vec3 color = vec3(
      0.5 + 0.5 * sin(plasma * 3.14159 + t),
      0.5 + 0.5 * sin(plasma * 3.14159 + t + 2.094),
      0.5 + 0.5 * sin(plasma * 3.14159 + t + 4.189)
    );
    
    // Anarchy red tint
    color.r = mix(color.r, 0.9, 0.5);
    
    gl_FragColor = vec4(color, 0.2);
  }
`;

// Wave Shader
const waveShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    float dist = distance(uv, uMouse);
    float wave = sin(dist * 20.0 - uTime * 2.0) * 0.5 + 0.5;
    wave *= smoothstep(1.0, 0.0, dist);
    
    vec3 color = vec3(0.902, 0.188, 0.188) * wave;
    color += vec3(0.1) * (1.0 - wave);
    
    gl_FragColor = vec4(color, 0.15);
  }
`;

interface ShaderBackgroundProps {
  type?: 'gradient' | 'plasma' | 'wave';
  className?: string;
}

export function ShaderBackground({ type = 'gradient', className = '' }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Dynamic import of Three.js
    import('three').then((THREE) => {
      const container = containerRef.current!;
      
      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Camera
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      cameraRef.current = camera;
      
      // Renderer
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Geometry
      const geometry = new THREE.PlaneGeometry(2, 2);
      
      // Select shader
      let fragmentShader = gradientShader;
      if (type === 'plasma') fragmentShader = plasmaShader;
      if (type === 'wave') fragmentShader = waveShader;
      
      // Material
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        },
        transparent: true,
      });
      materialRef.current = material;
      
      // Mesh
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      // Animation
      let time = 0;
      const animate = () => {
        time += 0.01;
        material.uniforms.uTime.value = time;
        material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        renderer.render(scene, camera);
        frameIdRef.current = requestAnimationFrame(animate);
      };
      animate();
      
      // Mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = (e.clientX - rect.left) / rect.width;
        mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
      };
      
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      
      // Resize
      const handleResize = () => {
        if (!container) return;
        renderer.setSize(container.clientWidth, container.clientHeight);
        material.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        cancelAnimationFrame(frameIdRef.current);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handleMouseMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    });
  }, [type]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}

// Preset shader effects
export function ShaderEffects() {
  return (
    <>
      <ShaderBackground type="gradient" />
    </>
  );
}

// Individual shader components for specific sections
export function GradientMesh({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ShaderBackground type="gradient" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function PlasmaEffect({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ShaderBackground type="plasma" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function WaveEffect({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ShaderBackground type="wave" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
