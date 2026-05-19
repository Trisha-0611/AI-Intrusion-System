import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Download } from "lucide-react";
import { alertsData } from "../data/mockData";
import { exportToJSON, exportToCSV, generateIOCData } from "../api/exportUtils";

const severityOptions = ["All", "Critical", "High", "Medium", "Low"];
const statusOptions = ["All Status", "Active", "Investigating", "Mitigated", "Resolved"];
const statusColor = {
  active: "critical",
  investigating: "high",
  mitigated: "medium",
  resolved: "low",
};

export default function Alerts({ notify, openModal }) {
  const [alerts, setAlerts] = useState(alertsData);
  const [sevFilter, setSevFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [blockedIps, setBlockedIps] = useState([]);

  useEffect(() => {
    if (!selected) return;
    const latest = alerts.find((alert) => alert.id === selected.id);
    setSelected(latest ?? null);
  }, [alerts]);

  const filtered = useMemo(
    () =>
      alerts.filter((alert) => {
        const sevMatch = sevFilter === "All" || alert.severity === sevFilter.toLowerCase();
        const statusMatch = statusFilter === "All Status" || alert.status === statusFilter.toLowerCase();
        const searchMatch =
          !search ||
          alert.name.toLowerCase().includes(search.toLowerCase()) ||
          alert.src.includes(search) ||
          alert.id.includes(search);
        return sevMatch && statusMatch && searchMatch;
      }),
    [alerts, sevFilter, statusFilter, search]
  );

  const counts = useMemo(
    () => ({
      critical: alerts.filter((alert) => alert.severity === "critical").length,
      high: alerts.filter((alert) => alert.severity === "high").length,
      medium: alerts.filter((alert) => alert.severity === "medium").length,
      active: alerts.filter((alert) => alert.status === "active").length,
    }),
    [alerts]
  );

  const handleInvestigate = (alert) => {
    setAlerts((current) =>
      current.map((item) =>
        item.id === alert.id ? { ...item, status: "investigating" } : item
      )
    );
    notify("Investigation started", `${alert.name} has been elevated for deeper analysis.`);
  };

  const handleResolve = (alert) => {
    setAlerts((current) =>
      current.map((item) =>
        item.id === alert.id ? { ...item, status: "resolved" } : item
      )
    );
    notify("Alert resolved", `${alert.name} has been marked resolved.`);
  };

  const handleBlock = (alert) => {
    openModal({
      title: "Block Source IP",
      description: `Block ${alert.src} and elevate the alert to mitigated status? This action prevents repeat access from the same origin.`,
      confirmLabel: "Block IP",
      variant: "danger",
      onConfirm: () => {
        setBlockedIps((current) => Array.from(new Set([...current, alert.src])));
        setAlerts((current) =>
          current.map((item) =>
            item.id === alert.id ? { ...item, status: "mitigated", blocked: true } : item
          )
        );
        notify("Source blocked", `${alert.src} has been blocked successfully.`, "success");
      },
    });
  };

  const handleExportJSON = () => {
    const iocData = generateIOCData(alerts);
    exportToJSON(iocData, `iocs-${new Date().toISOString().split("T")[0]}.json`);
    notify("Export successful", `${alerts.length} IOCs exported to JSON.`, "success");
  };

  const handleExportCSV = () => {
    const iocData = generateIOCData(alerts);
    exportToCSV(iocData, `iocs-${new Date().toISOString().split("T")[0]}.csv`);
    notify("Export successful", `${alerts.length} IOCs exported to CSV.`, "success");
  };

  const handleViewReport = (alert) => {
    openModal({
      title: `Full Report: ${alert.id}`,
      description: "",
      confirmLabel: "Close",
      onConfirm: () => {},
      children: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Attack Name</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)" }}>{alert.name}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Attack Type</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)" }}>{alert.type}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Severity</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f43f5e" }}>{alert.severity.toUpperCase()}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Status</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--cyan)" }}>{alert.status}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Source IP</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#7dd3fc", fontFamily: "var(--font-mono)" }}>{alert.src}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Destination</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)", fontFamily: "var(--font-mono)" }}>{alert.dst}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Protocol</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)" }}>{alert.protocol}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Confidence</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: alert.confidence > 90 ? "#34d399" : "#facc15" }}>{alert.confidence}%</div>
            </div>
          </div>
          <div style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", marginBottom: 4 }}>Recommendation</div>
            <div style={{ fontSize: 12, color: "var(--white)", lineHeight: 1.6 }}>
              {alert.severity === "critical"
                ? "Immediate action required. Isolate affected systems and initiate incident response procedures."
                : "Monitor for similar patterns. Review logs and apply security patches if vulnerabilities are suspected."}
            </div>
          </div>
        </div>
      ),
    });
  };

  return (
    <div>
      <div className="mb-20">
        <div className="page-title">Alert Center</div>
        <div className="page-subtitle">Triaged intrusion detection alerts — sorted by severity, status, and time.</div>
      </div>

      <div className="grid-4 mb-20">
        {[
          { label: "Critical", count: counts.critical, color: "#f43f5e" },
          { label: "High", count: counts.high, color: "#fb923c" },
          { label: "Medium", count: counts.medium, color: "#facc15" },
          { label: "Active Now", count: counts.active, color: "#8b5cf6" },
        ].map((item) => (
          <motion.div
            key={item.label}
            className="glass-card"
            style={{ padding: "14px 18px", cursor: "pointer" }}
            whileHover={{ y: -3, borderColor: `${item.color}40` }}
            onClick={() => setSevFilter(item.label === "Active Now" ? "All" : item.label)}
          >
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.count}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>alerts</div>
          </motion.div>
        ))}
      </div>

      <div className="alerts-filter-bar">
        <div className="search-bar" style={{ maxWidth: 280 }}>
          <Search size={13} style={{ color: "var(--muted)" }} />
          <input
            placeholder="Search alerts, IPs, IDs..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="chip-group">
          {severityOptions.map((option) => (
            <button
              key={option}
              className={`filter-chip ${sevFilter === option ? "active" : ""}`}
              onClick={() => setSevFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="status-filter">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "var(--purple)",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(139,92,246,0.15)";
              e.target.style.borderColor = "rgba(139,92,246,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(139,92,246,0.1)";
              e.target.style.borderColor = "rgba(139,92,246,0.2)";
            }}
            onClick={handleExportJSON}
          >
            <Download size={14} />
            JSON
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "var(--purple)",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(139,92,246,0.15)";
              e.target.style.borderColor = "rgba(139,92,246,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(139,92,246,0.1)";
              e.target.style.borderColor = "rgba(139,92,246,0.2)";
            }}
            onClick={handleExportCSV}
          >
            <Download size={14} />
            CSV
          </button>
        </div>
      </div>

      <motion.div className="glass-card" style={{ overflow: "hidden" }} layout>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Name</th>
                <th>Source IP</th>
                <th>Destination</th>
                <th>Protocol</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Confidence</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((alert) => (
                  <motion.tr
                    key={alert.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelected(alert)}
                    style={{ cursor: "pointer" }}
                    whileHover={{ backgroundColor: "rgba(139,92,246,0.06)" }}
                  >
                    <td><span className="mono" style={{ fontSize: 11, color: "var(--cyan)" }}>{alert.id}</span></td>
                    <td style={{ fontWeight: 600, fontSize: 12, maxWidth: 200 }}>{alert.name}</td>
                    <td><span className="mono" style={{ fontSize: 11, color: "var(--pink)" }}>{alert.src}</span></td>
                    <td><span className="mono" style={{ fontSize: 11 }}>{alert.dst}</span></td>
                    <td><span className="tag">{alert.protocol}</span></td>
                    <td style={{ fontSize: 12, color: "var(--muted)" }}>{alert.type}</td>
                    <td><span className={`badge ${alert.severity}`}>{alert.severity}</span></td>
                    <td>
                      <span className={`badge ${statusColor[alert.status] || "low"}`}>{alert.status}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ flex: 1, background: "rgba(139,92,246,0.1)", borderRadius: 3, height: 4, overflow: "hidden" }}>
                          <div style={{ width: `${alert.confidence}%`, height: "100%", background: alert.confidence > 90 ? "var(--green)" : "var(--yellow)", borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", minWidth: 30 }}>{alert.confidence}%</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{alert.time.split(" ")[1]}</span></td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{filtered.length} of {alerts.length} alerts</span>
          <div className="pagination-buttons">
            {[1, 2, 3].map((page) => (
              <button key={page} className={page === 1 ? "active" : ""}>{page}</button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            className="alert-detail-panel"
          >
            <div className="detail-panel-header">
              <div>
                <div className="detail-panel-label">Alert Detail</div>
                <div className="mono detail-panel-id">{selected.id}</div>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="detail-chip-row">
              <span className={`badge ${selected.severity}`}>{selected.severity}</span>
              <span className={`badge ${statusColor[selected.status] || "low"}`}>{selected.status}</span>
              {blockedIps.includes(selected.src) && <span className="badge info">Blocked</span>}
            </div>

            <div className="detail-heading">{selected.name}</div>

            <div className="detail-grid">
              {[
                { label: "Source IP", value: selected.src, mono: true },
                { label: "Destination", value: selected.dst, mono: true },
                { label: "Protocol", value: selected.protocol },
                { label: "Attack Type", value: selected.type },
                { label: "Confidence", value: `${selected.confidence}%`, color: selected.confidence > 90 ? "var(--green)" : "var(--yellow)" },
                { label: "Timestamp", value: selected.time, mono: true },
              ].map((row) => (
                <div key={row.label} className="detail-row">
                  <span className="detail-row-label">{row.label}</span>
                  <span className="detail-row-value" style={{ color: row.color || "var(--white)" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="detail-actions">
  <button
    className="btn-secondary"
    onClick={() => handleViewReport(selected)}
  >
    View Full Report
  </button>

  <button
    className="btn-primary"
    onClick={() => handleInvestigate(selected)}
  >
    Investigate Threat
  </button>

  <button
    className="btn-danger"
    onClick={() => handleBlock(selected)}
  >
    Block Source IP
  </button>

  <button
    className="btn-secondary"
    onClick={() => handleResolve(selected)}
  >
    Mark Resolved
  </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
