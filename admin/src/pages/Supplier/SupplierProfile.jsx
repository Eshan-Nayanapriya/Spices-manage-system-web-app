import { useNavigate } from "react-router-dom";

const SupplierProfile = () => {
  let navigate = useNavigate();
  var SName = "Udan Pasindu"
  var SMobile = "0717325275"
  var SEmail = "Udanpasindu934@gmail.com"
  var SReg = "S003"

  return (
    <div 
  style={{
    
    backgroundSize: "cover",
    backgroundPosition: "center",
    alignItems: "center",
    height: "100vh",
    marginLeft:"300px",
    marginTop:"60px",
    backgroundColor: "#fff",
  }}
>
  <div 
    style={{
      backgroundColor: "rgba(5, 8, 2, 0.75)",
      borderRadius: "10px",
      padding: "100px",
    }}
  >
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#fff" }}>Supplier Profile</h1>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ color: "#fff", textAlign: "center", padding: "20px" }}>
          
          
        </div>
      </div>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", borderRadius: "10px", padding: "20px" }}>
        <div style={{ textAlign: "center", padding: "100px" }}>
          <button 
            onClick={() => navigate("/Supplier/RawMreq")} 
            style={{
              padding: "30px 60px",
              backgroundColor: "tomato",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: "1",
            }}
          >
            Supply Requests
          </button>
          <br />
          <br />
          <button 
            onClick={() => navigate("/Supplierpro/RawMreqres")} 
            style={{
              padding: "30px 60px",
              backgroundColor: "tomato",
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
            onClick={() => navigate("/AddPaymentRequest")} 
            style={{
              padding: "30px 60px",
              backgroundColor: "tomato",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: "1",
            }}
          >
            Requests Payments
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
};

export default SupplierProfile;
