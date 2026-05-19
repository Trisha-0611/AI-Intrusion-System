import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { liveFeedData } from "../data/mockData";
import { Radio } from "lucide-react";

const extraEvents = [
  { id: 101, title: "Zero-Day Exploit Probe", ip: "91.108.4.221", src: "IR", time: "now", severity: "critical", type: "Zero-Day" },
  { id: 102, title: "Lateral Movement via SMB", ip: "10.0.0.88", src: "INT", time: "now", severity: "high", type: "Lateral" },
  { id: 103, title: "Credential Dump via LSASS", ip: "10.0.0.14", src: "INT", time: "now", severity: "critical", type: "Credential" },
  { id: 104, title: "Exfil via HTTPS Tunnel", ip: "192.168.1.77", src: "INT", time: "now", severity: "high", type: "Exfil" },
  { id: 105, title: "Nmap Aggressive Scan", ip: "45.33.32.156", src: "US", time: "now", severity: "medium", type: "Recon" },
];

export default function LiveFeed() {
  const [feed, setFeed] = useState(liveFeedData.slice(0, 7));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTick((p) => p + 1);
      const pick = extraEvents[Math.floor(Math.random() * extraEvents.length)];
      const newItem = {
        ...pick,
        id: Date.now(),
        time: "just now",
      };
      setFeed((prev) => [newItem, ...prev.slice(0, 8)]);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <Radio size={14} style={{ color: "var(--red)" }} />
          </motion.div>
          Live Threat Feed
          <span className="section-title-accent">REAL-TIME</span>
        </div>
        <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>
          {tick * 1 + 482} events/hr
        </div>
      </div>

      <div className="live-feed">
        <AnimatePresence>
          {feed.map((item) => (
            <motion.div
              key={item.id}
              className="feed-item"
              initial={{ opacity: 0, x: -12, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`feed-dot ${item.severity}`} />
              <div className="feed-content">
                <div className="feed-title">{item.title}</div>
                <div className="feed-meta">
                  <span className="feed-ip">{item.ip}</span>
                  <span style={{ fontSize: 10, color: "var(--muted)" }}>›</span>
                  <span className="feed-time">{item.time}</span>
                </div>
              </div>
              <span className={`feed-severity ${item.severity}`}>{item.severity}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
