const StatCard = ({
  fulltitle,
  title,
  value,
  icon,
  color,
  para,
  textColor,
  highlightTitle,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className={`rounded-lg p-3 ${color}`}>{icon}</div>

        <p
          className={`rounded-2xl p-1.5 text-xs font-bold ${
            highlightTitle
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-black"
          }`}
        >
          {highlightTitle && "↗ "}
          {title}
        </p>
      </div>

      <div className="flex-col">
        <p className="text-xs font-bold text-gray-500">{fulltitle}</p>
        <h2 className={`text-2xl font-bold ${textColor}`}>{value}</h2>
        <p className="text-xs text-gray-400">{para}</p>
      </div>
    </div>
  );
};

export default StatCard;