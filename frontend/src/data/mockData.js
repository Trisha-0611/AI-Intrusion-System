// ─── LIVE THREAT FEED ───
export const liveFeedData = [
  { id: 1, title: "SQL Injection Attempt Blocked", ip: "192.168.45.231", src: "RU", time: "00:23s ago", severity: "critical", type: "Injection" },
  { id: 2, title: "Port Scan Detected", ip: "10.0.12.88", src: "CN", time: "01:12s ago", severity: "high", type: "Reconnaissance" },
  { id: 3, title: "Brute Force SSH Login", ip: "185.220.101.47", src: "IR", time: "02:45s ago", severity: "critical", type: "Credential Attack" },
  { id: 4, title: "Anomalous DNS Query", ip: "172.16.254.3", src: "KP", time: "03:18s ago", severity: "medium", type: "DNS Tunneling" },
  { id: 5, title: "Privilege Escalation Attempt", ip: "10.0.0.14", src: "INT", time: "04:02s ago", severity: "critical", type: "Lateral Movement" },
  { id: 6, title: "Malicious Payload Signature Matched", ip: "203.0.113.42", src: "BR", time: "05:30s ago", severity: "high", type: "Malware" },
  { id: 7, title: "Unusual Outbound Traffic Volume", ip: "192.168.1.104", src: "INT", time: "06:11s ago", severity: "medium", type: "Data Exfiltration" },
  { id: 8, title: "Cross-Site Scripting Detected", ip: "198.51.100.77", src: "DE", time: "07:55s ago", severity: "medium", type: "XSS" },
  { id: 9, title: "RDP Brute Force Attempt", ip: "185.130.5.234", src: "PL", time: "08:44s ago", severity: "high", type: "Credential Attack" },
  { id: 10, title: "Suspicious Registry Modification", ip: "10.0.0.52", src: "INT", time: "09:20s ago", severity: "high", type: "Persistence" },
];

// ─── ALERTS TABLE ───
export const alertsData = [
  { id: "ALT-9841", name: "APT29 Cozy Bear Signature", src: "185.220.101.47", dst: "10.0.0.5", protocol: "HTTPS", severity: "critical", status: "active", type: "APT", time: "2025-05-17 00:12:38", confidence: 97 },
  { id: "ALT-9840", name: "CVE-2024-3094 Exploit Attempt", src: "203.0.113.55", dst: "10.0.0.22", protocol: "SSH", severity: "critical", status: "active", type: "Exploit", time: "2025-05-17 00:10:14", confidence: 94 },
  { id: "ALT-9839", name: "Cobalt Strike Beacon", src: "172.16.0.80", dst: "198.51.100.5", protocol: "TCP", severity: "critical", status: "investigating", type: "C2", time: "2025-05-17 00:08:51", confidence: 91 },
  { id: "ALT-9838", name: "SSH Dictionary Attack", src: "45.33.32.156", dst: "10.0.1.12", protocol: "SSH", severity: "high", status: "mitigated", type: "Brute Force", time: "2025-05-17 00:05:02", confidence: 99 },
  { id: "ALT-9837", name: "LDAP Injection Vector", src: "10.0.0.67", dst: "10.0.0.100", protocol: "LDAP", severity: "high", status: "active", type: "Injection", time: "2025-05-16 23:58:41", confidence: 88 },
  { id: "ALT-9836", name: "Tor Exit Node Communication", src: "199.87.154.255", dst: "10.0.0.77", protocol: "TCP", severity: "high", status: "active", type: "TOR", time: "2025-05-16 23:52:19", confidence: 96 },
  { id: "ALT-9835", name: "Data Exfiltration via DNS", src: "10.0.0.33", dst: "8.8.8.8", protocol: "DNS", severity: "medium", status: "investigating", type: "Exfiltration", time: "2025-05-16 23:45:07", confidence: 78 },
  { id: "ALT-9834", name: "Kerberoasting Attack", src: "10.0.0.104", dst: "10.0.0.2", protocol: "Kerberos", severity: "high", status: "active", type: "Privilege", time: "2025-05-16 23:40:33", confidence: 85 },
  { id: "ALT-9833", name: "Suspicious PowerShell Execution", src: "10.0.0.19", dst: "N/A", protocol: "Host", severity: "medium", status: "resolved", type: "Execution", time: "2025-05-16 23:33:12", confidence: 82 },
  { id: "ALT-9832", name: "ICMP Flood DDoS", src: "104.21.0.0/16", dst: "10.0.0.1", protocol: "ICMP", severity: "medium", status: "mitigated", type: "DDoS", time: "2025-05-16 23:28:55", confidence: 99 },
  { id: "ALT-9831", name: "Log4Shell Payload Detected", src: "198.51.100.42", dst: "10.0.0.88", protocol: "HTTP", severity: "critical", status: "mitigated", type: "RCE", time: "2025-05-16 23:20:18", confidence: 100 },
  { id: "ALT-9830", name: "ARP Spoofing Detected", src: "10.0.0.203", dst: "10.0.0.1", protocol: "ARP", severity: "medium", status: "resolved", type: "MitM", time: "2025-05-16 23:15:44", confidence: 90 },
];

