function Navbar() {
  return (
    <nav
      className="navbar navbar-dark px-4"
      style={{
        backgroundColor: "#1E293B",
        height: "70px",
        borderBottom: "1px solid #475569",
      }}
    >
      <h4 className="text-light m-0">
        🚦 TrafficFlow AI
      </h4>

      <div className="text-light">
        Admin
      </div>
    </nav>
  );
}

export default Navbar;