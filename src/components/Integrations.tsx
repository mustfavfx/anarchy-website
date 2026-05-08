import { motion } from 'framer-motion';

const integrations = [
  { name: '3ds Max', status: 'available', color: '#0096D6', letter: '3' },
  { name: 'Revit', status: 'available', color: '#007DC5', letter: 'R' },
  { name: 'AutoCAD', status: 'available', color: '#E63030', letter: 'A' },
  { name: 'SketchUp', status: 'coming', color: '#6B6B6B', letter: 'S' },
  { name: 'ArchiCAD', status: 'coming', color: '#6B6B6B', letter: 'C' },
];

export function Integrations() {
  return (
    <section id="integrations" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">
            Works with your existing tools
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {integrations.map((tool) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 glass px-5 py-3 rounded-xl border border-white/5 relative"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.letter}
                </div>
                <span className="text-white text-sm font-medium">{tool.name}</span>
                {tool.status === 'coming' && (
                  <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