// ─── ATTACK HISTORY ───
export const attackHistory = [
  { id: "ATK-4421", name: "Operation ShadowByte", type: "APT", attacker: "APT29", srcCountry: "Russia", srcIp: "185.220.101.47", target: "auth-server-01", severity: "critical", start: "2025-05-16 22:10", end: "2025-05-16 22:58", status: "blocked", damage: "Low", tactics: ["Phishing", "Lateral Movement", "Exfiltration"] },
  { id: "ATK-4420", name: "CVE-2024-3094 Campaign", type: "Exploit", attacker: "Unknown", srcCountry: "China", srcIp: "203.0.113.55", target: "db-cluster-02", severity: "critical", start: "2025-05-16 20:44", end: "2025-05-16 21:12", status: "blocked", damage: "None", tactics: ["Exploit", "Privilege Escalation"] },
  { id: "ATK-4419", name: "Credential Spray Wave", type: "Brute Force", attacker: "FIN7", srcCountry: "Ukraine", srcIp: "45.142.212.100", target: "vpn-gateway", severity: "high", start: "2025-05-16 18:30", end: "2025-05-16 19:15", status: "mitigated", damage: "Low", tactics: ["Credential Access"] },
  { id: "ATK-4418", name: "Cobalt Strike C2 Beacon", type: "C2", attacker: "Lazarus", srcCountry: "N. Korea", srcIp: "172.16.0.80", target: "workstation-14", severity: "critical", start: "2025-05-16 15:02", end: "2025-05-16 16:48", status: "contained", damage: "Medium", tactics: ["C2", "Defense Evasion", "Persistence"] },
  { id: "ATK-4417", name: "Log4Shell Mass Scan", type: "RCE", attacker: "Unknown", srcCountry: "Brazil", srcIp: "198.51.100.42", target: "web-app-frontend", severity: "critical", start: "2025-05-15 11:20", end: "2025-05-15 11:45", status: "blocked", damage: "None", tactics: ["Exploit", "RCE"] },
  { id: "ATK-4416", name: "DNS Tunneling Campaign", type: "Exfiltration", attacker: "Unknown", srcCountry: "Iran", srcIp: "172.16.254.3", target: "internal-dns", severity: "medium", start: "2025-05-15 09:12", end: "2025-05-15 10:50", status: "resolved", damage: "Low", tactics: ["Exfiltration", "C2"] },
  { id: "ATK-4415", name: "Ransomware Pre-Stage", type: "Ransomware", attacker: "LockBit", srcCountry: "Russia", srcIp: "10.0.0.45", target: "file-server-03", severity: "critical", start: "2025-05-14 23:40", end: "2025-05-14 23:59", status: "blocked", damage: "None", tactics: ["Execution", "Impact", "Encryption"] },
  { id: "ATK-4414", name: "Insider Privilege Abuse", type: "Insider Threat", attacker: "Internal", srcCountry: "Internal", srcIp: "10.0.0.104", target: "hr-database", severity: "high", start: "2025-05-14 14:22", end: "2025-05-14 14:48", status: "investigated", damage: "Medium", tactics: ["Privilege Escalation", "Collection"] },
];

