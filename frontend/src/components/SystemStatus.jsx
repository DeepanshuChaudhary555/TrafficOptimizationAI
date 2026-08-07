import { systemStatus } from "../data/systemStatus";

function SystemStatus() {
  return (
    <div className="card-dark p-4 h-100">

      <h4 className="mb-4">
        System Status
      </h4>

      {systemStatus.map((item) => (

        <div
          key={item.id}
          className="d-flex justify-content-between align-items-center mb-3"
        >

          <span>{item.name}</span>

          <span
            style={{
              color: item.color,
              fontWeight: "bold",
            }}
          >
            ● {item.status}
          </span>

        </div>

      ))}

    </div>
  );
}

export default SystemStatus;