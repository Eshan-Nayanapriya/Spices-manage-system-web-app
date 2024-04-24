import { useEffect, useState } from "react";
import axios from "axios";
const port = 4000;

const RawMReqRes = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = `http://localhost:${port}/api/supplier/arequest/getall/`;
    axios.get(url).then((response) => setData(response.data));
  };

  const deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios
        .delete(`http://localhost:${port}/api/supplier/arequest/delete/` + id)
        .then((resp) => {
          console.log(resp);
          fetchData(); // Refresh the list after successful deletion
        })
        .catch((errr) => console.log(errr));
    }
  };

  const RowGen = () => {
    const TCellStyle = "bg-black bg-opacity-25 text-white ";
    if (!Data) {
      console.log("Err");
    } else {
      return Data.map((Request, index) => (
        <tr className="py-4" key={index}>
          <td className={TCellStyle}>{Request.name}</td>
          <td className={TCellStyle}>{Request.quantity}</td>
          <td className={TCellStyle}>{Request.deadLine}</td>
          <td className={TCellStyle}>{Request.price}</td>
          <td className={TCellStyle}>
            <button onClick={handleSubmit} className="btn btn-success m-2">
              Submit
            </button>
            <button
              onClick={() => deleteRequest(Request._id)}
              className="btn btn-danger m-2"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }
  };

  const handleSubmit = () => {
    window.location =
      "https://docs.google.com/forms/d/e/1FAIpQLSehfvgh0QMqWBBw9mfyEglCmrfQGx4Zhx6F8mthyKyinHT-TA/viewform?usp=sf_link";
  };

  return (
    <div 
  style={{
    backgroundImage: `url('../res/spice9.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#007bff", /* Fallback color */
  }}
>
  <div 
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      padding: "20px",
    }}
  >
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#000", backgroundColor: "rgba(255, 255, 255, 0.25)", padding: "10px", borderRadius: "5px" }}>
        Raw Material Request Response
      </h1>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", borderRadius: "5px", padding: "20px" }}>
        <div>
          <table style={{ borderCollapse: "collapse", border: "2px solid #fff" }}>
            <thead style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", color: "#000", border: "2px solid #fff" }}>
              <tr>
                <th style={{ padding: "10px" }}>Item</th>
                <th style={{ padding: "10px" }}>Quantity</th>
                <th style={{ padding: "10px" }}>Dead Line</th>
                <th style={{ padding: "10px" }}>Price (Rs.)</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <RowGen />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default RawMReqRes;
