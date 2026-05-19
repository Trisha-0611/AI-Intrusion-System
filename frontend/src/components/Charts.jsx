import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart, Bar, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="value" style={{ color: p.color || p.fill }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export function AttackPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.9} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AttackLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
        <XAxis dataKey="day" tick={{ fill: "rgba(248,250,252,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
        <YAxis tick={{ fill: "rgba(248,250,252,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="attacks" name="Total Attacks" stroke="#ec4899" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="blocked" name="Blocked" stroke="#22d3ee" strokeWidth={2} dot={false} strokeDasharray="4 2" />
        <Line type="monotone" dataKey="critical" name="Critical" stroke="#f43f5e" strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TrafficAreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradNormal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradSuspicious" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradBlocked" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
        <XAxis dataKey="time" tick={{ fill: "rgba(248,250,252,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "rgba(248,250,252,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="normal" name="Normal" stroke="#22d3ee" fill="url(#gradNormal)" strokeWidth={1.5} />
        <Area type="monotone" dataKey="suspicious" name="Suspicious" stroke="#ec4899" fill="url(#gradSuspicious)" strokeWidth={1.5} />
        <Area type="monotone" dataKey="blocked" name="Blocked" stroke="#f43f5e" fill="url(#gradBlocked)" strokeWidth={1.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SeverityBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: "rgba(248,250,252,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "rgba(248,250,252,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="critical" name="Critical" fill="#f43f5e" radius={[2, 2, 0, 0]} maxBarSize={28} />
        <Bar dataKey="high" name="High" fill="#fb923c" radius={[2, 2, 0, 0]} maxBarSize={28} />
        <Bar dataKey="medium" name="Medium" fill="#facc15" radius={[2, 2, 0, 0]} maxBarSize={28} />
        <Bar dataKey="low" name="Low" fill="#34d399" radius={[2, 2, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function VulnBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "rgba(248,250,252,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis dataKey="category" type="category" tick={{ fill: "rgba(248,250,252,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Total" radius={[0, 3, 3, 0]} maxBarSize={20}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.7} />
          ))}
        </Bar>
        <Bar dataKey="patched" name="Patched" radius={[0, 3, 3, 0]} maxBarSize={20}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
