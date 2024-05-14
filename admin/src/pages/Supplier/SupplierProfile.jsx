import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SupplierProfile = () => {
  let navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: "20px", borderRadius: "10px", maxWidth: "600px", marginLeft: "60px", marginTop: "50px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ color: "#333", marginBottom: "30px", marginLeft: "450px" }}>Supplier Profile</h1>
        <div
          style={{
            backgroundColor: "grey",
            borderRadius: "20px",
            marginLeft: "250px",
            padding: "40px",
            maxWidth: "800px",
            height: "60vh",
            width: "100%",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button type="button" onClick={() => navigate("/Supplier/RawMreq")} style={{
              padding: "40px 80px",
              backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", marginBottom: "10px", width: "100%"
            }}>Supply Requests</button>
            <button type="button" onClick={() => navigate("/Supplierpro/RawMreqres")} style={{
              padding: "40px 80px",
              backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", marginBottom: "10px", width: "100%"
            }}>Manage Supply Requests</button>
            <button type="button" onClick={() => navigate("/AddPaymentRequest")} style={{
              padding: "40px 80px",
              backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", marginBottom: "10px", width: "100%"
            }}>Requests Payments</button>
          </form>

          <p style={{ fontSize: "1.2rem", marginLeft: "5px", marginTop: "20px" }}>Current Date and Time: {dateTime.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
