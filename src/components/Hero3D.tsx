import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Architecture Node Structure
    const nodeGroup = new THREE.Group();
    
    // Central core
    const coreGeometry = new THREE.IcosahedronGeometry(1, 2);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0xE63030,
      emissive: 0xE63030,
      emissiveIntensity: 0.5,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    nodeGroup.add(core);

    // Surrounding nodes
    const nodePositions = [
      { x: 2, y: 1, z: 0 },
      { x: -2, y: 1, z: 0 },
      { x: 0, y: 2, z: 1 },
      { x: 0, y: -2, z: 1 },
      { x: 1.5, y: -1, z: -1 },
      { x: -1.5, y: -1, z: -1 },
      { x: 2, y: 0, z: 1.5 },
      { x: -2, y: 0, z: 1.5 },
    ];

    const nodes: THREE.Mesh[] = [];
    nodePositions.forEach((pos, i) => {
      const geometry = new THREE.OctahedronGeometry(0.3, 0);
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0xE63030 : 0xffffff,
        emissive: i % 2 === 0 ? 0xE63030 : 0x333333,
        emissiveIntensity: 0.3,
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.set(pos.x, pos.y, pos.z);
      
      // Animate each node
      node.userData = {
        originalPos: { ...pos },
        phase: i * Math.PI / 4,
        speed: 0.5 + Math.random() * 0.5,
      };
      
      nodes.push(node);
      nodeGroup.add(node);

      // Connection lines to core
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(pos.x, pos.y, pos.z),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xE63030,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      nodeGroup.add(line);
    });

    // Connection lines between outer nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 3) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position,
          ]);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
          });
          const line = new THREE.Line(lineGeometry, lineMaterial);
          nodeGroup.add(line);
        }
      }
    }

    scene.add(nodeGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xE63030, 2, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(5, 5, 5);
    scene.add(pointLight2);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xE63030,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.01;
      frameIdRef.current = requestAnimationFrame(animate);

      // Rotate core
      core.rotation.x += 0.002;
      core.rotation.y += 0.003;

      // Animate nodes
      nodes.forEach((node) => {
        const { originalPos, phase, speed } = node.userData;
        node.position.x = originalPos.x + Math.sin(time * speed + phase) * 0.2;
        node.position.y = originalPos.y + Math.cos(time * speed + phase) * 0.2;
        node.position.z = originalPos.z + Math.sin(time * speed * 0.5) * 0.1;
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
      });

      // Mouse interaction
      const targetX = mouseRef.current.x * 0.5;
      const targetY = mouseRef.current.y * 0.5;
      nodeGroup.rotation.y += (targetX - nodeGroup.rotation.y) * 0.05;
      nodeGroup.rotation.x += (targetY - nodeGroup.rotation.x) * 0.05;

      // Animate particles
      particles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      
      // Cleanup
      scene.remove(nodeGroup);
      scene.remove(particles);
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <div 
        ref={containerRef} 
        className="absolute inset-0"
        style={{ cursor: 'none' }}
      />
      
      {/* Overlay Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full border border-anarchy-red/30"
        >
          <p className="text-xs font-mono text-anarchy-red">
            {/* 3D_NODE_ARCHITECTURE */}ARCHITECTURE<br/>
            <span className="text-gray-400">Move mouse to rotate</span>
          </p>
        </motion.div>
      </div>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-anarchy-red font-mono text-sm animate-pulse">
            LOADING_WEBGL_ENGINE...
          </div>
        </div>
      )}
    </div>
  );
}
