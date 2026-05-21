import { motion } from "framer-motion";
import { Shield, Brain, Globe, Zap, Eye, Lock, ArrowRight, Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const features = [
  { icon: Brain, color: "var(--purple)", bg: "rgba(192,132,252,0.12)", title: "AI-Powered Detection", desc: "Machine learning models trained on 50M+ attack signatures. Real-time behavioral analysis with 98.7% accuracy." },
  { icon: Globe, color: "var(--cyan)", bg: "rgba(125,211,252,0.12)", title: "Global Threat Intelligence", desc: "Live feeds from 140+ threat intelligence providers. Correlated IOCs across 6,500+ enterprise networks worldwide." },
  { icon: Zap, color: "var(--pink)", bg: "rgba(255,126,179,0.10)", title: "Zero-Day Detection", desc: "Heuristic analysis identifies unknown threats before signature databases. Average detection time under 340ms." },
  { icon: Eye, color: "#f43f5e", bg: "rgba(244,63,94,0.10)", title: "Deep Packet Inspection", desc: "Layer 7 traffic analysis across all protocols. Encrypted traffic fingerprinting without decryption." },
  { icon: Lock, color: "#fb923c", bg: "rgba(251,146,60,0.10)", title: "Automated Response", desc: "SOAR integration with 200+ playbooks. Automatic IP blocking, user quarantine, and incident ticket creation." },
  { icon: Activity, color: "var(--green)", bg: "rgba(52,211,153,0.10)", title: "MITRE ATT&CK Mapping", desc: "Every alert mapped to MITRE ATT&CK framework. Kill-chain visualization for complete attack story." },
];

const stats = [
  { value: "98.7%", label: "Detection Rate", color: "var(--cyan)" },
  { value: "340ms", label: "Avg Response Time", color: "var(--purple)" },
  { value: "50M+", label: "Threats Analyzed", color: "var(--pink)" },
  { value: "6.5K+", label: "Networks Protected", color: "var(--green)" },
];

const recentActivity = [
  { text: "APT29 campaign blocked across 14 endpoints", time: "2 min ago", icon: Shield, color: "#f43f5e" },
  { text: "AI model retrained — accuracy improved +0.3%", time: "18 min ago", icon: Brain, color: "#8b5cf6" },
  { text: "New CVE-2024-3094 signature deployed", time: "1h ago", icon: Zap, color: "#ec4899" },
  { text: "Threat intelligence feed updated — 2,847 new IOCs", time: "2h ago", icon: Globe, color: "#22d3ee" },
  { text: "SOAR playbook executed: SSH brute force auto-mitigated", time: "3h ago", icon: CheckCircle, color: "#34d399" },
];

export default function Home({ navigate, notify }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Hero */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="hero-badge">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--purple)", display: "inline-block", animation: "statusPulse 3s infinite" }} />
            SENTINEL AI · v4.2.1 · SYSTEMS OPERATIONAL
          </div>

          <h1 className="hero-title">
            Next-Gen AI
            <br />
            <span className="gradient-text">Network Defense</span>
          </h1>

          <p className="hero-desc">
            Enterprise-grade intrusion detection powered by deep learning. Detect, analyze, and neutralize threats in real time — before they become breaches.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              <Lock size={16} />
              Sign In
              <ArrowRight size={14} />
            </button>
            <button className="btn-secondary" onClick={() => navigate("/analytics")}>
              <TrendingUp size={16} />
              Threat Analytics
            </button>
          </div>
        </div>

        <aside className="hero-side">
          <div className="mini-card glass-card--highlight">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>Overall Risk</div>
                <div style={{ fontSize: 20, fontWeight: 900, marginTop: 6 }}>Moderate</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Score</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "var(--pink)" }}>42</div>
              </div>
            </div>
            <div style={{ height: 8, marginTop: 12, background: "rgba(255,255,255,0.02)", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: "42%", height: "100%", background: "linear-gradient(90deg, var(--pink), var(--purple))" }} />
            </div>
          </div>

          <div className="mini-card glass-card--mid">
            <div className="mini-stat"><div className="label">Active Alerts</div><div className="value">12</div></div>
            <div style={{ height: 10 }} />
            <div className="mini-stat"><div className="label">Auto-Responded</div><div className="value">8</div></div>
          </div>

          <div className="mini-card glass-card--light">
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>Recent Logs</div>
            <div className="mini-feed">
              {recentActivity.slice(0,5).map((r, i) => (
                <div key={i} className="feed-line">
                  <div style={{ fontWeight: 700 }}>{r.text}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>{r.time}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="stats-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="home-stat"
            whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.4)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="home-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="home-stat-label">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <div className="section-header" style={{ marginBottom: 16 }}>
          <div className="section-title">
            <Shield size={15} style={{ color: "var(--purple)" }} />
            Platform Capabilities
          </div>
          <span className="section-title-accent">POWERED BY AI</span>
        </div>
        <div className="feature-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.35 }}
                whileHover={{ y: -4 }}
              >
                <div className="feature-icon" style={{ background: f.bg }}>
                  <Icon size={20} style={{ color: f.color }} />
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="glass-card"
        style={{ padding: 20, marginTop: 24 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-header">
          <div className="section-title">
            <Activity size={14} style={{ color: "var(--cyan)" }} />
            Recent System Activity
          </div>
          <button className="section-action" onClick={() => navigate("/dashboard")}>View Dashboard →</button>
        </div>
        <div>
          {recentActivity.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(139,92,246,0.06)" : "none" }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.05 }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} style={{ color: item.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.text}</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>{item.time}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
