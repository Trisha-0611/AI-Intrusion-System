import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, ChevronDown, ChevronUp, Globe, Clock, Target, Tag } from "lucide-react";
import { attackHistory } from "../data/mockData";

export default function AttackHistory() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("All");

  const types = ["All", ...new Set(attackHistory.map(a => a.type))];

  const filtered = filter === "All" ? attackHistory : attackHistory.filter(a => a.type === filter);

  const statusColor = (s) => {
    if (s === "blocked") return "var(--green)";
    if (s === "mitigated") return "var(--cyan)";
    if (s === "contained") return "var(--orange)";
    if (s === "resolved") return "var(--green)";
    if (s === "investigated") return "var(--purple)";
    return "var(--muted)";
  };

  const damageColor = (d) => {
    if (d === "None") return "var(--green)";
    if (d === "Low") return "var(--yellow)";
    if (d === "Medium") return "var(--orange)";
    return "var(--red)";
  };

  return (
    <div>
      <div className="mb-20">
        <div className="page-title">Attack History</div>
        <div className="page-subtitle">Complete forensic record of all detected and investigated attacks</div>
      </div>

      {/* Summary */}
      <div className="grid-4 mb-20">
        {[
          { label: "Total Attacks", value: "4,421", color: "#ec4899", sub: "all-time" },
          { label: "Successfully Blocked", value: "97.1%", color: "#34d399", sub: "block rate" },
          { label: "APT Campaigns", value: "28", color: "#8b5cf6", sub: "identified" },
          { label: "Countries of Origin", value: "47", color: "#22d3ee", sub: "tracked" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="glass-card"
            style={{ padding: "18px 20px" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -3 }}
          >
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {types.map((t) => (
          <button key={t} className={`filter-chip ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Timeline list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((attack, i) => (
          <motion.div
            key={attack.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <motion.div
              className="glass-card"
              style={{ overflow: "hidden", cursor: "pointer" }}
              whileHover={{ borderColor: "rgba(139,92,246,0.3)" }}
              onClick={() => setExpanded(expanded === attack.id ? null : attack.id)}
            >
              {/* Header row */}
              <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                {/* Severity dot */}
                <div style={{
                  width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                  background: attack.severity === "critical" ? "var(--red)" : attack.severity === "high" ? "var(--orange)" : "var(--yellow)",
                  boxShadow: `0 0 10px ${attack.severity === "critical" ? "var(--red)" : attack.severity === "high" ? "var(--orange)" : "var(--yellow)"}`,
                }} />

                {/* ID */}
                <span className="mono" style={{ fontSize: 11, color: "var(--cyan)", flexShrink: 0, minWidth: 80 }}>{attack.id}</span>

                {/* Name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{attack.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", display: "flex", gap: 12, marginTop: 2 }}>
                    <span>{attack.attacker}</span>
                    <span>·</span>
                    <span>{attack.srcCountry}</span>
                    <span>·</span>
                    <span className="mono" style={{ color: "var(--pink)" }}>{attack.srcIp}</span>
                  </div>
                </div>

                {/* Badges */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <span className={`badge ${attack.severity}`}>{attack.severity}</span>
                  <span className="badge info">{attack.type}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: statusColor(attack.status), background: `${statusColor(attack.status)}15`, border: `1px solid ${statusColor(attack.status)}30`, borderRadius: 6, padding: "2px 8px" }}>
                    {attack.status}
                  </span>
                </div>

                {/* Time */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{attack.start.split(" ")[1]} – {attack.end.split(" ")[1]}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>{attack.start.split(" ")[0]}</div>
                </div>

                {expanded === attack.id ? <ChevronUp size={14} style={{ color: "var(--muted)", flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />}
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {expanded === attack.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                      <div className="grid-4">
                        {[
                          { label: "Target System", value: attack.target, icon: Target },
                          { label: "Origin Country", value: attack.srcCountry, icon: Globe },
                          { label: "Duration", value: `${Math.round((new Date("2025-05-17 " + attack.end.split(" ")[1]) - new Date("2025-05-17 " + attack.start.split(" ")[1])) / 60000)} min`, icon: Clock },
                          { label: "Damage Level", value: attack.damage, icon: Tag, color: damageColor(attack.damage) },
                        ].map((item, j) => {
                          const Icon = item.icon;
                          return (
                            <div key={j} style={{ background: "rgba(15,23,42,0.5)", borderRadius: 10, padding: 14, border: "1px solid var(--border)" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                <Icon size={12} style={{ color: "var(--muted)" }} />
                                <span style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</span>
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: item.color || "var(--white)" }}>{item.value}</div>
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>MITRE ATT&CK Tactics</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {attack.tactics.map((tactic) => (
                            <span key={tactic} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "var(--purple)", fontWeight: 600 }}>
                              {tactic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                        <button style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8, padding: "8px 16px", color: "var(--purple)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-display)" }}>
                          View Full Report
                        </button>
                        <button style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 8, padding: "8px 16px", color: "var(--cyan)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-display)" }}>
                          Export IOCs
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
