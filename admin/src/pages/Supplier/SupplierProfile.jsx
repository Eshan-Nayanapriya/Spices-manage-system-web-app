import { useNavigate } from "react-router-dom";

const SupplierProfile = () => {
  let navigate = useNavigate();
 

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "2000px",
        height: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div
        style={{
          backgroundColor: "grey",


          width: "800px",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",

        }}
      >
        <div
          style={{
            backgroundColor: "#394a6d",


            borderTopRightRadius: "0px",
            padding: "50px",
          }}
        >
          <h1 style={{ color: "#fff", marginLeft: "180px" }}>Supplier Profile</h1>
        </div>
        <div style={{ padding: "100px" }}>

          <div style={{ flexDirection: "column" }}>
            <button
              onClick={() => navigate("/Supplier/RawMreq")}
              style={{
                padding: "30px 200px",
                margin: "15px",
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
                margin: "15px",
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
                margin: "15px",
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
