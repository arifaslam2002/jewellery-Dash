import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------- Data (replace with API data) ---------- */
const goldData = {
  "7D": [
    { date: "Oct 30, 2026", rate: 13050 },
    { date: "Oct 31, 2026", rate: 12730 },
    { date: "Nov 1, 2026", rate: 12730 },
    { date: "Nov 2, 2026", rate: 12780 },
    { date: "Nov 3, 2026", rate: 12800 },
    { date: "Nov 4, 2026", rate: 13100 },
    { date: "Nov 5, 2026", rate: 13385 },
  ],
  "15D": [
    { date: "Oct 22, 2026", rate: 12900 },
    { date: "Oct 24, 2026", rate: 12980 },
    { date: "Oct 26, 2026", rate: 13120 },
    { date: "Oct 28, 2026", rate: 13200 },
    { date: "Oct 30, 2026", rate: 13050 },
    { date: "Nov 1, 2026", rate: 12730 },
    { date: "Nov 3, 2026", rate: 12800 },
    { date: "Nov 5, 2026", rate: 13385 },
  ],
  "30D": [
    { date: "Oct 7, 2026", rate: 12600 },
    { date: "Oct 12, 2026", rate: 12750 },
    { date: "Oct 17, 2026", rate: 12880 },
    { date: "Oct 22, 2026", rate: 12900 },
    { date: "Oct 27, 2026", rate: 13150 },
    { date: "Nov 1, 2026", rate: 12730 },
    { date: "Nov 5, 2026", rate: 13385 },
  ],
};

// Months are listed newest -> oldest, like the reference design
const registrationData = {
  "6M": [
    { month: "Nov 26", total: 15, scheme: 3, signup: 12 },
    { month: "Oct 26", total: 190, scheme: 45, signup: 135 },
    { month: "Sep 26", total: 1100, scheme: 205, signup: 885 },
    { month: "Aug 26", total: 480, scheme: 115, signup: 365 },
    { month: "Jul 26", total: 0, scheme: 0, signup: 0 },
    { month: "Jun 26", total: 0, scheme: 0, signup: 0 },
  ],
  "12M": [
    { month: "Nov 26", total: 15, scheme: 3, signup: 12 },
    { month: "Oct 26", total: 190, scheme: 45, signup: 135 },
    { month: "Sep 26", total: 1100, scheme: 205, signup: 885 },
    { month: "Aug 26", total: 480, scheme: 115, signup: 365 },
    { month: "Jul 26", total: 0, scheme: 0, signup: 0 },
    { month: "Jun 26", total: 0, scheme: 0, signup: 0 },
    { month: "May 26", total: 0, scheme: 0, signup: 0 },
    { month: "Apr 26", total: 0, scheme: 0, signup: 0 },
    { month: "Mar 26", total: 0, scheme: 0, signup: 0 },
    { month: "Feb 26", total: 0, scheme: 0, signup: 0 },
    { month: "Jan 26", total: 0, scheme: 0, signup: 0 },
    { month: "Dec 25", total: 0, scheme: 0, signup: 0 },
  ],
};