// ─── TRAFFIC DATA (7 days) ───
export const trafficData = [
  { time: "00:00", normal: 4200, suspicious: 120, blocked: 45 },
  { time: "02:00", normal: 2800, suspicious: 280, blocked: 110 },
  { time: "04:00", normal: 1900, suspicious: 420, blocked: 180 },
  { time: "06:00", normal: 3400, suspicious: 190, blocked: 70 },
  { time: "08:00", normal: 7800, suspicious: 340, blocked: 95 },
  { time: "10:00", normal: 9200, suspicious: 510, blocked: 220 },
  { time: "12:00", normal: 11400, suspicious: 680, blocked: 310 },
  { time: "14:00", normal: 10800, suspicious: 920, blocked: 480 },
  { time: "16:00", normal: 9600, suspicious: 760, blocked: 380 },
  { time: "18:00", normal: 8200, suspicious: 440, blocked: 190 },
  { time: "20:00", normal: 6400, suspicious: 320, blocked: 140 },
  { time: "22:00", normal: 5100, suspicious: 580, blocked: 290 },
];

// ─── ATTACK TREND (30 days) ───
export const attackTrend = [
  { day: "Apr 18", attacks: 34, blocked: 31, critical: 4 },
  { day: "Apr 19", attacks: 28, blocked: 26, critical: 2 },
  { day: "Apr 20", attacks: 52, blocked: 48, critical: 7 },
  { day: "Apr 21", attacks: 41, blocked: 38, critical: 5 },
  { day: "Apr 22", attacks: 37, blocked: 35, critical: 3 },
  { day: "Apr 23", attacks: 63, blocked: 57, critical: 9 },
  { day: "Apr 24", attacks: 72, blocked: 65, critical: 11 },
  { day: "Apr 25", attacks: 56, blocked: 52, critical: 8 },
  { day: "Apr 26", attacks: 44, blocked: 42, critical: 6 },
  { day: "Apr 27", attacks: 38, blocked: 36, critical: 4 },
  { day: "Apr 28", attacks: 81, blocked: 73, critical: 14 },
  { day: "Apr 29", attacks: 95, blocked: 84, critical: 18 },
  { day: "Apr 30", attacks: 68, blocked: 62, critical: 10 },
  { day: "May 1", attacks: 53, blocked: 50, critical: 7 },
  { day: "May 2", attacks: 47, blocked: 44, critical: 5 },
  { day: "May 3", attacks: 61, blocked: 56, critical: 8 },
  { day: "May 4", attacks: 88, blocked: 79, critical: 15 },
  { day: "May 5", attacks: 74, blocked: 68, critical: 12 },
  { day: "May 6", attacks: 59, blocked: 54, critical: 9 },
  { day: "May 7", attacks: 43, blocked: 41, critical: 6 },
  { day: "May 8", attacks: 112, blocked: 98, critical: 22 },
  { day: "May 9", attacks: 89, blocked: 82, critical: 16 },
  { day: "May 10", attacks: 67, blocked: 62, critical: 10 },
  { day: "May 11", attacks: 54, blocked: 51, critical: 7 },
  { day: "May 12", attacks: 78, blocked: 71, critical: 13 },
  { day: "May 13", attacks: 93, blocked: 84, critical: 17 },
  { day: "May 14", attacks: 107, blocked: 95, critical: 20 },
  { day: "May 15", attacks: 82, blocked: 76, critical: 14 },
  { day: "May 16", attacks: 69, blocked: 64, critical: 11 },
  { day: "May 17", attacks: 48, blocked: 45, critical: 8 },
];

