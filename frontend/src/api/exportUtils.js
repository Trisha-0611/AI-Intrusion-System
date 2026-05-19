/**
 * Export utilities for IOCs and threat data
 */

export const exportToJSON = (data, filename = "export.json") => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  downloadBlob(blob, filename);
};

export const exportToCSV = (data, filename = "export.csv") => {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  // Get all keys from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header
  const csvContent = [
    headers.join(","),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, filename);
};

const downloadBlob = (blob, filename) => {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateIOCData = (alerts) => {
  return alerts.map(alert => ({
    id: alert.id,
    type: alert.type,
    severity: alert.severity,
    source_ip: alert.src,
    destination_ip: alert.dst,
    protocol: alert.protocol,
    timestamp: alert.time,
    status: alert.status,
    confidence: alert.confidence
  }));
};

export const generateHistoryData = (history) => {
  return history.map(item => ({
    id: item.id,
    name: item.name,
    type: item.type,
    attacker: item.attacker,
    source_country: item.srcCountry,
    source_ip: item.srcIp,
    target: item.target,
    severity: item.severity,
    start_time: item.start,
    end_time: item.end,
    status: item.status,
    damage: item.damage,
    tactics: item.tactics ? item.tactics.join("; ") : ""
  }));
};
