import { CheckCircle, AlertCircle } from "lucide-react";
import { useConnectivity } from "../contexts/ConnectivityContext";

export default function ConnectivityIndicator() {
  const { isConnected, lastChecked } = useConnectivity();

  const getTimeAgo = () => {
    if (!lastChecked) return "checking...";
    const seconds = Math.floor((new Date() - lastChecked) / 1000);
    if (seconds < 10) return "now";
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ago`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        borderRadius: 20,
        backgroundColor: isConnected ? "rgba(52, 211, 153, 0.08)" : "rgba(244, 63, 94, 0.08)",
        border: `1px solid ${isConnected ? "rgba(52, 211, 153, 0.3)" : "rgba(244, 63, 94, 0.3)"}`,
        fontSize: 12,
        color: isConnected ? "#34d399" : "#f43f5e",
      }}
    >
      {isConnected ? (
        <CheckCircle size={14} />
      ) : (
        <AlertCircle size={14} />
      )}
      <span>
        Backend {isConnected ? "Connected" : "Offline"} · {getTimeAgo()}
      </span>
    </div>
  );
}
