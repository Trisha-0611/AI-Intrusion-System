import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Activity, TrendingUp, Zap, Eye, Server, Cpu } from "lucide-react";
import StatCard from "../components/StatCard";
import LiveFeed from "../components/LiveFeed";
import RiskGauge from "../components/RiskGauge";
import { AttackPieChart, AttackLineChart, TrafficAreaChart, SeverityBarChart } from "../components/Charts";
import { attackDistribution, attackTrend, trafficData, severityByDay, detectionLogs, activeSessions } from "../data/mockData";
import { getPrediction, setupPredictionPolling } from "../api/threatService";
import { useConnectivity } from "../contexts/ConnectivityContext";

const getInitialStats = (prediction, severity) => [
  { label: "Total Attacks (24h)", value: 1284, icon: Shield, color: "#ec4899", change: "18.4%", changeDir: "up" },
  { label: "Critical Threats", value: severity === "Critical" ? 48 : 47, icon: AlertTriangle, color: "#f43f5e", change: "12.1%", changeDir: "up" },
  { label: "Active Threats", value: 12, icon: Activity, color: "#fb923c", change: "4.5%", changeDir: "down" },
  { label: "Blocked Attacks", value: prediction === "DDoS" ? 1202 : 1201, icon: Zap, color: "#8b5cf6", change: "21.7%", changeDir: "down" },
  { label: "Detection Accuracy", value: 98, suffix: ".7%", icon: TrendingUp, color: "#22d3ee", change: "0.3%", changeDir: "down" },
  { label: "Suspicious Traffic", value: 3847, icon: Eye, color: "#34d399", change: "8.2%", changeDir: "up" },
];

