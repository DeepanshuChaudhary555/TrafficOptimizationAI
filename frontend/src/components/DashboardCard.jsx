function DashboardCard({ title, value, icon: Icon, color }) {
  return (
    <div
      className="card-dark p-4 h-100"
      style={{
        borderLeft: `6px solid ${color}`,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 style={{ color: "#CBD5E1" }}>{title}</h6>

          <h2 style={{ fontWeight: "bold" }}>{value}</h2>
        </div>

        <div
          style={{
            fontSize: "45px",
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