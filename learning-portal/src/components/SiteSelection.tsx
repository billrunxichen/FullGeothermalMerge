import { motion } from 'motion/react';
import { useState } from 'react';
import { MapPin, CheckCircle, Building2, Home, Factory, School, Users } from 'lucide-react';
import { SiteSelectionDiagram } from './illustrations/SiteSelectionDiagram';

export function SiteSelection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const goodFeatures = [
    {
      icon: Building2,
      title: 'High Energy Demand',
      description: 'Buildings with substantial heating/cooling needs',
      details: 'Large energy users maximize the efficiency and economic benefits of geothermal connections. Look for buildings with year-round HVAC needs.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Proximity to Others',
      description: 'Close to other potential network nodes',
      details: 'Buildings near each other reduce piping costs and make the network more efficient. Dense clusters are ideal starting points.',
      color: 'from-emerald-400 to-green-500'
    },
    {
      icon: CheckCircle,
      title: 'Ready for Retrofit',
      description: 'Scheduled renovations or aging systems',
      details: 'Buildings planning upgrades or with old heating systems are cost-effective targets. Timing renovations with network installation saves money.',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Users,
      title: 'Supportive Ownership',
      description: 'Owners interested in sustainability',
      details: 'Engaged building owners who understand benefits make implementation smoother. Municipal or institutional ownership can accelerate adoption.',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const buildingTypes = [
    {
      icon: School,
      name: 'Civic Buildings',
      examples: ['Schools', 'Libraries', 'Town halls', 'Community centers'],
      color: 'bg-blue-500'
    },
    {
      icon: Building2,
      name: 'Commercial',
      examples: ['Office buildings', 'Retail spaces', 'Hotels', 'Restaurants'],
      color: 'bg-emerald-500'
    },
    {
      icon: Home,
      name: 'Residential',
      examples: ['Apartment buildings', 'Condominiums', 'Housing developments', 'Single-family homes'],
      color: 'bg-orange-500'
    },
    {
      icon: Factory,
      name: 'Industrial',
      examples: ['Manufacturing', 'Warehouses', 'Food processing', 'Greenhouses'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <section id="site-selection" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-emerald-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl mb-8">
            <h2 className="text-4xl font-bold mb-4">Getting Physical: Places & The Public</h2>
            <p className="text-xl text-green-100">
              Engage potential users, decision-makers, local utilities, and other parts of the community. Develop an 
              engagement plan customized for your community.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-blue-600">3.1</span>
            <h3 className="text-3xl font-bold text-slate-800">A First Look: Site Selection</h3>
          </div>
          <p className="text-lg text-slate-600 italic">
            Key Questions: What makes a good site for a geothermal energy network or thermal energy network?
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Geothermal networks have many <strong>nodes: buildings that connect to the network</strong>. What are some 
              potential places that are good sites for connection? Get familiar with some of the key features of good nodes.
            </p>
            <p className="text-slate-700 leading-relaxed">
              While you are likely to work with an engineering consultant to undertake a detailed study, it is helpful to 
              understand the landscape of possibility in your town. <strong>Some of these buildings might even join your 
              coalition and become organizers!</strong>
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
          <SiteSelectionDiagram />
        </motion.div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h4 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Key Features of Good Network Nodes
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            {goodFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isSelected = selectedFeature === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelectedFeature(isSelected ? null : index)}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                >
                  <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                    isSelected ? 'border-blue-500' : 'border-transparent'
                  }`}>
                    <div className={`h-3 bg-gradient-to-r ${feature.color}`} />
                    
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-xl mb-2 text-slate-800">{feature.title}</h5>
                          <p className="text-slate-600">{feature.description}</p>
                        </div>
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
                        <div className={`pt-4 border-t border-slate-200 bg-gradient-to-r ${feature.color} bg-opacity-10 p-4 rounded-lg`}>
                          <p className="text-sm text-slate-700 leading-relaxed">{feature.details}</p>
                        </div>
                      </motion.div>

                      {!isSelected && (
                        <p className="text-xs text-slate-400 mt-4 italic">Click for more details</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Building Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Types of Potential Network Buildings
          </h4>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {buildingTypes.map((type, index) => {
              const Icon = type.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`${type.color} p-6 text-white`}>
                    <Icon className="w-10 h-10 mb-3" />
                    <h5 className="font-bold text-xl">{type.name}</h5>
                  </div>
                  
                  <div className="p-4">
                    <ul className="space-y-2">
                      {type.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-emerald-600 p-3 text-white shadow-sm">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h5 className="font-bold text-xl text-slate-800">Community-scale site selection</h5>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  A promising network site is usually a connected group of buildings, not a single parcel. Available land,
                  street access, nearby demand, and local thermal resources shape the opportunity together.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
