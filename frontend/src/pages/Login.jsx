import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.detail || data.msg || "Login failed. Please try again.");
      } else {
        setMessage("Login successful. Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 900);
      }
    } catch (err) {
      setError("Unable to connect to the backend. Please check the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center" style={{ padding: "24px" }}>
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: 520, width: "100%", padding: "32px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div className="hero-badge" style={{ padding: "10px 12px" }}>
            <Lock size={16} />
          </div>
          <div>
            <div className="section-title" style={{ marginBottom: 4 }}>Sign In</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Secure access to Sentinel AI</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <div className="alert alert-error" style={{ marginTop: 12 }}>{error}</div>}
          {message && <div className="alert alert-success" style={{ marginTop: 12 }}>{message}</div>}

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: 20 }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--muted)" }}>
          <span>New to Sentinel AI?</span>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: "10px 16px" }}
            onClick={() => navigate("/settings")}
          >
            Create Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