const COLORS = {
  gold: "#d4902a",
  goldHigh: "#ea7a1a",
  total: "#6366f1",
  scheme: "#10b981",
  signup: "#ff6a3d",
  navy: "#1e293b",
};

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/* ---------- Small shared pieces ---------- */
const Toggle = ({ options, value, onChange }) => (
  <div className="inline-flex overflow-hidden rounded-md border border-slate-200 bg-white">
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`px-3 py-1 text-[11px] font-semibold transition-colors ${
          value === opt
            ? "bg-slate-800 text-white"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const CardHeader = ({ title, subtitle, children }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0">
      <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
      <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>
    </div>
    <div className="flex shrink-0 flex-wrap items-center gap-3">{children}</div>
  </div>
);

const LinkButton = ({ children }) => (
  <button className="flex items-center gap-1 text-[11px] font-semibold text-slate-800 hover:underline">
    {children}
    <span aria-hidden>→</span>
  </button>
);

const StatStrip = ({ children }) => (
  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md sm:gap-x-6 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
    {children}
  </div>
);

const LegendDot = ({ color, label }) => (
  <span className="flex items-center gap-1.5 text-[10px] text-slate-600">
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ backgroundColor: color }}
    />
    {label}
  </span>
);

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

/* ---------- Gold Rate Price Trend ---------- */
const GoldRateChart = () => {
  const [range, setRange] = useState("7D");
  const data = goldData[range];

  const { low, high, avg } = useMemo(() => {
    const rates = data.map((d) => d.rate);
    return {
      low: Math.min(...rates),
      high: Math.max(...rates),
      avg: rates.reduce((a, b) => a + b, 0) / rates.length,
    };
  }, [data]);

  const yMin = Math.floor((low - 30) / 100) * 100;
  const yMax = Math.ceil((high + 30) / 100) * 100;

  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <CardHeader
        title="Gold Rate Price Trend"
        subtitle="Historical board rate fluctuations per gram"
      >
        <Toggle
          options={["7D", "15D", "30D"]}
          value={range}
          onChange={setRange}
        />
        <LinkButton>Full Report</LinkButton>
      </CardHeader>

      <StatStrip>
        <span>
          Lowest in {range}: <b className="text-slate-800">{inr(low)}</b>
        </span>
        <span>
          Average: <b className="text-slate-800">{inr(avg)}</b>
        </span>
        <span>
          Highest: <b style={{ color: COLORS.goldHigh }}>{inr(high)}</b>
        </span>
      </StatStrip>

      <div className="mt-4 h-52 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.gold} stopOpacity={0.35} />
                <stop
                  offset="100%"
                  stopColor={COLORS.gold}
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eef0f3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={40}
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(v) => `₹${v.toLocaleString("en-IN")}`}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => [inr(v), "Rate / gram"]}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke={COLORS.gold}
              strokeWidth={2}
              fill="url(#goldFill)"
              dot={false}
              activeDot={{
                r: 4,
                fill: COLORS.gold,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ---------- Customer Registrations ---------- */
const RegistrationsChart = () => {
  const [range, setRange] = useState("6M");
  const data = registrationData[range];

  const totals = useMemo(() => {
    const total = data.reduce((s, d) => s + d.total, 0);
    const scheme = data.reduce((s, d) => s + d.scheme, 0);
    const signup = data.reduce((s, d) => s + d.signup, 0);
    const pct = (n) => (total ? Math.round((n / total) * 100) : 0);
    return {
      total,
      scheme,
      signup,
      schemePct: pct(scheme),
      signupPct: pct(signup),
    };
  }, [data]);

  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <CardHeader
        title="Customer Registrations"
        subtitle="Monthly Scheme vs Schemeless (Sign Up Only)"
      >
        <Toggle options={["6M", "12M"]} value={range} onChange={setRange} />
        <LinkButton>Directory</LinkButton>
      </CardHeader>

      <StatStrip>
        <span>
          Total Signups ({range}):{" "}
          <b style={{ color: COLORS.total }}>
            {totals.total.toLocaleString("en-IN")} (100%)
          </b>
        </span>
        <span>
          Scheme Joined:{" "}
          <b style={{ color: COLORS.scheme }}>
            {totals.scheme.toLocaleString("en-IN")} ({totals.schemePct}%)
          </b>
        </span>
        <span>
          Sign Up Only:{" "}
          <b style={{ color: COLORS.signup }}>
            {totals.signup.toLocaleString("en-IN")} ({totals.signupPct}%)
          </b>
        </span>
      </StatStrip>

      <div className="mt-3 flex flex-wrap justify-start gap-x-4 gap-y-1 sm:justify-end">
        <LegendDot color={COLORS.scheme} label="Scheme Joined" />
        <LegendDot color={COLORS.signup} label="Sign Up Only" />
        <LegendDot color={COLORS.total} label="Total Signups (100%)" />
      </div>

      <div className="mt-1 overflow-x-auto">
        <div
          className="h-52 w-full sm:h-56"
          style={{ minWidth: data.length > 6 ? data.length * 56 : undefined }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barGap={2}
              barCategoryGap="22%"
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#eef0f3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={36}
                domain={[0, (max) => Math.max(300, Math.ceil(max / 300) * 300)]}
                tickCount={5}
              />
              <Tooltip
                cursor={{ fill: "rgba(99,102,241,0.06)" }}
                contentStyle={tooltipStyle}
              />
              <Bar
                dataKey="total"
                name="Total Signups"
                fill={COLORS.total}
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="scheme"
                name="Scheme Joined"
                fill={COLORS.scheme}
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="signup"
                name="Sign Up Only"
                fill={COLORS.signup}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

/* ---------- Page section ---------- */
const Charts = () => (
  <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-5 xl:grid-cols-2">
    <GoldRateChart />
    <RegistrationsChart />
  </div>
);

export default Charts;
