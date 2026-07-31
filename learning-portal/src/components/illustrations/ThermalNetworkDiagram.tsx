import { motion, useReducedMotion } from 'motion/react';

const connectedBuildings = [
  { x: 282, label: 'Homes', accent: '#60a5fa' },
  { x: 428, label: 'Public building', accent: '#a78bfa' },
  { x: 574, label: 'Shops & offices', accent: '#34d399' },
];

export function ThermalNetworkDiagram() {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = shouldReduceMotion === false;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">One centralized example</p>
          <h4 className="mt-1 text-xl font-bold text-slate-800">One plant serves several buildings</h4>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Hot water leaves the central source, serves connected buildings, and returns cooler to be heated again.
          </p>
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Follow the two dots</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <svg
          viewBox="0 0 680 260"
          className="h-auto w-full"
          role="img"
          aria-labelledby="central-network-title central-network-description"
        >
          <title id="central-network-title">Centralized district heating flow</title>
          <desc id="central-network-description">
            A central heat source supplies three building types along a hot-water line. A separate line returns cooler water to the source.
          </desc>
          <rect width="680" height="260" rx="16" fill="#f8fafc" />

          <path d="M153 96 H611" fill="none" stroke="#f97316" strokeWidth="12" strokeLinecap="round" />
          <path d="M611 177 H153" fill="none" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
          <text x="382" y="77" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">hot supply</text>
          <text x="382" y="205" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">cooler return</text>

          <g>
            <rect x="29" y="58" width="124" height="139" rx="15" fill="#ffffff" stroke="#fb923c" strokeWidth="3" />
            <rect x="48" y="102" width="86" height="64" rx="6" fill="#ffedd5" stroke="#fb923c" strokeWidth="2" />
            <path d="M60 102 V79 H78 V102 M102 102 V69 H120 V102" fill="none" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <circle cx="91" cy="133" r="14" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
            <text x="91" y="179" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Central plant</text>
            <text x="91" y="220" textAnchor="middle" fontSize="11" fill="#475569">produces hot water</text>
          </g>

          {connectedBuildings.map((building) => (
            <g key={building.label}>
              <path d={`M${building.x} 96 V123 M${building.x} 158 V177`} fill="none" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
              <rect x={building.x - 39} y="122" width="78" height="37" rx="8" fill="#ffffff" stroke={building.accent} strokeWidth="2" />
              <rect x={building.x - 26} y="132" width="16" height="16" rx="3" fill="#e0f2fe" />
              <rect x={building.x + 7} y="132" width="16" height="16" rx="3" fill="#e0f2fe" />
              <text x={building.x} y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">{building.label}</text>
            </g>
          ))}

          {shouldAnimate ? (
            <g aria-hidden="true">
              <motion.circle
                cy="96"
                r="6"
                fill="#fff7ed"
                stroke="#ea580c"
                strokeWidth="2"
                initial={{ cx: 160, opacity: 0 }}
                animate={{ cx: [160, 604], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 0.7, ease: 'linear' }}
              />
              <motion.circle
                cy="177"
                r="6"
                fill="#ecfeff"
                stroke="#2563eb"
                strokeWidth="2"
                initial={{ cx: 604, opacity: 0 }}
                animate={{ cx: [604, 160], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, delay: 1.1, repeat: Infinity, repeatDelay: 0.7, ease: 'linear' }}
              />
            </g>
          ) : (
            <g aria-hidden="true">
              <circle cx="160" cy="96" r="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
              <circle cx="604" cy="177" r="6" fill="#ecfeff" stroke="#2563eb" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-950">
        <strong>How this differs from a GEN or TEN:</strong> this is a central-source example. A decentralized network can exchange low-temperature heat between buildings, boreholes, and other thermal resources.
      </div>
    </div>
  );
}
