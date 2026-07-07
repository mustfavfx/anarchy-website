import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Monitor, Cpu, HardDrive, MemoryStick, Loader2 } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const GITHUB_REPO = 'mustfavfx/Anarchy-ai';

export default function DirectAccess() {
  const { t } = useLanguage()
  const [showRequirements, setShowRequirements] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
      if (!res.ok) throw new Error('Could not fetch release info');
      const data = await res.json();
      const asset = data.assets?.find((a: { name: string }) =>
        a.name.toLowerCase().endsWith('.exe') && a.name.toLowerCase().includes('setup')
      );
      if (!asset) throw new Error('Installer not found in latest release');
      window.open(asset.browser_download_url, '_blank');
    } catch (err: unknown) {
      setDownloadError(err instanceof Error ? err.message : 'Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

  const systemRequirements = {
    os: 'Windows 10/11 (64-bit)',
    processor: 'Intel Core i5 or AMD equivalent',
    memory: '8 GB RAM minimum (16 GB recommended)',
    graphics: 'NVIDIA GTX 1060 / AMD RX 580 or better',
    storage: '500 MB available space',
    internet: 'Required for AI generation'
  }

  return (
    <section id="download" className="py-24 px-6 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-anarchy-dark to-black" />

      {/* Minimal geometric accents */}
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-anarchy-red/5 -rotate-12" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Brutalist frame */}
          <div className="absolute -inset-4 border-2 border-anarchy-red/30 bg-anarchy-dark/80 backdrop-blur-sm" />
          <div className="absolute -inset-8 border border-white/5" />

          <div className="relative p-8 md:p-12 text-center">
            {/* Main headline with brutalist typography */}
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              <span className="block">{t.download.noWaits}.</span>
              <span className="block text-anarchy-red">{t.download.noLimits}.</span>
            </h2>

            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {t.download.description}
            </p>

            {/* CTA Button - Brutalist style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleDownload}
                disabled={downloading}
                whileHover={downloading ? {} : { scale: 1.02, x: 4 }}
                whileTap={downloading ? {} : { scale: 0.98 }}
                className="group relative bg-anarchy-red text-white px-8 py-4 font-bold text-base tracking-wider uppercase overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Shimmer effect */}
                {!downloading && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />}
                <span className="relative flex items-center gap-2">
                  {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                  {downloading ? 'Fetching latest...' : t.download.downloadNow}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setShowRequirements(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white/20 text-white px-6 py-4 font-bold text-base tracking-wider uppercase hover:border-anarchy-red hover:text-anarchy-red transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Monitor size={18} />
                  {t.download.systemRequirements}
                </span>
              </motion.button>
            </div>

            {/* Trust indicator */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {t.download.windows}
              </span>
            </div>

            {/* Download error */}
            {downloadError && (
              <p className="mt-4 text-sm text-red-400">{downloadError}</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* System Requirements Modal */}
      <AnimatePresence>
        {showRequirements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequirements(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-gray-900/95 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-anarchy-red/10 border border-anarchy-red/20 flex items-center justify-center">
                    <Monitor size={24} className="text-anarchy-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{t.download.systemRequirements}</h3>
                    <p className="text-sm text-gray-400">Anarchy AI Desktop</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRequirements(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Requirements List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Monitor size={18} className="text-anarchy-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Operating System</p>
                    <p className="text-white font-medium">{systemRequirements.os}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Cpu size={18} className="text-anarchy-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Processor</p>
                    <p className="text-white font-medium">{systemRequirements.processor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <MemoryStick size={18} className="text-anarchy-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Memory</p>
                    <p className="text-white font-medium">{systemRequirements.memory}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <HardDrive size={18} className="text-anarchy-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Storage</p>
                    <p className="text-white font-medium">{systemRequirements.storage}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  Internet connection required for AI generation features
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