// ─── ATTACK DISTRIBUTION ───
export const attackDistribution = [
  { name: "Brute Force", value: 28, color: "#ec4899" },
  { name: "SQL Injection", value: 18, color: "#8b5cf6" },
  { name: "Malware / C2", value: 15, color: "#22d3ee" },
  { name: "DDoS", value: 13, color: "#f43f5e" },
  { name: "Phishing", value: 11, color: "#fb923c" },
  { name: "Privilege Esc.", value: 9, color: "#facc15" },
  { name: "Ransomware", value: 6, color: "#34d399" },
];

// ─── SEVERITY BY DAY ───
export const severityByDay = [
  { day: "Mon", critical: 12, high: 28, medium: 44, low: 18 },
  { day: "Tue", critical: 8, high: 22, medium: 51, low: 24 },
  { day: "Wed", critical: 19, high: 35, medium: 38, low: 15 },
  { day: "Thu", critical: 24, high: 41, medium: 29, low: 12 },
  { day: "Fri", critical: 17, high: 33, medium: 47, low: 19 },
  { day: "Sat", critical: 6, high: 18, medium: 33, low: 28 },
  { day: "Sun", critical: 9, high: 24, medium: 39, low: 22 },
];

// ─── GEO THREAT SOURCE ───
export const geoThreats = [
  { country: "Russia", attacks: 1842, percentage: 28.4, trend: "up", flag: "🇷🇺" },
  { country: "China", attacks: 1564, percentage: 24.1, trend: "up", flag: "🇨🇳" },
  { country: "Iran", attacks: 743, percentage: 11.5, trend: "stable", flag: "🇮🇷" },
  { country: "N. Korea", attacks: 621, percentage: 9.6, trend: "up", flag: "🇰🇵" },
  { country: "Brazil", attacks: 489, percentage: 7.5, trend: "down", flag: "🇧🇷" },
  { country: "Ukraine", attacks: 412, percentage: 6.4, trend: "stable", flag: "🇺🇦" },
  { country: "Germany", attacks: 287, percentage: 4.4, trend: "down", flag: "🇩🇪" },
  { country: "USA", attacks: 210, percentage: 3.2, trend: "stable", flag: "🇺🇸" },
  { country: "India", attacks: 185, percentage: 2.9, trend: "up", flag: "🇮🇳" },
  { country: "Others", attacks: 126, percentage: 1.9, trend: "stable", flag: "🌐" },
];

// ─── DETECTION LOGS ───
export const detectionLogs = [
  { time: "00:23:41", level: "ERROR", module: "IDS_ENGINE", msg: "Critical signature match: APT29_C2_BEACON on 185.220.101.47:443 → 10.0.0.5:52341" },
  { time: "00:22:18", level: "WARN", module: "ML_CLASSIFIER", msg: "Anomaly score 0.94 exceeded threshold 0.85 for flow 192.168.45.231 → 10.0.0.22" },
  { time: "00:21:05", level: "ERROR", module: "FIREWALL", msg: "Blocked 1,240 packets from 104.21.0.0/16 — ICMP flood pattern detected" },
  { time: "00:19:52", level: "INFO", module: "AUTH_MONITOR", msg: "SSH brute force mitigated: 45.33.32.156 blocked after 847 failed attempts" },
  { time: "00:18:33", level: "WARN", module: "DNS_GUARD", msg: "Suspicious DNS query length 243 bytes from 10.0.0.33 → possible tunneling" },
  { time: "00:17:11", level: "ERROR", module: "EDR_AGENT", msg: "Malicious PowerShell encoded command blocked on WORKSTATION-14 (user: jsmith)" },
  { time: "00:15:44", level: "INFO", module: "THREAT_INTEL", msg: "IOC enrichment complete: 3 new C2 IPs added to blocklist from ThreatFox feed" },
  { time: "00:14:28", level: "WARN", module: "NETFLOW", msg: "Unusual outbound volume: 10.0.0.104 transmitted 4.2GB to 198.51.100.77 in 8 min" },
  { time: "00:13:05", level: "DEBUG", module: "ML_MODEL", msg: "Model retrained on 2,847 new samples — accuracy delta +0.3% → 98.7%" },
  { time: "00:11:49", level: "INFO", module: "SIEM_CORE", msg: "Correlation rule triggered: MITRE ATT&CK T1055 (Process Injection) chain detected" },
  { time: "00:10:22", level: "ERROR", module: "IDS_ENGINE", msg: "Log4Shell payload CVE-2021-44228 detected in HTTP header from 198.51.100.42" },
  { time: "00:09:01", level: "WARN", module: "INTEGRITY", msg: "Registry key HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run modified by PID 4812" },
];

