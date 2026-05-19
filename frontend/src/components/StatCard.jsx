import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return val;
}

export default function StatCard({ label, value, suffix = "", change, changeDir, icon: Icon, color, glow, prefix = "" }) {
  const num = useCountUp(typeof value === "number" ? value : 0);
  const display = typeof value === "number" ? num : value;

  return (
    <motion.div
      className="glass-card stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
    >
      <div className="stat-card-accent" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div className="stat-card-glow" style={{ background: glow || color }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div className="stat-label">{label}</div>
          <div className="stat-value animated-value" style={{ color }}>
            {prefix}{typeof value === "number" ? num.toLocaleString() : value}{suffix}
          </div>
        </div>
        {Icon && (
          <div className="stat-icon" style={{ background: `${color}15` }}>
            <Icon size={20} style={{ color }} />
          </div>
        )}
      </div>

      {change && (
        <div className="stat-sub">
          <span className={`stat-change ${changeDir}`}>{changeDir === "up" ? "↑" : "↓"} {change}</span>
          <span>vs last 24h</span>
        </div>
      )}
    </motion.div>
  );
}
