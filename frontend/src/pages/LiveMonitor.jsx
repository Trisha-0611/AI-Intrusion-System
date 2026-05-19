import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Shield, Activity, Zap } from "lucide-react";

const generateFakeAttack = () => {
  const types = ["DDoS", "SQL Injection", "Port Scan", "Brute Force", "Malware", "Phishing"];
  const severities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Detected", "Blocking", "Blocked", "Under Analysis"];
  const ips = [
    "192.168.1.100",
    "10.0.0.50",
    "203.0.113.42",
    "185.220.101.47",
    "45.33.32.156",
    "172.16.0.80",
  ];

  return {
    id: `ATK-${Math.floor(Math.random() * 10000)}`,
    timestamp: new Date().toLocaleTimeString(),
    sourceIP: ips[Math.floor(Math.random() * ips.length)],
    attackType: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    mitigation: statuses[Math.floor(Math.random() * statuses.length)],
  };
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case "Critical":
      return "#f43f5e";
    case "High":
      return "#fb923c";
    case "Medium":
      return "#facc15";
    case "Low":
      return "#34d399";
    default:
      return "#7dd3fc";
  }
};

const getSeverityIcon = (severity) => {
  switch (severity) {
    case "Critical":
      return AlertTriangle;
    case "High":
      return Zap;
    default:
      return Shield;
  }
};

export default function LiveMonitor() {
  const [logs, setLogs] = useState([generateFakeAttack()]);

  // Simulate real-time log updates every 2-3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newAttack = generateFakeAttack();
      setLogs((current) => [newAttack, ...current.slice(0, 24)]);
    }, 2500 + Math.random() * 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-24">
        <div className="page-title">Live Monitor</div>
        <div className="page-subtitle">Real-time attack detection and mitigation status updates.</div>
      </div>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: "24px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <Activity
            size={20}
            style={{
              color: "#7dd3fc",
              animation: "spin 2s linear infinite",
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--white)" }}>
            Activity Feed
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {logs.length} events
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <AnimatePresence mode="popLayout">
            {logs.map((log, idx) => {
              const Icon = getSeverityIcon(log.severity);
              const color = getSeverityColor(log.severity);

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.01)",
                    border: `1px solid ${color}20`,
                    borderRadius: 10,
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${color}15`,
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ color: "var(--white)", fontWeight: 600, minWidth: 120 }}>
                        {log.attackType}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "2px 8px",
                          background: `${color}20`,
                          color,
                          borderRadius: 4,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {log.severity}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 16, color: "var(--muted)", fontSize: 12 }}>
                      <span>
                        <strong style={{ color: "var(--white)" }}>Source:</strong> {log.sourceIP}
                      </span>
                      <span>
                        <strong style={{ color: "var(--white)" }}>Status:</strong> {log.mitigation}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "var(--muted)",
                      fontSize: 11,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {log.timestamp}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