// ─── ACTIVE SESSIONS ───
export const activeSessions = [
  { host: "firewall-01", ip: "10.0.0.1", status: "healthy", load: 12, connections: 4821 },
  { host: "ids-sensor-02", ip: "10.0.0.8", status: "healthy", load: 67, connections: 12440 },
  { host: "web-app-01", ip: "10.0.0.20", status: "warning", load: 88, connections: 8932 },
  { host: "db-cluster-01", ip: "10.0.0.30", status: "healthy", load: 44, connections: 3201 },
  { host: "vpn-gateway", ip: "10.0.0.50", status: "critical", load: 97, connections: 742 },
  { host: "mail-server", ip: "10.0.0.60", status: "healthy", load: 31, connections: 2810 },
];

// ─── MITRE ATT&CK ───
export const mitreData = [
  { tactic: "Initial Access", techniques: 18, detected: 17, severity: "high" },
  { tactic: "Execution", techniques: 24, detected: 22, severity: "critical" },
  { tactic: "Persistence", techniques: 31, detected: 28, severity: "high" },
  { tactic: "Privilege Escalation", techniques: 19, detected: 17, severity: "critical" },
  { tactic: "Defense Evasion", techniques: 43, detected: 36, severity: "medium" },
  { tactic: "Credential Access", techniques: 15, detected: 14, severity: "high" },
  { tactic: "Discovery", techniques: 27, detected: 26, severity: "medium" },
  { tactic: "Lateral Movement", techniques: 12, detected: 11, severity: "high" },
  { tactic: "Collection", techniques: 9, detected: 8, severity: "medium" },
  { tactic: "Exfiltration", techniques: 10, detected: 9, severity: "high" },
  { tactic: "Command & Control", techniques: 22, detected: 19, severity: "critical" },
  { tactic: "Impact", techniques: 14, detected: 13, severity: "critical" },
];

// ─── NETWORK NODES ───
export const networkNodes = [
  { id: "FW-01", type: "firewall", status: "ok", x: 50, y: 50 },
  { id: "IDS-01", type: "ids", status: "ok", x: 200, y: 80 },
  { id: "WEB-01", type: "server", status: "warning", x: 350, y: 50 },
  { id: "DB-01", type: "database", status: "ok", x: 350, y: 150 },
  { id: "VPN-01", type: "vpn", status: "critical", x: 50, y: 150 },
];

// ─── VULNERABILITY SCAN ───
export const vulnerabilityData = [
  { category: "Critical CVEs", count: 7, patched: 4, color: "#f43f5e" },
  { category: "High CVEs", count: 23, patched: 19, color: "#fb923c" },
  { category: "Medium CVEs", count: 51, patched: 44, color: "#facc15" },
  { category: "Low CVEs", count: 112, patched: 108, color: "#34d399" },
];
