import { motion } from 'motion/react';
import { useState } from 'react';
import { DollarSign, Building2, Users, Landmark, TrendingDown, FileText } from 'lucide-react';
import { chapter1Quiz } from '../data/quizzes';
import { QuizSection } from './QuizSection';
import { FundingCaseStudy } from './illustrations/FundingCaseStudy';

export function Costs() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const ownershipModels = [
    {
      id: 'utility',
      icon: Building2,
      title: 'Utility-Owned Model',
      description: 'Local utility company invests in the network',
      color: 'from-blue-400 to-cyan-500',
      details: [
        'Utility designs, constructs, and operates the geothermal network',
        'Households subscribe to service, similar to paying gas bill',
        'Costs spread over all ratepayers',
        'Similar to how gas and electricity utilities operate',
        'Collective transition differs from household-by-household approach'
      ],
      pros: ['Established infrastructure', 'Professional operation', 'Shared costs'],
      cons: ['Less local control', 'Regulatory oversight needed']
    },
    {
      id: 'cooperative',
      icon: Users,
      title: 'Community Cooperative',
      description: 'Community-owned and operated system',
      color: 'from-emerald-400 to-green-500',
      details: [
        'Community forms co-op that owns and operates system',
        'Managed on behalf of participants',
        'Does not rely on gas utility company',
        'Decisions made by community members',
        'Local investment stays in community'
      ],
      pros: ['Local ownership', 'Community control', 'Democratic decision-making'],
      cons: ['Higher initial coordination needed', 'Community management required']
    },
    {
      id: 'municipal',
      icon: Landmark,
      title: 'Municipal Utility',
      description: 'Town-owned and managed system',
      color: 'from-orange-400 to-red-500',
      details: [
        'Created and managed by town government',
        'Owned by municipality on behalf of residents',
        'Can align with local policy objectives',
        'Public accountability through town government',
        'May have access to municipal financing'
      ],
      pros: ['Public ownership', 'Local policy alignment', 'Municipal backing'],
      cons: ['Requires government capacity', 'Political considerations']
    }
  ];

  const costFactors = [
    {
      icon: FileText,
      title: 'Type of Technology',
      description: 'Different geothermal systems have varying installation and equipment costs'
    },
    {
      icon: TrendingDown,
      title: 'System Size',
      description: 'Larger networks benefit from economies of scale'
    },
    {
      icon: Landmark,
      title: 'Local Geology',
      description: 'Soil conditions and depth requirements affect drilling costs'
    },
    {
      icon: Users,
      title: 'Number of Buildings',
      description: 'More participants reduce per-building costs'
    },
    {
      icon: DollarSign,
      title: 'Financing Model',
      description: 'Ownership affects eligible capital, cost recovery, and how risks are shared'
    }
  ];

  return (
    <section id="costs" className="py-24 px-6 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-blue-600">1.6</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Costs of Geothermal Systems for District Heating and Cooling
            </h2>
          </div>
          <p className="text-lg text-slate-600 italic mb-6">
            Key Questions: How much would it cost to build a geothermal system? Who pays for the construction?
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-xl">
            <p className="text-slate-700 leading-relaxed">
              The cost of transitioning to a shared geothermal system depends on <strong>the type of technology chosen</strong>, 
              <strong> the size of the system</strong>, <strong> local geologic conditions</strong>, <strong> the number of 
              buildings participating</strong> in the network, and <strong> the financing and ownership model</strong>.
            </p>
          </div>
        </motion.div>

        {/* Cost Factors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Key Cost Factors</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-slate-800">{factor.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{factor.description}</p>
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
          className="mb-16"
        >
          <FundingCaseStudy />
        </motion.div>

        {/* Ownership Models */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Financing & Ownership Models</h3>
          <p className="mb-6 max-w-4xl text-slate-600 leading-relaxed">
            Ownership and financing are linked: the organization that owns the system determines who can borrow, who carries construction and operating risk, and how investment may be recovered through rates, public revenue, member contributions, or other mechanisms.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {ownershipModels.map((model, index) => {
              const Icon = model.icon;
              const isSelected = selectedModel === model.id;

              return (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedModel(isSelected ? null : model.id)}
                  className="cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-2 ${
                      isSelected ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    {/* Header */}
                    <div className={`h-3 bg-gradient-to-r ${model.color}`} />

                    <div className="p-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h4 className="font-bold text-xl mb-2 text-slate-800">{model.title}</h4>
                      <p className="text-sm text-slate-600 mb-4">{model.description}</p>

                      {/* Expandable Content */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: isSelected ? 'auto' : 0,
                          opacity: isSelected ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                          {/* Details */}
                          <div>
                            <h5 className="font-semibold text-sm text-slate-800 mb-2">How it works:</h5>
                            <ul className="space-y-2">
                              {model.details.map((detail, idx) => (
                                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${model.color} mt-1.5 flex-shrink-0`} />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pros & Cons */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <h6 className="font-semibold text-xs text-green-800 mb-2">Advantages</h6>
                              <ul className="space-y-1">
                                {model.pros.map((pro, idx) => (
                                  <li key={idx} className="text-xs text-green-700">✓ {pro}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg">
                              <h6 className="font-semibold text-xs text-amber-800 mb-2">Considerations</h6>
                              <ul className="space-y-1">
                                {model.cons.map((con, idx) => (
                                  <li key={idx} className="text-xs text-amber-700">• {con}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {!isSelected && (
                        <p className="text-xs text-slate-400 mt-4 italic">Click for details</p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Public Sector Involvement */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Landmark className="w-10 h-10 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Public Sector Involvement</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Most district energy systems involve the public sector to some degree, a study by the <strong>New York 
                  State Energy Research and Development Authority (NYSERDA)</strong> has found, ranging from partial to 
                  full ownership of the project.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  The degree of public sector involvement depends on the municipal government's interests in steering the 
                  district energy project to reach local objectives.
                </p>
              </div>
            </div>
          </div>

          {/* Household-by-Household Comparison */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <TrendingDown className="w-10 h-10 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Collective vs. Individual Transition</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  A networked geothermal system shared by a community, but operated by a utility, would likely be paid for 
                  in the same way as gas and electricity utilities—<strong>spreading costs over all ratepayers</strong>.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  This collective transition greatly differs from the scenario without a district system: a few households 
                  may choose to electrify their heating systems on their own. As this household-by-household trend grows, 
                  they leave behind <strong>a dwindling number of customers to shoulder the infrastructure costs of an 
                  entire gas system</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
            <div className="flex items-start gap-4">
              <FileText className="w-10 h-10 text-white flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Understanding Your Community's Costs</h3>
                <p className="text-blue-50 leading-relaxed mb-4">
                  <strong className="text-white">Conducting scoping studies and system design studies</strong> will reveal 
                  more about the costs for your specific location and needs.
                </p>
                <p className="text-blue-50 leading-relaxed">
                  Looking at the experience of similar cities and towns, and their geothermal initiatives, can provide 
                  valuable points for comparison and help estimate potential costs for your community.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16">
          <QuizSection
            quizId="chapter-1-quiz"
            title="Chapter 1 Quiz: Geothermal Basics"
            questions={chapter1Quiz}
          />
        </div>
      </div>
    </section>
  );
}
