import { useEffect, useState } from "react";
import axios from "axios";
const port = 4000;

const SupplierProfile = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = `http://localhost:${port}/api/supplier/request/getall/`;

    axios.get(url).then((response) => setData(response.data));
  };

  const Accept = (index) => {
    const setUrl = `http://localhost:${port}/api/supplier/arequest/create`;
    const payload = {
      name: Data[index].name,
      quantity: Data[index].quantity,
      price: Data[index].price,
      deadLine: Data[index].deadLine,
    };
    console.log(index);
    axios.post(setUrl, payload).then((res) => console.log(res));
    handleDelete(Data[index]._id);
    fetchData();
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:${port}/api/supplier/request/delete/` + id)
      .then((res) => {
        console.log(res);
        // window.location.reload();
      })
      .catch((errr) => console.log(errr));
  };

  const RowGen = () => {
    const TCellStyle = "";
    if (!Data) {
      console.log("Err");
    } else {
      return Data.map((Request, index) => (
        <>
          <tr className="py-4" key={index}>
            <td className={TCellStyle}>{Request.name}</td><td></td>
            <td className={TCellStyle}>{Request.quantity}</td><td></td>
            <td className={TCellStyle}>{Request.deadLine}</td><td></td>
            <td className={TCellStyle}>{Request.price}</td><td></td>
            <td className={TCellStyle}>
              <button
                className="btn btn-success "
                onClick={() => {
                  Accept(index);
                  fetchData();
                }}
              >
                Accept
              </button>
              <br />
            </td>
          </tr>
        </>
      ));
    }
  };

  return (
    <>
  <div 
    style={{
      backgroundImage: `url('../res/spice3.jpg')`,
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        padding: "30px",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ color: "#000", backgroundColor: "rgba(255, 255, 255, 0.75)", padding: "10px", borderRadius: "10px" }}>Raw Material Requests</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div 
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              textAlign: "center",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <table style={{ borderCollapse: "collapse", border: "5px solid #fff" }}>
              <thead style={{ backgroundColor: "#fff", color: "#000", border: "2px solid #fff" }}>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Deadline</th>
                  <th>Price (Rs.)</th>
                  <th>Actions</th>
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
</>

  );
};

export default SupplierProfile;
