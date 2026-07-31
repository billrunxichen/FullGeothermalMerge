import { motion } from 'motion/react';
import { useState } from 'react';
import { Building2, Flame, Snowflake, Zap, Network, Users } from 'lucide-react';
import { ThermalNetworkDiagram } from './illustrations/ThermalNetworkDiagram';

export function DistrictHeating() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const systems = [
    {
      id: 'district-heating',
      icon: Flame,
      title: 'District Heating System',
      type: 'Centralized',
      description: 'Large heating facility connected to multiple buildings',
      details: 'Sends steam or hot water to provide thermal energy for space heating, and to generate "domestic hot water" for direct use in the home.',
      color: 'from-red-400 to-orange-500',
      benefits: ['Economies of scale', 'More efficient than individual boilers', 'Serves multiple buildings']
    },
    {
      id: 'district-cooling',
      icon: Snowflake,
      title: 'District Cooling System',
      type: 'Centralized',
      description: 'Large cooling facility connected to multiple buildings',
      details: 'Sends chilled water to cool homes and offices. Due to economies of scale, a single large facility can be much more efficient than having separate, smaller boilers or furnaces in each home.',
      color: 'from-cyan-400 to-blue-500',
      benefits: ['Energy efficient cooling', 'Reduced individual equipment', 'Centralized maintenance']
    },
    {
      id: 'chp',
      icon: Zap,
      title: 'Combined Heat & Power (CHP)',
      type: 'Centralized',
      description: 'Co-generation system providing multiple services',
      details: 'The same facility can provide a combination of electricity generation, hot water for district heating, and (in some cases) use the waste heat to produce chilled water. Also called "co-generation."',
      color: 'from-yellow-400 to-orange-500',
      benefits: ['Multi-purpose facility', 'Waste heat utilization', 'Maximum efficiency']
    },
    {
      id: 'geothermal-district',
      icon: Building2,
      title: 'Geothermal District System',
      type: 'Centralized',
      description: 'District system using geothermal energy',
      details: 'Uses geothermal energy as the source of heat (for heating), or the sink to reject heat into (for cooling). Relies on the same principles as individual heat pumps, but on a larger scale. There is still a centralized geothermal facility that provides hot water or chilled water to the rest of the buildings.',
      color: 'from-emerald-400 to-green-600',
      benefits: ['Renewable energy source', 'Lower emissions', 'Centralized facility'],
      isGeothermal: true
    },
    {
      id: 'gen',
      icon: Network,
      title: 'Geothermal Energy Network (GEN)',
      type: 'Decentralized',
      description: 'Fifth generation district heating and cooling system',
      details: 'A decentralized system where connected buildings can exchange low-temperature heat. It is called a geothermal energy network because shallow boreholes provide geothermal energy storage: the ground can store and release thermal energy as the network balances heating and cooling.',
      color: 'from-purple-400 to-pink-500',
      benefits: ['No central facility needed', 'Buildings share energy', 'Maximum flexibility'],
      isGeothermal: true,
      isNetwork: true
    },
    {
      id: 'ten',
      icon: Users,
      title: 'Thermal Energy Network (TEN)',
      type: 'Decentralized',
      description: 'GEN-like network with additional thermal sources',
      details: 'Like a GEN, a TEN can use a decentralized network that connects buildings and balances heating and cooling. A TEN expands the possible thermal sources beyond shallow boreholes to include wastewater, ventilation exhaust, and commercial or industrial waste heat.',
      color: 'from-indigo-400 to-blue-500',
      benefits: ['Multiple heat sources', 'Waste heat recovery', 'Flexible configuration'],
      isNetwork: true
    }
  ];

  return (
    <section id="district-heating" className="py-24 px-6 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-blue-600">1.3</span>
            <h2 className="text-4xl font-bold text-slate-800">District Heating (or Cooling)</h2>
          </div>
          <p className="text-lg text-slate-600 italic mb-6">
            Key Questions: What is a thermal energy network (TEN)? Why are we interested in "networks"? 
            What are geothermal energy networks?
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl">
            <p className="text-slate-700 leading-relaxed">
              Instead of only transforming an individual home, we can also implement <strong>heating and cooling systems 
              that share resources across multiple buildings</strong>. These systems deliver energy across a network and can 
              be either centralized (with one main facility) or decentralized (with distributed sources).
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <ThermalNetworkDiagram />
        </motion.div>

        {/* Systems Comparison Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system) => {
              const Icon = system.icon;
              const isSelected = selectedSystem === system.id;

              return (
                <motion.div
                  key={system.id}
                  onClick={() => setSelectedSystem(isSelected ? null : system.id)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative cursor-pointer"
                >
                  <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-2 ${
                    isSelected ? 'border-blue-500' : 'border-transparent'
                  }`}>
                    {/* Header Gradient */}
                    <div className={`h-3 bg-gradient-to-r ${system.color}`} />

                    {/* Badge */}
                    <div className="absolute top-6 right-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        system.type === 'Centralized' 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {system.type}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${system.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="font-bold text-xl mb-2 text-slate-800">{system.title}</h3>
                      <p className="text-sm text-slate-600 mb-4 font-semibold">{system.description}</p>

                      {/* Special badges */}
                      <div className="flex gap-2 mb-4">
                        {system.isGeothermal && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                            Geothermal
                          </span>
                        )}
                        {system.isNetwork && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                            Network
                          </span>
                        )}
                      </div>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: isSelected ? 'auto' : 0,
                          opacity: isSelected ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-slate-200 space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-slate-800 mb-2">How it works:</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">{system.details}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm text-slate-800 mb-2">Key Benefits:</h4>
                            <ul className="space-y-1">
                              {system.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${system.color} mt-1.5 flex-shrink-0`} />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>

                      {!isSelected && (
                        <p className="text-xs text-slate-400 mt-4 italic">Click for details</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Important Distinction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">!</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Important Distinction</h3>
              <div className="space-y-3 text-slate-700">
                <p className="leading-relaxed">
                  <strong>Centralized systems</strong> (District Heating, District Cooling, CHP, Geothermal District) have 
                  a single main facility that provides energy to all connected buildings. The source of heating and cooling 
                  is centralized in one location.
                </p>
                <p className="leading-relaxed">
                  <strong>Decentralized systems</strong> (GEN, TEN) are fifth-generation district heating and cooling systems
                  that can exchange low-temperature heat among connected buildings and thermal resources. Rather than relying
                  on one plant to serve every building, they use distributed heat pumps, boreholes, and—depending on the system—other sources.
                </p>
                <div className="bg-white/50 p-4 rounded-lg mt-4">
                  <p className="text-sm font-semibold text-orange-800">
                    These are not the same—the key difference is whether one central source supplies the network or distributed sources and sinks are connected across it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-2xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-sky-50 p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Terminology bridge</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">Geothermal names the resource; district heating and cooling names the configuration.</h3>
          <p className="mt-3 max-w-4xl leading-relaxed text-slate-700">
            <strong>Geothermal</strong> identifies the ground-based thermal resource or storage used by a system. <strong>District heating and cooling</strong> describes how thermal energy is distributed among multiple buildings. A district system may use geothermal energy, wastewater, waste heat, or another source; these terms answer different questions about the same project.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
