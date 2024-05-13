import { useNavigate } from "react-router-dom";

const SupplierProfile = () => {
  let navigate = useNavigate();
  var SName = "Udan Pasindu";
  var SMobile = "0717325275";
  var SEmail = "Udanpasindu934@gmail.com";
  var SReg = "S003";

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"2000px",
        height: "100vh",
        background: "linear-gradient(139deg, #000, #c3cfe2)",
      }}
    >
      <div 
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "800px",
          
        }}
      >
        <div 
          style={{
            backgroundColor: "#394a6d",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            padding: "50px",
          }}
        >
          <h1 style={{ color: "#fff", margin: "10" }}>Supplier Profile</h1>
        </div>
        <div style={{ padding: "100px" }}>
          
          <div style={{  flexDirection: "column" }}>
            <button 
              onClick={() => navigate("/Supplier/RawMreq")} 
              style={{
                padding: "30px 200px",
                margin: "5px",
                backgroundColor: "tomato",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Supply Requests
            </button>
            <button 
              onClick={() => navigate("/Supplierpro/RawMreqres")} 
              style={{
                padding: "30px 175px",
                margin: "5px",
                backgroundColor: "tomato",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Manage Supply Requests
            </button>
            <button 
              onClick={() => navigate("/AddPaymentRequest")} 
              style={{
                padding: "30px 192px",
                margin: "5px",
                backgroundColor: "tomato",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Requests Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
