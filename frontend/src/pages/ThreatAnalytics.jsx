import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Globe, Shield, Brain, Target } from "lucide-react";
import { geoThreats, mitreData, attackTrend, vulnerabilityData, attackDistribution } from "../data/mockData";
import { AttackLineChart, VulnBarChart, AttackPieChart } from "../components/Charts";

function MitreHeatmap({ data }) {
  const sevColor = {
    critical: { bg: "rgba(244,63,94,0.15)", border: "rgba(244,63,94,0.3)", text: "#f43f5e" },
    high: { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.25)", text: "#fb923c" },
    medium: { bg: "rgba(250,204,21,0.08)", border: "rgba(250,204,21,0.2)", text: "#facc15" },
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {data.map((item) => {
        const c = sevColor[item.severity];
        const pct = Math.round((item.detected / item.techniques) * 100);
        return (
          <motion.div
            key={item.tactic}
            style={{
              background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: 10, padding: "12px 14px",
            }}
            whileHover={{ scale: 1.02, zIndex: 1 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: c.text, marginBottom: 4 }}>{item.tactic}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 3, height: 4, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: c.text, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: c.text, flexShrink: 0 }}>{pct}%</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
              {item.detected}/{item.techniques} techniques detected
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ThreatAnalytics() {
  return (
    <div>
      <div className="mb-20">
        <div className="page-title">Threat Analytics</div>
        <div className="page-subtitle">Deep intelligence analysis · AI-powered pattern recognition · MITRE ATT&CK coverage</div>
      </div>

      {/* KPIs */}
      <div className="grid-4 mb-20">
        {[
          { label: "AI Model Accuracy", value: "98.7%", sub: "+0.3% this week", color: "#22d3ee" },
          { label: "Avg Detection Time", value: "340ms", sub: "−12ms improved", color: "#8b5cf6" },
          { label: "False Positive Rate", value: "0.8%", sub: "Industry avg: 4.2%", color: "#34d399" },
          { label: "Threat Coverage", value: "94.2%", sub: "MITRE ATT&CK", color: "#ec4899" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="glass-card"
            style={{ padding: "20px" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3 }}
          >
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Row 1 */}
      <div className="grid-2 mb-16">
        {/* Attack trend */}
        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <div className="section-header">
            <div className="section-title">
              <TrendingUp size={14} style={{ color: "var(--pink)" }} />
              30-Day Attack Trend
            </div>
          </div>
          <AttackLineChart data={attackTrend} />
        </motion.div>

        {/* Geo threats */}
        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="section-header">
            <div className="section-title">
              <Globe size={14} style={{ color: "var(--cyan)" }} />
              Threat Source Countries
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {geoThreats.slice(0, 8).map((geo, i) => (
              <motion.div
                key={geo.country}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span style={{ fontSize: 16 }}>{geo.flag}</span>
                <div style={{ minWidth: 80, fontSize: 12, fontWeight: 600 }}>{geo.country}</div>
                <div style={{ flex: 1 }}>
                  <div className="threat-meter-bar">
                    <motion.div
                      className="threat-meter-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${geo.percentage}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                      style={{ background: i === 0 ? "var(--red)" : i === 1 ? "var(--orange)" : i < 4 ? "var(--purple)" : "var(--cyan)" }}
                    />
                  </div>
                </div>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", minWidth: 40, textAlign: "right" }}>{geo.percentage}%</span>
                <span style={{ fontSize: 11, color: geo.trend === "up" ? "var(--red)" : geo.trend === "down" ? "var(--green)" : "var(--muted)" }}>
                  {geo.trend === "up" ? "↑" : geo.trend === "down" ? "↓" : "→"}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MITRE */}
      <motion.div className="glass-card chart-card mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <div className="section-header">
          <div className="section-title">
            <Target size={14} style={{ color: "var(--purple)" }} />
            MITRE ATT&CK Coverage Map
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 11 }}>
            <span style={{ color: "#f43f5e" }}>● Critical</span>
            <span style={{ color: "#fb923c" }}>● High</span>
            <span style={{ color: "#facc15" }}>● Medium</span>
          </div>
        </div>
        <MitreHeatmap data={mitreData} />
      </motion.div>

      {/* Row 3 */}
      <div className="grid-2 mb-16">
        {/* Vulnerabilities */}
        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="section-header">
            <div className="section-title">
              <Shield size={14} style={{ color: "var(--orange)" }} />
              Vulnerability Status
            </div>
          </div>
          <VulnBarChart data={vulnerabilityData} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
            {vulnerabilityData.map((v) => (
              <div key={v.category} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "var(--muted)", flex: 1 }}>{v.category}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: v.color }}>{v.patched}/{v.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Attack types */}
        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="section-header">
            <div className="section-title">
              <BarChart3 size={14} style={{ color: "var(--pink)" }} />
              Attack Type Breakdown
            </div>
          </div>
          <AttackPieChart data={attackDistribution} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {attackDistribution.map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, flex: 1, color: "var(--muted)" }}>{item.name}</span>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 700, color: item.color }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Model info */}
      <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="section-header">
          <div className="section-title">
            <Brain size={14} style={{ color: "var(--cyan)" }} />
            AI Detection Engine · Model Telemetry
          </div>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--green)" }}>● MODEL ACTIVE</div>
        </div>
        <div className="grid-4">
          {[
            { label: "Model Version", value: "SentinelAI v4.2.1", color: "var(--white)" },
            { label: "Architecture", value: "Transformer + GNN", color: "var(--cyan)" },
            { label: "Training Samples", value: "52.4M", color: "var(--purple)" },
            { label: "Last Retrained", value: "6h ago", color: "var(--muted)" },
            { label: "Inference Latency", value: "12ms avg", color: "var(--green)" },
            { label: "Throughput", value: "48K flows/sec", color: "var(--cyan)" },
            { label: "F1 Score", value: "0.9934", color: "var(--green)" },
            { label: "AUC-ROC", value: "0.9978", color: "var(--cyan)" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(15,23,42,0.5)", borderRadius: 10, padding: "14px 16px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-mono)", color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
