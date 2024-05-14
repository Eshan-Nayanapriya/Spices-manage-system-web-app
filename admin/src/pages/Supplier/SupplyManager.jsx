import { useNavigate } from "react-router-dom";

const SupplyManager = () => {
  let navigate = useNavigate();

  return (
    <>
      <div
        style={{
          
          backgroundSize: "auto",
          backgroundColor:"#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "grey",
            borderRadius: "20px",
            marginLeft:"250px",
            padding: "40px",
            maxWidth: "800px",
            width: "100%",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333",
          marginLeft:"100px",
          marginRight:"100px",
          marginTop:"-100px" }}>
            Supply Manager Dashboard
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" ,
          width:"600px",marginLeft:"40px"}}>
            <button
              onClick={() => navigate("/create")}
              style={{
                padding: "20px",
                backgroundColor: "#ff6347",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                textTransform: "uppercase",
              }}
            >
              Add Supply Requests
            </button>
            <button
              onClick={() => navigate("/SupplyRequest")}
              style={{
                padding: "20px",
                backgroundColor: "#ff6347",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                textTransform: "uppercase",
              }}
            >
              Manage Supply Requests
            </button>
            <button
              onClick={() => navigate("/Supplier/ratings")}
              style={{
                padding: "20px",
                backgroundColor: "#ff6347",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                textTransform: "uppercase",
              }}
            >
              Rate Supply Quality & Generate Reports
            </button>
            <button
              onClick={() => navigate("/Calculation")}
              style={{
                padding: "20px",
                backgroundColor: "#ff6347",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                textTransform: "uppercase",
              }}
            >
              Calculate Requested Quantity
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplyManager;
