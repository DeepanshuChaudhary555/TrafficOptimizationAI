import { useEffect, useState } from "react";

function DashboardCard({
  title,
  value,
  suffix = "",
  icon: Icon,
  color,
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 40;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formattedValue =
    Number.isInteger(value)
      ? Math.floor(displayValue)
      : displayValue.toFixed(1);

  return (
    <div
      className="card-dark dashboard-card p-4 h-100"
      style={{
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="stat-title">
            {title}
          </h6>

          <h2 className="stat-value">
            {formattedValue}
            {suffix}
          </h2>
        </div>

        <div
          className="stat-icon"
          style={{
            color: color,
          }}
        >
          <Icon />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;