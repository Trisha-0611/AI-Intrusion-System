import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Shield, LayoutDashboard, Bell, History, BarChart3, Activity, Settings } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Shield },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { id: "alerts", label: "Alerts", icon: Bell, badge: "12" },
  { id: "history", label: "Attack History", icon: History },
  { id: "analytics", label: "Threat Analytics", icon: BarChart3 },
];

const bottomItems = [
  { id: "activity", label: "Live Monitor", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <motion.aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      initial={false}
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-hex pulse-ring" style={{ color: "var(--purple)" }}>
          <svg viewBox="0 0 40 40" width="34" height="34">
            <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="url(#sideGrad)" strokeWidth="1.5" />
            <polygon points="20,9 31,15 31,25 20,31 9,25 9,15" fill="url(#sideFill)" opacity="0.25" />
            <circle cx="20" cy="20" r="5" fill="url(#sideGrad)" />
            <defs>
              <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7eb3" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
              <linearGradient id="sideFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <motion.div
          className="logo-text"
          animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
          transition={{ duration: 0.2 }}
        >
          <div className="logo-title">SENTINEL</div>
          <div className="logo-sub">AI THREAT INTELLIGENCE</div>
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {!collapsed && <div className="nav-section-label">Navigation</div>}

        {navItems.map((item) => {
          const Icon = item.icon;
          const path = item.id === "home" ? "/" : `/${item.id}`;
          return (
            <NavLink
              key={item.id}
              to={path}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }} className="nav-item-inner">
                <Icon size={17} className="nav-icon" />
                <motion.span
                  className="nav-label"
                  animate={{ opacity: collapsed ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.span>
                {item.badge && !collapsed && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </motion.div>
            </NavLink>
          );
        })}

        {!collapsed && <div className="nav-section-label" style={{ marginTop: 12 }}>System</div>}

        {bottomItems.map((item) => {
          const Icon = item.icon;
          const path = `/${item.id}`;
          return (
            <NavLink
              key={item.id}
              to={path}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }} className="nav-item-inner">
                <Icon size={17} className="nav-icon" />
                <motion.span
                  className="nav-label"
                  animate={{ opacity: collapsed ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="ai-status-card">
          <div className="status-dot" />
          <motion.div
            className="ai-status-info"
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          >
            <div className="ai-status-label">AI Engine Active</div>
            <div className="ai-status-sub">98.7% accuracy · v4.2.1</div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
