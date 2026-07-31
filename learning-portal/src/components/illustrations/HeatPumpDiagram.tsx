import { motion, useReducedMotion } from 'motion/react';

interface HeatPumpDiagramProps {
  mode?: 'heating' | 'cooling';
}

export function HeatPumpDiagram({ mode = 'heating' }: HeatPumpDiagramProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = shouldReduceMotion === false;
  const isHeating = mode === 'heating';
  const accent = isHeating ? '#ea580c' : '#0891b2';
  const accentPale = isHeating ? '#fff7ed' : '#ecfeff';
  const title = isHeating
    ? 'Winter heating: heat moves from the ground into the home'
    : 'Summer cooling: heat moves from the home into the ground';
  const route = isHeating
    ? 'Heat travels from the ground loop to the home.'
    : 'Heat travels from the home to the ground loop.';

  const steps = isHeating
    ? [
        { number: '1', title: 'Ground loop', detail: 'Collects low-temperature heat', x: 126 },
        { number: '2', title: 'Heat pump', detail: 'Raises the temperature', x: 360 },
        { number: '3', title: 'Home', detail: 'Delivers indoor comfort', x: 594 },
      ]
    : [
        { number: '3', title: 'Ground loop', detail: 'Absorbs released heat', x: 126 },
        { number: '2', title: 'Heat pump', detail: 'Moves heat outdoors', x: 360 },
        { number: '1', title: 'Home', detail: 'Collects indoor heat', x: 594 },
      ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isHeating ? 'text-orange-700' : 'text-cyan-700'}`}>
            {isHeating ? 'Winter heating' : 'Summer cooling'}
          </p>
          <h4 className="mt-2 text-2xl font-bold text-slate-900">{title}</h4>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Follow one heat packet as it moves through the system. The equipment stays the same; only the direction changes.
          </p>
        </div>
        <span className="w-fit rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: accentPale, color: accent }}>
          {route}
        </span>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-3 py-4 sm:px-6 sm:py-6">
        <svg
          viewBox="0 0 720 290"
          className="h-auto w-full"
          role="img"
          aria-labelledby="heat-flow-diagram-title heat-flow-diagram-description"
        >
          <title id="heat-flow-diagram-title">{title}</title>
          <desc id="heat-flow-diagram-description">
            A three-step heat-pump system: a ground loop, a heat pump, and a home. One moving dot shows the direction heat travels.
          </desc>

          <rect width="720" height="290" rx="18" fill="#f8fafc" />
          <rect y="211" width="720" height="79" fill="#dcfce7" />
          <path d="M0 211 H720" stroke="#86efac" strokeWidth="3" />

          <path d="M212 145 H274 M446 145 H508" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
          <path d="M212 145 H274 M446 145 H508" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

          <g>
            <rect x="39" y="71" width="173" height="117" rx="14" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="126" y="101" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Ground loop</text>
            <text x="126" y="120" textAnchor="middle" fontSize="11" fill="#475569">stable earth temperature</text>
            <path d="M86 135 V218 Q86 232 101 232 Q116 232 116 218 V151" fill="none" stroke="#0f766e" strokeWidth="7" strokeLinecap="round" />
            <path d="M136 135 V218 Q136 232 151 232 Q166 232 166 218 V151" fill="none" stroke="#0f766e" strokeWidth="7" strokeLinecap="round" />
            <line x1="86" y1="151" x2="116" y2="151" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" />
            <line x1="136" y1="151" x2="166" y2="151" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" />
          </g>

          <g>
            <rect x="274" y="71" width="172" height="117" rx="14" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
            <rect x="292" y="88" width="136" height="21" rx="5" fill="#1e3a8a" />
            <text x="360" y="103" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">HEAT PUMP</text>
            <circle cx="360" cy="145" r="27" fill={accentPale} stroke={accent} strokeWidth="3" />
            <circle cx="360" cy="145" r="8" fill={accent} />
            <path d="M338 145 H382 M360 123 V167" stroke={accent} strokeWidth="3" strokeLinecap="round" />
            <text x="360" y="177" textAnchor="middle" fontSize="11" fill="#475569">moves heat with electricity</text>
          </g>

          <g>
            <rect x="508" y="71" width="173" height="117" rx="14" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="594" y="101" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Home</text>
            <text x="594" y="120" textAnchor="middle" fontSize="11" fill="#475569">indoor heating and cooling</text>
            <rect x="539" y="135" width="50" height="32" rx="6" fill={accentPale} stroke={accent} strokeWidth="2" />
            {[549, 559, 569, 579].map((x) => <line key={x} x1={x} y1="141" x2={x} y2="161" stroke={accent} strokeWidth="2" strokeLinecap="round" />)}
            <rect x="609" y="136" width="41" height="27" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
          </g>

          {shouldAnimate ? (
            <motion.circle
              cy="145"
              r="8"
              fill={accentPale}
              stroke={accent}
              strokeWidth="3"
              initial={{ cx: isHeating ? 205 : 515, opacity: 0 }}
              animate={{
                cx: isHeating ? [205, 274, 446, 515] : [515, 446, 274, 205],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
            />
          ) : (
            <circle cx={isHeating ? 205 : 515} cy="145" r="8" fill={accentPale} stroke={accent} strokeWidth="3" />
          )}

          {steps.map((step) => (
            <g key={step.title}>
              <circle cx={step.x - 65} cy="253" r="12" fill={accent} />
              <text x={step.x - 65} y="257" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">{step.number}</text>
              <text x={step.x - 46} y="249" fontSize="12" fontWeight="700" fill="#0f172a">{step.title}</text>
              <text x={step.x - 46} y="266" fontSize="10.5" fill="#475569">{step.detail}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="border-t border-slate-200 bg-white px-5 py-3 text-xs leading-relaxed text-slate-600 sm:px-7">
        <span className="font-semibold text-slate-800">How to read it:</span> the single moving dot represents heat. Select winter or summer above to reverse its route.
      </div>
    </div>
  );
}
