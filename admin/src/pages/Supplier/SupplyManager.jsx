import { useNavigate } from "react-router-dom";

const SupplyManager = () => {
  let navigate = useNavigate();

  return (
    <>
    <div style={{ marginLeft: "50px" }}>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <div 
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Supply Manager DashBoard</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <div 
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              color: "#fff",
              textAlign: "center",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div>
              <label style={{ padding: "0 10px" }}>Name</label>
              <br />
              <input type="text" style={{ padding: "8px", marginLeft: "10px" }} disabled />
              <br />
              <br />
              <label style={{ padding: "0 10px" }}>Mobile</label>
              <br />
              <input type="text" style={{ padding: "8px", marginLeft: "10px" }} disabled />
              <br />
              <br />
              <label style={{ padding: "0 10px" }}>Email</label>
              <br />
              <input type="text" style={{ padding: "8px", marginLeft: "10px" }} disabled />
              <br />
              <br />
              <label style={{ padding: "0 10px" }}>Reg. No.</label>
              <br />
              <input type="text" style={{ padding: "8px", marginLeft: "10px" }} disabled />
              <br />
              <br />
            </div>
            <button 
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                opacity: "1",
              }}
            >
              Edit Details
            </button>
          </div>
        </div>
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", borderRadius: "10px", padding: "20px" }}>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <button 
              onClick={() => navigate("/create")} 
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                opacity: "1",
              }}
            >
              Add Supply Requests
            </button>
            <br />
            <br />
            <button 
              onClick={() => navigate("/SupplyRequest")} 
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                opacity: "1",
              }}
            >
              Manage Supply Requests
            </button>
            <br />
            <br />
            <button 
              onClick={() => navigate("/Supplier/ratings")} 
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                opacity: "1",
              }}
            >
              Give rating about supply quality & generate reports
            </button>
            <br />
            <br />
            <button 
              onClick={() => navigate("/Calculation")} 
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                opacity: "1",
              }}
            >
              Calculate Requested Quantity
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default SupplyManager;
