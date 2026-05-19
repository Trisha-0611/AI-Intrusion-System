import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Bell, Server, Sliders, AlertCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useConnectivity } from "../contexts/ConnectivityContext";
import { checkConnectivity } from "../api/threatService";

export default function Settings({ notify }) {
  const { theme, toggleTheme } = useTheme();
  const { isConnected } = useConnectivity();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(6);
  const [aiSensitivity, setAiSensitivity] = useState(75);
  const [backendStatus, setBackendStatus] = useState(null);
  const [lastCheck, setLastCheck] = useState(null);

  // Check backend status on mount
  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkConnectivity();
      setBackendStatus(status);
      setLastCheck(new Date());
    };

    checkStatus();
  }, []);

  const handleThemeToggle = () => {
    toggleTheme();
    notify("Theme updated", `Switched to ${theme === "dark" ? "light" : "dark"} mode.`);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    notify(
      "Notifications",
      `Notifications ${!notificationsEnabled ? "enabled" : "disabled"}.`
    );
  };

  const handleRefreshChange = (e) => {
    const value = parseInt(e.target.value);
    setRefreshInterval(value);
    notify("Refresh interval", `Updated to ${value} seconds.`);
  };

  const handleSensitivityChange = (e) => {
    const value = parseInt(e.target.value);
    setAiSensitivity(value);
  };

  const handleRefreshBackendStatus = async () => {
    const status = await checkConnectivity();
    setBackendStatus(status);
    setLastCheck(new Date());
    notify(
      "Backend status",
      `Connection ${status ? "healthy" : "unavailable"}.`,
      status ? "success" : "error"
    );
  };

  return (
    <div>
      <div className="mb-24">
        <div className="page-title">Settings</div>
        <div className="page-subtitle">Configure dashboard preferences and system parameters.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
        {/* Theme Settings */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ padding: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            {theme === "dark" ? (
              <Moon size={20} style={{ color: "#7dd3fc" }} />
            ) : (
              <Sun size={20} style={{ color: "#facc15" }} />
            )}
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--white)" }}>
              Theme
            </span>
          </div>

          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16 }}>
            Toggle between dark and light mode for the dashboard.
          </div>

          <button
            onClick={handleThemeToggle}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: theme === "dark" ? "#7dd3fc15" : "#facc1515",
              border: `1px solid ${theme === "dark" ? "#7dd3fc30" : "#facc1530"}`,
              color: theme === "dark" ? "#7dd3fc" : "#facc15",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: 13,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme === "dark" ? "#7dd3fc25" : "#facc1525";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = theme === "dark" ? "#7dd3fc15" : "#facc1515";
            }}
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Current: <strong style={{ color: "var(--white)" }}>{theme.toUpperCase()}</strong>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ padding: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Bell size={20} style={{ color: "#ec4899" }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--white)" }}>
              Notifications
            </span>
          </div>

          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16 }}>
            Receive alerts for critical threat events and system status updates.
          </div>

          <button
            onClick={handleNotificationToggle}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: notificationsEnabled ? "#ec489915" : "#f4354515",
              border: `1px solid ${notificationsEnabled ? "#ec489930" : "#f4354530"}`,
              color: notificationsEnabled ? "#ec4899" : "#f43f5e",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: 13,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = notificationsEnabled ? "#ec489925" : "#f4354525";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = notificationsEnabled ? "#ec489915" : "#f4354515";
            }}
          >
            {notificationsEnabled ? "Disable" : "Enable"} Notifications
          </button>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Status: <strong style={{ color: notificationsEnabled ? "#34d399" : "#f43f5e" }}>
              {notificationsEnabled ? "ENABLED" : "DISABLED"}
            </strong>
          </div>
        </motion.div>

        {/* Backend Status */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ padding: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Server size={20} style={{ color: "#8b5cf6" }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--white)" }}>
              Backend Status
            </span>
          </div>

          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16 }}>
            Monitor connection to the FastAPI threat detection service.
          </div>

          <button
            onClick={handleRefreshBackendStatus}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: backendStatus ? "#34d39915" : "#f4354515",
              border: `1px solid ${backendStatus ? "#34d39930" : "#f4354530"}`,
              color: backendStatus ? "#34d399" : "#f43f5e",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: 13,
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = 0.8;
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = 1;
            }}
          >
            Check Status
          </button>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              fontSize: 12,
            }}
          >
            <div style={{ color: "var(--muted)", marginBottom: 4 }}>Backend:</div>
            <div
              style={{
                color: backendStatus ? "#34d399" : "#f43f5e",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
              }}
            >
              {backendStatus ? "✓ CONNECTED" : "✗ OFFLINE"}
            </div>
            {lastCheck && (
              <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 4 }}>
                Last checked: {lastCheck.toLocaleTimeString()}
              </div>
            )}
          </div>
        </motion.div>

        {/* Refresh Interval */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ padding: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Sliders size={20} style={{ color: "#fb923c" }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--white)" }}>
              Refresh Interval
            </span>
          </div>

          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16 }}>
            How often to fetch new threat prediction data from the backend.
          </div>

          <select
            value={refreshInterval}
            onChange={handleRefreshChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8,
              color: "var(--white)",
              fontFamily: "var(--font-display)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <option value={3}>Every 3 seconds</option>
            <option value={6}>Every 6 seconds</option>
            <option value={10}>Every 10 seconds</option>
            <option value={30}>Every 30 seconds</option>
            <option value={60}>Every 60 seconds</option>
          </select>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Current: <strong style={{ color: "var(--white)" }}>{refreshInterval}s</strong>
          </div>
        </motion.div>

        {/* AI Sensitivity */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{ padding: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <AlertCircle size={20} style={{ color: "#c084fc" }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--white)" }}>
              AI Sensitivity
            </span>
          </div>

          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16 }}>
            Adjust the sensitivity level of the threat detection model. Higher = more alerts.
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={aiSensitivity}
            onChange={handleSensitivityChange}
            style={{
              width: "100%",
              cursor: "pointer",
              accentColor: "#c084fc",
            }}
          />

          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              fontSize: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "var(--muted)" }}>Sensitivity:</span>
            <span
              style={{
                color: "#c084fc",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
              }}
            >
              {aiSensitivity}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
