import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Home, Wind, Droplets, Waves, ArrowDownUp, ThermometerSun } from 'lucide-react';
import { HeatPumpDiagram } from './illustrations/HeatPumpDiagram';
import {
  GeothermalHeatPumpScene,
  type GeothermalSeason,
} from './illustrations/GeothermalHeatPumpScene';

export function IndividualHomeHeating() {
  const [hoveredPump, setHoveredPump] = useState<string | null>(null);
  const [showHVAC, setShowHVAC] = useState(false);
  const [heatPumpMode, setHeatPumpMode] = useState<'heating' | 'cooling'>('heating');

  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneInView = useInView(sceneRef, { amount: 0.3 });
  const sceneReduceMotion = useReducedMotion();
  const [sceneSeason, setSceneSeason] = useState<GeothermalSeason>('winter');
  const [sceneAutoPlaying, setSceneAutoPlaying] = useState(true);

  useEffect(() => {
    if (!sceneAutoPlaying || !sceneInView || sceneReduceMotion !== false) {
      return;
    }
    // 4s hold + 0.7s wipe.
    const timer = window.setInterval(() => {
      setSceneSeason((current) => (current === 'winter' ? 'summer' : 'winter'));
    }, 4700);
    return () => window.clearInterval(timer);
  }, [sceneAutoPlaying, sceneInView, sceneReduceMotion]);

  const handleSceneSeasonChange = (next: GeothermalSeason) => {
    // A reader taking control stops the cycle; the animation must not fight them.
    setSceneAutoPlaying(false);
    setSceneSeason(next);
  };

  const heatPumps = [
    {
      id: 'air-source',
      icon: Wind,
      title: 'Air-Source Heat Pumps',
      description: 'Most common type of heat pump',
      details:
        'They are efficient at a wide range of temperatures, although when outside air temperature nears freezing (32°F or 0°C), they can become less efficient and may need a backup system.',
      color: 'from-sky-400 to-blue-500',
      position: { x: -120, y: 0 },
    },
    {
      id: 'ground-source',
      icon: Droplets,
      title: 'Ground-Source Heat Pumps',
      description: 'Uses earth as source and sink',
      details:
        'Because the temperature underground is relatively stable compared to the outdoor air temperature, the heat pump can operate year-round. The heat exchange can occur through horizontal systems (shallow trenches) or vertical systems (some drilling required), or with a local body of water such as a pond or lake.',
      color: 'from-emerald-400 to-green-600',
      position: { x: 0, y: -120 },
    },
    {
      id: 'water-source',
      icon: Waves,
      title: 'Water-Source Heat Pumps',
      description: 'Uses bodies of water',
      details:
        'River water, sewers, or other bodies of water can be the heat source and sink. Temperatures underwater are more stable than outside air temperatures, providing a useful source of thermal energy in winter (and a place to reject heat in summer). Systems can be set up so there is no direct contact between the water source and the system inside the home.',
      color: 'from-cyan-400 to-teal-500',
      position: { x: 120, y: 0 },
    },
  ];

  return (
    <section
      id="individual-heating"
      className="py-24 px-6 bg-gradient-to-br from-slate-50 to-blue-50 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-blue-600">1.2</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Individual Home Heating (or Cooling)
            </h2>
          </div>
          <p className="text-lg text-slate-600 italic">
            Key Questions: What is an HVAC system? What is a heat pump and what
            are its sources of energy?
          </p>
        </motion.div>

        {/* HVAC System Interactive Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
            <div className="flex items-start gap-4 mb-6">
              <Home className="w-10 h-10 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  What is an HVAC System?
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Every building has an{' '}
                  <strong>HVAC system—heating, ventilation, and air conditioning</strong>
                  —to maintain appropriate indoor temperature and humidity. There are
                  many kinds of heating equipment, such as furnaces and electric
                  baseboard heaters; and cooling equipment, such as air conditioners.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: showHVAC ? 1 : 0,
                height: showHVAC ? 'auto' : 0,
              }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl mb-4">
                <div className="flex items-start gap-4">
                  <ArrowDownUp className="w-8 h-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-slate-800">
                      Understanding Heat Pumps
                    </h4>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      One type of device that can provide both heating and cooling is
                      the <strong>heat pump</strong>: when the weather is hot, it moves
                      thermal energy from inside the home to the outside; and when the
                      weather is cool, it can pull thermal energy from the outside into
                      the home. They are relatively efficient machines with a
                      well-established track record.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      In addition to an HVAC system, many buildings have{' '}
                      <strong>boilers</strong>, which may use electricity or combust
                      natural gas, to produce hot water for direct use by building
                      occupants. Some types of equipment can use heat pumps instead of
                      boilers.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <button
              onClick={() => setShowHVAC(!showHVAC)}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {showHVAC ? 'Hide Details' : 'Learn About Heat Pumps'}
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={sceneRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="mb-2 text-center text-2xl font-bold text-slate-800">
            A geothermal heat pump through the year
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-slate-600">
            The same loop of pipe serves the house all year. Only the direction the heat travels
            changes.
          </p>
          <GeothermalHeatPumpScene
            season={sceneSeason}
            onSeasonChange={handleSceneSeasonChange}
            isAutoPlaying={sceneAutoPlaying}
            onAutoPlayToggle={() => setSceneAutoPlaying((playing) => !playing)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50 p-8 shadow-xl">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Follow the heat, season by season</h3>
                <p className="mt-2 max-w-2xl text-slate-600">
                  A ground-source heat pump reverses the direction of heat flow with the season. Choose a season to see where heat begins, where it goes, and what the heat pump does.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHeatPumpMode('heating')}
                  aria-pressed={heatPumpMode === 'heating'}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    heatPumpMode === 'heating'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-orange-50'
                  }`}
                >
                  Winter heating
                </button>
                <button
                  type="button"
                  onClick={() => setHeatPumpMode('cooling')}
                  aria-pressed={heatPumpMode === 'cooling'}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    heatPumpMode === 'cooling'
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-cyan-50'
                  }`}
                >
                  Summer cooling
                </button>
              </div>
            </div>

            <HeatPumpDiagram mode={heatPumpMode} />
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              These original diagrams follow the same seasonal principle illustrated by the{' '}
              <a
                href="https://www.energy.gov/hgeo/geothermal/geothermal-heat-pumps"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900"
              >
                U.S. Department of Energy’s geothermal heat-pump overview
              </a>
              .
            </p>
          </div>
        </motion.div>

        {/* Heat Pump Types - Branch Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Types of Heat Pumps
          </h3>

          {/* ✅ IMPORTANT: z-0 creates a stacking context so SVG can sit behind */}
          <div className="relative z-0">
            {/* Center Node */}
            <div className="flex justify-center mb-16">
              {/* ✅ IMPORTANT: z-10 pulls center node above SVG */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10 bg-gradient-to-br from-orange-400 to-red-500 text-white p-8 rounded-2xl shadow-2xl"
              >
                <ThermometerSun className="w-12 h-12 mx-auto mb-4" />
                <h4 className="font-bold text-xl text-center">Heat Pump</h4>
                <p className="text-sm text-center mt-2 text-white/90">
                  Heating & Cooling
                </p>
              </motion.div>
            </div>

            {/* Connection Lines */}
            {/* ✅ IMPORTANT: -z-10 puts the lines behind everything else */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
              <line
                x1="50%"
                y1="120"
                x2="20%"
                y2="300"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="50%"
                y1="120"
                x2="50%"
                y2="300"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="50%"
                y1="120"
                x2="80%"
                y2="300"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Branch Cards */}
            {/* ✅ IMPORTANT: z-10 pulls cards above SVG */}
            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              {heatPumps.map((pump) => {
                const Icon = pump.icon;
                const isHovered = hoveredPump === pump.id;

                return (
                  <motion.div
                    key={pump.id}
                    onMouseEnter={() => setHoveredPump(pump.id)}
                    onMouseLeave={() => setHoveredPump(null)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      {/* Header with gradient */}
                      <div className={`h-2 bg-gradient-to-r ${pump.color}`} />

                      <div className="p-6">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pump.color} flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        <h4 className="font-bold text-xl mb-2 text-slate-800">
                          {pump.title}
                        </h4>
                        <p className="text-sm text-slate-600 mb-4 font-semibold">
                          {pump.description}
                        </p>

                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isHovered ? 'auto' : 0,
                            opacity: isHovered ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-slate-200">
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {pump.details}
                            </p>
                          </div>
                        </motion.div>

                        {!isHovered && (
                          <p className="text-xs text-slate-400 mt-4 italic">
                            Hover for details
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