export default function Dashboard() {
  const { isConnected } = useConnectivity();
  const [stats, setStats] = useState(getInitialStats(null, null));
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [lastPredictionTime, setLastPredictionTime] = useState(null);

  useEffect(() => {
    const entry = setTimeout(() => setLoading(false), 520);
    return () => clearTimeout(entry);
  }, []);

  // Setup prediction polling from backend
  useEffect(() => {
    if (!isConnected) {
      // Use mock data if backend is not connected
      setPrediction("BENIGN");
      setSeverity("Low");
      setStats(getInitialStats("BENIGN", "Low"));
      return;
    }

    // Fetch initial prediction
    const fetchInitialPrediction = async () => {
      const result = await getPrediction();
      if (!result.error) {
        setPrediction(result.prediction);
        setSeverity(result.severity);
        setStats(getInitialStats(result.prediction, result.severity));
        setLastPredictionTime(result.timestamp);
        setPredictionError(null);
      } else {
        setPredictionError(result.error);
        // Fallback to mock data
        setPrediction("BENIGN");
        setSeverity("Low");
        setStats(getInitialStats("BENIGN", "Low"));
      }
    };

    fetchInitialPrediction();

    // Set up polling every 6 seconds
    const interval = setInterval(async () => {
      const result = await getPrediction();
      if (!result.error) {
        setPrediction(result.prediction);
        setSeverity(result.severity);
        setStats((current) =>
          current.map((stat) => {
            if (stat.label === "Critical Threats") {
              return { ...stat, value: result.severity === "Critical" ? 48 : 47 };
            }
            if (stat.label === "Blocked Attacks") {
              return { ...stat, value: result.prediction === "DDoS" ? 1202 : 1201 };
            }
            // Add drift to other stats
            const drift = Math.floor(Math.random() * 7) - 3;
            const newValue = Math.max(0, stat.value + drift);
            return {
              ...stat,
              value: stat.label.includes("Accuracy")
                ? Math.min(100, Math.max(92, stat.value + (Math.random() > 0.5 ? 0.1 : -0.1)))
                : newValue,
            };
          })
        );
        setLastPredictionTime(result.timestamp);
        setPredictionError(null);
      } else {
        setPredictionError(result.error);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isConnected])

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loader-ring" />
        <div>Refreshing security signals...</div>
      </div>
    );
  }

  return (
    <div>
      {/* AI Prediction Banner */}
      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{
            padding: "16px",
            marginBottom: "20px",
            borderColor: severity === "Critical" ? "rgba(244,63,94,0.4)" : "rgba(52,211,153,0.4)",
            background: severity === "Critical" ? "rgba(244,63,94,0.05)" : "rgba(52,211,153,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: severity === "Critical" ? "#f43f5e" : "#34d399",
                  boxShadow: `0 0 8px ${severity === "Critical" ? "#f43f5e" : "#34d399"}`,
                }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  Latest ML Prediction: <span style={{ color: severity === "Critical" ? "#f43f5e" : "#34d399" }}>{prediction}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                  Severity: {severity} · {lastPredictionTime ? `Updated ${Math.round((Date.now() - lastPredictionTime) / 1000)}s ago` : "Updating..."}
                </div>
              </div>
            </div>
            {predictionError && (
              <div style={{ fontSize: 11, color: "#fb923c", textAlign: "right" }}>
                ⚠ Using fallback data
              </div>
            )}
          </div>
        </motion.div>
      )}

      <div className="mb-20">
        <div className="page-title">Security Operations Center</div>
        <div className="page-subtitle">
          Real-time threat monitoring · {isConnected ? "Backend Connected ✓" : "Offline Mode"} · All systems nominal
        </div>
      </div>

      <div className="grid-3 mb-20">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <div className="grid-3 mb-16" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="section-header">
            <div className="section-title">
              <TrendingUp size={14} style={{ color: "var(--pink)" }} />
              Attack Trend — Last 30 Days
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
              <span style={{ color: "#ec4899" }}>● Total</span>
              <span style={{ color: "#22d3ee" }}>● Blocked</span>
              <span style={{ color: "#f43f5e" }}>● Critical</span>
            </div>
          </div>
          <AttackLineChart data={attackTrend} />
        </motion.div>

        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <div className="section-title mb-12">
            <Shield size={14} style={{ color: "var(--purple)" }} />
            Global Risk Score
          </div>
          <RiskGauge score={72} />
        </motion.div>
      </div>

      <div className="grid-3 mb-16" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        <motion.div className="glass-card chart-card col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="section-header">
            <div className="section-title">
              <Activity size={14} style={{ color: "var(--cyan)" }} />
              Network Traffic Analytics — 24h
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
              <span style={{ color: "#22d3ee" }}>● Normal</span>
              <span style={{ color: "#ec4899" }}>● Suspicious</span>
              <span style={{ color: "#f43f5e" }}>● Blocked</span>
            </div>
          </div>
          <TrafficAreaChart data={trafficData} />
        </motion.div>

        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="section-title mb-12">
            <Eye size={14} style={{ color: "var(--pink)" }} />
            Attack Distribution
          </div>
          <AttackPieChart data={attackDistribution} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
            {attackDistribution.slice(0, 4).map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, flex: 1, color: "var(--muted)" }}>{item.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid-2 mb-16">
        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="section-header">
            <div className="section-title">
              <AlertTriangle size={14} style={{ color: "var(--orange)" }} />
              Severity Distribution — This Week
            </div>
          </div>
          <SeverityBarChart data={severityByDay} />
        </motion.div>

        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <LiveFeed />
        </motion.div>
      </div>

      <div className="grid-2 mb-16">
        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="section-header">
            <div className="section-title">
              <Cpu size={14} style={{ color: "var(--purple)" }} />
              AI Detection Engine Logs
              <span className="section-title-accent">LIVE</span>
            </div>
          </div>
          <div style={{ maxHeight: 240, overflowY: "auto" }}>
            {detectionLogs.map((log, index) => (
              <div key={index} className="log-line">
                <span className="log-time">{log.time}</span>
                <span className={`log-level-${log.level}`}>{log.level}</span>
                <span style={{ color: "var(--purple)", flexShrink: 0 }}>[{log.module}]</span>
                <span>{log.msg}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="glass-card chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
          <div className="section-header">
            <div className="section-title">
              <Server size={14} style={{ color: "var(--cyan)" }} />
              Active Host Monitor
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activeSessions.map((host, index) => (
              <motion.div
                key={index}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10,
                  background: "rgba(15,23,42,0.5)",
                  border: `1px solid ${host.status === "critical" ? "rgba(244,63,94,0.2)" : host.status === "warning" ? "rgba(251,146,60,0.2)" : "rgba(139,92,246,0.08)"}`,
                }}
                whileHover={{ x: 2 }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: host.status === "critical" ? "var(--red)" : host.status === "warning" ? "var(--orange)" : "var(--green)",
                  boxShadow: `0 0 8px ${host.status === "critical" ? "var(--red)" : host.status === "warning" ? "var(--orange)" : "var(--green)"}`,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{host.host}</div>
                  <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>{host.ip}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{host.connections.toLocaleString()} conn</div>
                  <div style={{ fontSize: 10, color: host.load > 85 ? "var(--red)" : host.load > 70 ? "var(--orange)" : "var(--green)" }}>
                    CPU {host.load}%
                  </div>
                </div>
                <div style={{ width: 48 }}>
                  <div className="threat-meter-bar">
                    <div className="threat-meter-fill" style={{
                      width: `${host.load}%`,
                      background: host.load > 85 ? "var(--red)" : host.load > 70 ? "var(--orange)" : "var(--green)",
                    }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
