const data = [
  { month: "Jan", applications: 20 },
  { month: "Feb", applications: 45 },
  { month: "Mar", applications: 38 },
  { month: "Apr", applications: 70 },
  { month: "May", applications: 92 },
  { month: "Jun", applications: 120 },
];

const maxApplications = Math.max(...data.map((item) => item.applications));
const points = data
  .map((item, index) => {
    const x = 40 + index * 110;
    const y = 250 - (item.applications / maxApplications) * 210;

    return `${x},${y}`;
  })
  .join(" ");

export default function ApplicationChart() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <h2 className="mb-8 text-2xl font-bold">
        Applications Trend
      </h2>

      <div className="h-[350px] min-w-0 overflow-hidden rounded-2xl bg-black p-4">
        <svg viewBox="0 0 620 300" className="h-full w-full" role="img" aria-label="Applications trend from January to June">
          {[50, 100, 150, 200, 250].map((y) => (
            <line key={y} x1="30" x2="600" y1={y} y2={y} stroke="#1f2937" strokeWidth="1" />
          ))}

          <polyline
            fill="none"
            points={points}
            stroke="#3b82f6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />

          {data.map((item, index) => {
            const x = 40 + index * 110;
            const y = 250 - (item.applications / maxApplications) * 210;

            return (
              <g key={item.month}>
                <circle cx={x} cy={y} fill="#0a0a0a" r="8" stroke="#60a5fa" strokeWidth="4" />
                <text x={x} y="285" fill="#9ca3af" fontSize="16" textAnchor="middle">
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
