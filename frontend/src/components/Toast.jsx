import { AnimatePresence, motion } from "framer-motion";

export default function ToastContainer({ notifications, removeNotification }) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {notifications.map((toast) => (
          <motion.div
            key={toast.id}
            className={`toast ${toast.variant}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.2 }}
          >
            <div className="toast-content">
              <span className="toast-title">{toast.title}</span>
              <span className="toast-message">{toast.message}</span>
            </div>
            <button className="toast-close" onClick={() => removeNotification(toast.id)}>×</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
