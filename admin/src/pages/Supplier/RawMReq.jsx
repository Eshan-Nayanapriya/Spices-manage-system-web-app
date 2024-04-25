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
    <div 
  style={{
    backgroundSize: "cover",
    backgroundPosition: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    
    justifyContent: "center"
  }}
>
  <div 
    style={{
      backgroundColor: "tomato",
      marginLeft:"300px",
      marginTop:"-100px",
      display:"flex",
      borderRadius: "20px",
      margin: "80px",
      padding: "100px",
      gap:"50px",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1 style={{ color: "#fff", backgroundColor: "grey", padding: "10px", borderRadius: "10px" }}>Raw Material Requests</h1>
    </div>
    <div>
      <div 
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          padding: "20px",
          borderRadius: "10px",
          overflowX: "auto" ,
        }}
      >
       
                <th style={{ padding: "10px" }}>Item</th>
                <th style={{ padding: "10px" }}>Quantity</th>
                <th style={{ padding: "10px" }}>Deadline</th>
                <th style={{ padding: "10px" }}>Price (Rs.)</th>
                <th style={{ padding: "10px" }}>Actions</th>
        
        <table >
          <thead>
          <tbody>
            <RowGen />
          </tbody>
            
          </thead>
          
        </table>

        


      </div>
    </div>
  </div>
</div>

  

  );
};

export default SupplierProfile;
