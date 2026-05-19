import { motion } from "framer-motion";

export default function Modal({ open, title, description, confirmLabel = "Confirm", onConfirm, onClose, children, variant = "primary" }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-window"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div className="modal-title">{title}</div>
            {description && <div className="modal-description">{description}</div>}
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className={`btn-primary ${variant === "danger" ? "btn-danger" : ""}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
