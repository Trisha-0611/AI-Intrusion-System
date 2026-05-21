import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import AttackHistory from "./pages/AttackHistory";
import ThreatAnalytics from "./pages/ThreatAnalytics";
import LiveMonitor from "./pages/LiveMonitor";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ToastContainer from "./components/Toast";
import Modal from "./components/Modal";
import { ConnectivityProvider } from "./contexts/ConnectivityContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles/globals.css";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [modalData, setModalData] = useState({ open: false, title: "", description: "", confirmLabel: "Confirm", onConfirm: null, variant: "primary", children: null });

  const activePage = location.pathname === "/" ? "home" : location.pathname.slice(1);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  const notify = (title, message, variant = "success") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setNotifications((current) => [...current, { id, title, message, variant }]);
    setTimeout(() => {
      setNotifications((current) => current.filter((item) => item.id !== id));
    }, 4200);
  };

  const removeNotification = (id) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  };

  const openModal = ({ title, description, confirmLabel, variant, onConfirm, children }) => {
    setModalData({ open: true, title, description, confirmLabel, variant, onConfirm, children });
  };

  const closeModal = () => setModalData((prev) => ({ ...prev, open: false }));

  const confirmModal = () => {
    if (modalData.onConfirm) modalData.onConfirm();
    closeModal();
  };

  if (!loaded) {
    return (
      <div className="boot-screen">
        <div className="boot-content">
          <motion.div
            className="boot-logo"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="boot-hex">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="url(#bootGrad)" strokeWidth="2" />
                <polygon points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5" fill="url(#bootFill)" opacity="0.2" />
                <defs>
                  <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff8fab" />
                    <stop offset="100%" stopColor="#a2d2ff" />
                  </linearGradient>
                  <linearGradient id="bootFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cdb4db" />
                    <stop offset="100%" stopColor="#a2d2ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <motion.p
              className="boot-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              SENTINEL AI
            </motion.p>
            <motion.div
              className="boot-bar"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeInOut" }}
            />
            <motion.p
              className="boot-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing threat detection systems...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <ConnectivityProvider>
        <div className="app-shell">
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
        <div className="bg-glow bg-glow-3" />

        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
          <Navbar
            activePage={activePage}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />

          <div className="page-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                style={{ height: "100%" }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home navigate={navigate} notify={notify} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/alerts"
                    element={<Alerts notify={notify} openModal={openModal} />}
                  />
                  <Route path="/history" element={<AttackHistory />} />
                  <Route path="/analytics" element={<ThreatAnalytics />} />
                  <Route path="/activity" element={<LiveMonitor />} />
                  <Route path="/settings" element={<Settings notify={notify} />} />
                  <Route path="*" element={<Home navigate={navigate} notify={notify} />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ToastContainer notifications={notifications} removeNotification={removeNotification} />
        <Modal
          open={modalData.open}
          title={modalData.title}
          description={modalData.description}
          confirmLabel={modalData.confirmLabel}
          variant={modalData.variant}
          onConfirm={confirmModal}
          onClose={closeModal}
          children={modalData.children}
        />
      </div>
    </ConnectivityProvider>
    </ThemeProvider>
  );
}
