import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell, Settings, Zap, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConnectivityIndicator from "./ConnectivityIndicator";

const pageLabels = {
  home: "Home",
  login: "Login",
  dashboard: "Dashboard",
  alerts: "Alerts",
  history: "Attack History",
  analytics: "Threat Analytics",
  activity: "Live Monitor",
  settings: "Settings",
};

export default function Navbar({ activePage, sidebarCollapsed, setSidebarCollapsed }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  const notifications = [
    { id: 1, title: "Critical Alert", message: "DDoS attack detected from 192.168.1.100", time: "2m ago" },
    { id: 2, title: "Threat Blocked", message: "SQL Injection attempt blocked successfully", time: "5m ago" },
    { id: 3, title: "System Status", message: "Threat detection model accuracy: 99.2%", time: "15m ago" },
  ];

  return (
    <header className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <button className="menu-btn" onClick={() => setSidebarCollapsed((p) => !p)}>
          <Menu size={16} />
        </button>

        <div className="breadcrumb">
          <span className="breadcrumb-root">Sentinel AI</span>
          <ChevronRight size={12} style={{ color: "rgba(248,250,252,0.2)" }} />
          <span className="breadcrumb-current">{pageLabels[activePage]}</span>
        </div>

        <div className="search-bar" style={{ marginLeft: 16 }}>
          <Search size={13} style={{ color: "var(--muted-2)", flexShrink: 0 }} />
          <input
            placeholder="Search threats, IPs, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd style={{ fontSize: 10, color: "var(--muted)", background: "rgba(192,132,252,0.06)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 6, padding: "2px 6px", flexShrink: 0 }}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="navbar-right">
        {/* Connectivity Indicator */}
        <ConnectivityIndicator />

        {/* Live clock */}
        <motion.div
          style={{
            fontFamily: "var(--font-mono)", fontSize: 12,
            color: "var(--cyan)", background: "rgba(125,211,252,0.06)",
            border: "1px solid rgba(125,211,252,0.08)", borderRadius: 8,
            padding: "6px 12px", display: "flex", alignItems: "center", gap: 8,
          }}
          animate={{ opacity: [1, 0.85, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block", boxShadow: "0 0 6px rgba(125,211,252,0.12)" }} />
          {fmt(time)} UTC
        </motion.div>

        {/* Threat level */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)",
          borderRadius: 8, padding: "5px 10px",
        }}>
          <Zap size={12} style={{ color: "var(--red)" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--red)", letterSpacing: "0.06em" }}>ELEVATED</span>
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            className="navbar-badge-btn"
            onClick={() => setShowNotifications((p) => !p)}
            style={{ position: "relative" }}
          >
            <Bell size={15} />
            <span className="notif-dot" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 8,
                  width: 320,
                  background: "var(--bg-card-dark)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  backdropFilter: "blur(16px)",
                  zIndex: 1000,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                  overflow: "hidden",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--white)" }}>Notifications</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer" }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ maxHeight: 360, overflowY: "auto" }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: 12,
                        borderBottom: "1px solid rgba(255,255,255,0.02)",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--white)", marginBottom: 4 }}>
                        {notif.title}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                        {notif.message}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--muted)" }}>
                        {notif.time}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <button
          className="navbar-badge-btn"
          onClick={() => navigate("/settings")}
          title="Settings"
        >
          <Settings size={15} />
        </button>

        {/* Profile */}
        <div className="profile-btn">
          <div className="profile-avatar">SA</div>
          <div>
            <div className="profile-name">S. Archer</div>
            <div className="profile-role">SOC Analyst L3</div>
          </div>
        </div>
      </div>
    </header>
  );
}
