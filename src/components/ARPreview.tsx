import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, Camera, Smartphone, Layers,
  X, Maximize, Rotate3d, Move3d,
  Info, CheckCircle
} from 'lucide-react';

// Mock AR preview component (simulating AR without actual ARKit/ARCore)
export function ARPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'intro' | 'camera' | 'preview' | 'complete'>('intro');
  const [selectedModel, setSelectedModel] = useState<'modern' | 'classic' | 'futuristic'>('modern');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate camera access
  const startCamera = async () => {
    setIsScanning(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Simulate scanning process
      setTimeout(() => {
        setIsScanning(false);
        setStep('preview');
      }, 3000);
    } catch (err) {
      console.error('Camera access denied:', err);
      // Fallback: show preview without camera
      setIsScanning(false);
      setStep('preview');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const buildingModels = {
    modern: {
      name: 'Modern Villa',
      description: 'Contemporary architecture with clean lines',
      features: ['Floor-to-ceiling windows', 'Open floor plan', 'Rooftop terrace'],
      color: 'from-blue-500 to-cyan-500',
    },
    classic: {
      name: 'Classic Estate',
      description: 'Traditional elegance with modern amenities',
      features: ['Columned entrance', 'Symmetrical facade', 'Grand staircase'],
      color: 'from-amber-500 to-orange-500',
    },
    futuristic: {
      name: 'Futuristic Tower',
      description: 'Next-generation sustainable design',
      features: ['Vertical gardens', 'Solar integration', 'AI climate control'],
      color: 'from-purple-500 to-pink-500',
    },
  };

  return (
    <>
      {/* AR Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 z-40 p-3 bg-anarchy-red/10 border border-anarchy-red/30 rounded-lg hover:bg-anarchy-red/20 transition-colors group"
      >
        <div className="relative">
          <Scan size={20} className="text-anarchy-red" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-anarchy-red/50 rounded"
          />
        </div>
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-xs font-mono text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AR Preview
        </span>
      </motion.button>

      {/* AR Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-anarchy-dark border border-white/20 rounded-lg max-w-2xl w-full overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-anarchy-red/20 flex items-center justify-center">
                    <Scan size={20} className="text-anarchy-red" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">AR Architecture Preview</h2>
                    <p className="text-xs text-gray-500 font-mono">Visualize buildings in your space</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsOpen(false); stopCamera(); }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'intro' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(buildingModels).map(([key, model]) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedModel(key as typeof selectedModel)}
                          className={`p-4 rounded-lg border transition-all ${
                            selectedModel === key
                              ? 'border-anarchy-red bg-anarchy-red/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${model.color} mb-3`} />
                          <h3 className="text-white font-medium text-sm">{model.name}</h3>
                          <p className="text-gray-500 text-xs mt-1">{model.description}</p>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Info size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300">
                        Point your camera at a flat surface to visualize the {buildingModels[selectedModel].name} 
                        in your actual environment using augmented reality technology.
                      </p>
                    </div>

                    <button
                      onClick={() => { setStep('camera'); startCamera(); }}
                      className="w-full py-3 bg-anarchy-red hover:bg-red-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Camera size={20} />
                      Start AR Preview
                    </button>
                  </div>
                )}

                {step === 'camera' && (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Scanning overlay */}
                      {isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="text-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              className="w-16 h-16 border-2 border-anarchy-red border-t-transparent rounded-full mx-auto mb-4"
                            />
                            <p className="text-anarchy-red font-mono animate-pulse">
                              SCANNING_SURFACE...
                            </p>
                          </div>
                        </div>
                      )}

                      {/* AR Grid overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(230,48,48,0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(230,48,48,0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: '50px 50px',
                        }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Smartphone size={16} />
                      <span>Point camera at a flat surface</span>
                    </div>
                  </div>
                )}

                {step === 'preview' && (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
                      {/* Simulated 3D Building Preview */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0, rotateY: 0 }}
                          animate={{ scale: 1, rotateY: 360 }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`w-48 h-64 bg-gradient-to-br ${buildingModels[selectedModel].color} rounded-lg relative`}
                          style={{ 
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                          }}
                        >
                          {/* Building details */}
                          <div className="absolute inset-4 border border-white/20 rounded">
                            <div className="absolute top-2 left-2 right-2 h-8 bg-white/10 rounded" />
                            <div className="absolute top-14 left-2 w-8 h-8 bg-white/10 rounded" />
                            <div className="absolute top-14 right-2 w-8 h-8 bg-white/10 rounded" />
                            <div className="absolute bottom-2 left-2 right-2 h-12 bg-white/10 rounded" />
                          </div>
                          
                          {/* Floating labels */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -left-32 top-10 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10"
                          >
                            <p className="text-xs text-white">Height: 12.5m</p>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="absolute -right-32 top-20 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10"
                          >
                            <p className="text-xs text-white">Area: 450m²</p>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Controls */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <button className="p-2 bg-black/60 backdrop-blur rounded-lg hover:bg-black/80 transition-colors">
                          <Rotate3d size={18} className="text-white" />
                        </button>
                        <button className="p-2 bg-black/60 backdrop-blur rounded-lg hover:bg-black/80 transition-colors">
                          <Move3d size={18} className="text-white" />
                        </button>
                        <button className="p-2 bg-black/60 backdrop-blur rounded-lg hover:bg-black/80 transition-colors">
                          <Maximize size={18} className="text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Building Info */}
                    <div className="grid grid-cols-3 gap-4">
                      {buildingModels[selectedModel].features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-xs text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep('camera')}
                        className="flex-1 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        Rescan
                      </button>
                      <button
                        onClick={() => { setStep('complete'); stopCamera(); }}
                        className="flex-1 py-2 bg-anarchy-red text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Confirm Placement
                      </button>
                    </div>
                  </div>
                )}

                {step === 'complete' && (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle size={40} className="text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">AR Preview Complete</h3>
                    <p className="text-gray-400 mb-6">
                      {buildingModels[selectedModel].name} has been successfully visualized
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setStep('intro')}
                        className="px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        Try Another Model
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2 bg-anarchy-red text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// AR Feature Card for showcasing AR capabilities
export function ARFeatureCard() {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-anarchy-red/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-anarchy-red/20 flex items-center justify-center flex-shrink-0">
          <Layers size={24} className="text-anarchy-red" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">AR Visualization</h3>
          <p className="text-gray-400 text-sm mb-3">
            Preview architectural designs in real-world scale using augmented reality.
            Point your device at any surface to see the building come to life.
          </p>
          <div className="flex items-center gap-2 text-xs text-anarchy-red font-mono">
            <Scan size={14} />
            <span>Click the AR button to start</span>
          </div>
        </div>
      </div>
    </div>
  );
}
