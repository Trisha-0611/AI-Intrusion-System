import { motion } from "framer-motion";

function polarToCartesian(cx, cy, r, angleDeg) {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
}

export default function RiskGauge({ score = 72 }) {
  const cx = 100, cy = 95, r = 70;
  const startAngle = -140;
  const endAngle = 140;
  const totalAngle = endAngle - startAngle;
  const fillAngle = startAngle + (score / 100) * totalAngle;

  const color = score >= 80 ? "#f43f5e" : score >= 60 ? "#fb923c" : score >= 40 ? "#facc15" : "#34d399";
  const label = score >= 80 ? "CRITICAL" : score >= 60 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";

  return (
    <div className="risk-gauge-wrap">
      <svg width="200" height="150" viewBox="0 0 200 150">
        {/* Track */}
        <path
          d={arcPath(cx, cy, r, startAngle, endAngle)}
          fill="none"
          stroke="rgba(139,92,246,0.12)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Zone colors */}
        <path d={arcPath(cx, cy, r, startAngle, startAngle + totalAngle * 0.25)} fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="14" strokeLinecap="round" />
        <path d={arcPath(cx, cy, r, startAngle + totalAngle * 0.25, startAngle + totalAngle * 0.5)} fill="none" stroke="rgba(250,204,21,0.2)" strokeWidth="14" strokeLinecap="round" />
        <path d={arcPath(cx, cy, r, startAngle + totalAngle * 0.5, startAngle + totalAngle * 0.75)} fill="none" stroke="rgba(251,146,60,0.2)" strokeWidth="14" strokeLinecap="round" />
        <path d={arcPath(cx, cy, r, startAngle + totalAngle * 0.75, endAngle)} fill="none" stroke="rgba(244,63,94,0.2)" strokeWidth="14" strokeLinecap="round" />

        {/* Fill */}
        <motion.path
          d={arcPath(cx, cy, r, startAngle, fillAngle)}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />

        {/* Center */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill={color} fontSize="28" fontWeight="800" fontFamily="Outfit, sans-serif">
          {score}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(248,250,252,0.45)" fontSize="11" fontFamily="Outfit, sans-serif">
          Risk Score
        </text>

        {/* Labels */}
        <text x={28} y={138} fill="rgba(248,250,252,0.3)" fontSize="9" fontFamily="JetBrains Mono, monospace">0</text>
        <text x={165} y={138} fill="rgba(248,250,252,0.3)" fontSize="9" fontFamily="JetBrains Mono, monospace">100</text>
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          background: `${color}18`, border: `1px solid ${color}40`,
          borderRadius: 8, padding: "4px 14px",
          fontSize: 11, fontWeight: 800, letterSpacing: "0.12em",
          color, fontFamily: "var(--font-display)",
        }}
      >
        {label} RISK
      </motion.div>
    </div>
  );
}
