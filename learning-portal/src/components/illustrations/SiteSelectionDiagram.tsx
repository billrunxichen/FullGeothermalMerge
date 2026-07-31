import { motion, useReducedMotion } from 'motion/react';

export function SiteSelectionDiagram() {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = shouldReduceMotion === false;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <h4 className="text-xl font-bold text-slate-800">What makes a strong community-scale network site?</h4>
      <p className="mt-2 text-sm text-slate-600">
        Look for a cluster of potential users, room for shallow boreholes, practical access, and local thermal resources that can work together.
      </p>

      <div className="mt-6 touch-pan-x overflow-x-auto rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50 p-4 ring-1 ring-slate-200/70">
        <svg
          viewBox="0 0 560 300"
          className="aspect-[560/300] w-full"
          style={{ minWidth: '560px' }}
          role="img"
          aria-labelledby="site-selection-diagram-title site-selection-diagram-description"
        >
          <title id="site-selection-diagram-title">Community-scale geothermal energy network site selection</title>
          <desc id="site-selection-diagram-description">
            A school, homes, and a business connect to a shared network loop above a shallow borefield. Together, the buildings,
            available land, access, and local thermal resources make a promising community-scale network site. When motion is
            enabled, the network and its community nodes reveal in sequence.
          </desc>

          <rect x="0" y="188" width="560" height="112" fill="#dff3e8" />
          <rect x="0" y="184" width="560" height="6" fill="#86cda4" />

          {/* Network connectors are intentionally drawn first, behind the buildings. */}
          <motion.path
            d="M106 146 V170 H454 V146"
            fill="none"
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            whileInView={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.path
            d="M280 150 V170"
            fill="none"
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            whileInView={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.14, ease: 'easeOut' }}
          />
          <motion.path
            d="M210 170 V208 H350 V170"
            fill="none"
            stroke="#0f766e"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            whileInView={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.24, ease: 'easeOut' }}
          />
          <motion.path
            d="M224 208 V264 M250 208 V264 M278 208 V264 M306 208 V264 M334 208 V264"
            fill="none"
            stroke="#0f766e"
            strokeWidth="5"
            strokeLinecap="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            whileInView={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.38, ease: 'easeOut' }}
          />
          <motion.path
            d="M224 264 Q237 278 250 264 M250 264 Q264 278 278 264 M278 264 Q292 278 306 264 M306 264 Q320 278 334 264"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            whileInView={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.55, ease: 'easeOut' }}
          />

          <text x="280" y="181" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">
            Shared network loop
          </text>
          <text x="280" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f766e">
            Shallow borefield / geothermal energy storage
          </text>

          <motion.g
            initial={shouldAnimate ? { opacity: 0, scale: 0.94 } : false}
            whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.16, ease: 'easeOut' }}
            style={{ transformOrigin: '106px 118px' }}
          >
            <rect x="58" y="90" width="96" height="56" rx="7" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
            <path d="M52 91 L106 55 L160 91 Z" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
            <rect x="77" y="108" width="16" height="17" rx="2" fill="#dbeafe" />
            <rect x="119" y="108" width="16" height="17" rx="2" fill="#dbeafe" />
            <text x="106" y="138" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">School</text>
          </motion.g>

          <motion.g
            initial={shouldAnimate ? { opacity: 0, scale: 0.94 } : false}
            whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.26, ease: 'easeOut' }}
            style={{ transformOrigin: '280px 116px' }}
          >
            <rect x="232" y="82" width="96" height="68" rx="7" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
            <path d="M224 84 L280 48 L336 84 Z" fill="#fdba74" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
            <rect x="249" y="101" width="14" height="18" rx="2" fill="#ffedd5" />
            <rect x="274" y="101" width="14" height="18" rx="2" fill="#ffedd5" />
            <rect x="299" y="101" width="14" height="18" rx="2" fill="#ffedd5" />
            <text x="280" y="140" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Homes</text>
          </motion.g>

          <motion.g
            initial={shouldAnimate ? { opacity: 0, scale: 0.94 } : false}
            whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.36, ease: 'easeOut' }}
            style={{ transformOrigin: '454px 114px' }}
          >
            <rect x="406" y="82" width="96" height="64" rx="7" fill="#ffffff" stroke="#059669" strokeWidth="2" />
            <path d="M406 82 H432 V66 H458 V82 H502 V146 H406 Z" fill="#ecfdf5" stroke="#059669" strokeWidth="2" strokeLinejoin="round" />
            <rect x="424" y="102" width="15" height="15" rx="2" fill="#bbf7d0" />
            <rect x="466" y="102" width="15" height="15" rx="2" fill="#bbf7d0" />
            <text x="454" y="137" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Business</text>
          </motion.g>

          <g>
            <rect x="22" y="206" width="142" height="52" rx="10" fill="#ffffff" stroke="#99f6e4" strokeWidth="1.5" />
            <text x="93" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">Site conditions</text>
            <text x="93" y="246" textAnchor="middle" fontSize="10" fill="#475569">land, access, and geology</text>
          </g>

          <g>
            <rect x="396" y="206" width="142" height="52" rx="10" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1.5" />
            <text x="467" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">Thermal resources</text>
            <text x="467" y="246" textAnchor="middle" fontSize="10" fill="#475569">wastewater, ventilation, waste heat</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
