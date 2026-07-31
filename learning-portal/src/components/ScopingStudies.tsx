import { motion } from 'motion/react';
import { useState } from 'react';
import { FileText, MapPin, DollarSign, TrendingUp, Layers, Thermometer, Zap } from 'lucide-react';
import { ScopingStudyProcessDiagram } from './illustrations/ScopingStudyProcessDiagram';

export function ScopingStudies() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const components = [
    {
      id: 'geology',
      icon: Layers,
      title: 'Geological Assessment',
      description: 'Soil conditions and underground temperature profiles',
      details: 'Evaluates subsurface characteristics, depth requirements, and thermal properties of the ground to determine optimal drilling locations and system design.',
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'demand',
      icon: TrendingUp,
      title: 'Energy Demand Analysis',
      description: 'Current and projected heating/cooling needs',
      details: 'Analyzes building energy consumption patterns, peak loads, and seasonal variations to size the geothermal system appropriately.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'thermal-resources',
      icon: Thermometer,
      title: 'Local Thermal Resources',
      description: 'Wastewater, ventilation, and commercial or industrial waste heat',
      details: 'Identifies nearby sources and sinks of thermal energy, including wastewater, ventilation exhaust, and commercial or industrial waste heat, that can complement geothermal storage and improve network performance.',
      color: 'from-rose-400 to-orange-500'
    },
    {
      id: 'network',
      icon: MapPin,
      title: 'Network Design',
      description: 'Piping routes and connection infrastructure',
      details: 'Maps out optimal pipe routing, identifies connection points, and plans distribution network to minimize costs while maximizing efficiency.',
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 'capacity',
      icon: Zap,
      title: 'System Capacity',
      description: 'Required equipment and heat exchange sizing',
      details: 'Determines the size and number of heat pumps, heat exchangers, and other equipment needed to meet community demand reliably.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'economics',
      icon: DollarSign,
      title: 'Economic Analysis',
      description: 'Cost estimates and financial projections',
      details: 'Provides capital cost estimates, operating cost projections, payback periods, and compares different financing scenarios.',
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 'timeline',
      icon: FileText,
      title: 'Implementation Timeline',
      description: 'Phasing and construction schedule',
      details: 'Outlines project phases, construction timeline, permits required, and identifies potential challenges or delays.',
      color: 'from-red-400 to-rose-500'
    }
  ];

  const questions = [
    'What is the total heating and cooling demand of potential network buildings?',
    'What local thermal resources can be leveraged?',
    'What are the geological conditions and available land for drilling?',
    'What is the optimal network layout to connect all buildings efficiently?',
    'What equipment is needed and at what scale?',
    'What are the capital and operating costs?',
    'What is the expected payback period?',
    'How will the system be phased or expanded over time?',
    'What permits and approvals are required?'
  ];

  return (
    <section id="scoping-studies" className="py-24 px-6 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-blue-600">3.2</span>
            <h2 className="text-3xl font-bold text-slate-800">Understand Scoping Studies</h2>
          </div>
          <p className="text-lg text-slate-600 italic mb-6">
            Key Questions: What will a system in our community potentially look like?
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-8 rounded-2xl shadow-lg">
            <p className="text-lg text-slate-700 leading-relaxed">
              The coalition will seek to understand the possible contours of a geothermal system in the community. You 
              will likely work with an <strong>engineering consultant on a scoping study</strong>. You will want to be 
              familiar with some key components of a scoping study and what kinds of questions it can help answer.
            </p>
          </div>
        </motion.div>

        {/* Components Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Key Components of a Scoping Study
          </h4>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component, index) => {
              const Icon = component.icon;
              const isHovered = hoveredComponent === component.id;

              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredComponent(component.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                    <div className={`h-3 bg-gradient-to-r ${component.color}`} />
                    
                    <div className="p-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h5 className="font-bold text-xl mb-2 text-slate-800">{component.title}</h5>
                      <p className="text-sm text-slate-600 mb-4">{component.description}</p>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: isHovered ? 'auto' : 0,
                          opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-sm text-slate-700 leading-relaxed">{component.details}</p>
                        </div>
                      </motion.div>

                      {!isHovered && (
                        <p className="text-xs text-slate-400 mt-2 italic">Hover for details</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <ScopingStudyProcessDiagram />
        </motion.div>

        {/* Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Questions a Scoping Study Can Answer
          </h4>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{question}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Consultant Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-start gap-4">
            <FileText className="w-12 h-12 flex-shrink-0" />
            <div>
              <h4 className="text-2xl font-bold mb-3">Working with Engineering Consultants</h4>
              <p className="text-blue-100 leading-relaxed mb-4">
                While understanding these components is valuable for your coalition, you will typically engage professional 
                engineering consultants to conduct the detailed scoping study. Their expertise ensures accurate technical 
                assessments and reliable cost estimates.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Your familiarity with the process helps you ask informed questions, understand the findings, and communicate 
                results effectively to stakeholders and decision-makers.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
