import { motion, useReducedMotion } from 'motion/react';

const financingSources = [
  {
    label: 'City Capital Financing Fund',
    amount: 'CAD $17.5M',
    share: 54,
    color: '#2563eb',
  },
  {
    label: 'Government of Canada Gas Tax Fund',
    amount: 'CAD $10.2M',
    share: 31,
    color: '#0f766e',
  },
  {
    label: 'Federation of Canadian Municipalities Green Municipal Fund',
    amount: 'CAD $5.0M',
    share: 15,
    color: '#f97316',
  },
];

export function FundingCaseStudy() {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = shouldReduceMotion === false;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg" aria-labelledby="funding-case-study-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Documented financing example</p>
          <h4 id="funding-case-study-title" className="mt-1 text-xl font-bold text-slate-800">
            Vancouver Southeast False Creek Neighborhood Energy Utility (2010)
          </h4>
        </div>
        <span className="w-fit rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">District energy case</span>
      </div>

      <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
        This city-owned district-heating project used sewer waste heat, so it is a thermal energy network example rather than a geothermal project. It is shown because its published financing structure is transparent—not as a universal project budget.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Published loan sources</p>
        <div
          className="mt-3 flex h-11 overflow-hidden rounded-lg"
          role="img"
          aria-label="Published loan sources: 54 percent City Capital Financing Fund, 31 percent Government of Canada Gas Tax Fund, and 15 percent Federation of Canadian Municipalities Green Municipal Fund."
        >
          {financingSources.map((source, index) => (
            <motion.div
              key={source.label}
              className="flex items-center justify-center text-xs font-bold text-white"
              style={{ width: `${source.share}%`, backgroundColor: source.color, transformOrigin: 'center' }}
              initial={shouldAnimate ? { opacity: 0, scale: 0.85 } : false}
              whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.1,
              }}
            >
              {source.share}%
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {financingSources.map((source, index) => (
            <motion.div
              key={source.label}
              className="flex items-start gap-2 text-sm text-slate-700"
              initial={shouldAnimate ? { opacity: 0, scale: 0.96 } : false}
              whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.08 + 0.2 }}
              style={{ transformOrigin: 'left center' }}
            >
              <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-sm" style={{ backgroundColor: source.color }} />
              <span>
                <strong className="block text-slate-800">{source.amount}</strong>
                {source.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        <strong>Why ownership matters:</strong> because the City owned the utility, it could use municipal and public lending and recover costs through customer rates. A utility-owned, cooperative, or private model can open different sources of capital and assign risk differently.
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        The case study reports a CAD $32M project cost and lists CAD $32.7M in published loan sources; the proportional bar uses those listed loan amounts, which are rounded in the source.
      </p>
      <a
        href="https://drive.google.com/file/d/18tNzpeYsLNEtzXVrOmgvJSCbm21CWrKK/view"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900"
      >
        Source: District Energy in Cities (2015), Chapter 3, Case Study 3.1, p. 89
      </a>
    </aside>
  );
}
