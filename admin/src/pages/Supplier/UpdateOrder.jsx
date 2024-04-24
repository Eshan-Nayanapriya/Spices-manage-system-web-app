import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const port = 4000;

function UpdateOrder() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rid, setID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [idError, setIDError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:${port}/api/supplier/request/getone/` + id)
      .then((result) => {
        console.log(result.data.name);
        setName(result.data.name);
        setID(result.data.rid);
        setQuantity(result.data.quantity);
        setPrice(result.data.price);
        setDeadLine(result.data.deadLine);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    if (validateID()) {
      axios
        .put(`http://localhost:${port}/api/supplier/request/update/` + id, {
          name,
          rid,
          quantity,
          price,
          deadLine,
        })
        .then((result) => {
          console.log(result);
          navigate("/SupplyRequest");
        })
        .catch((err) => console.log(err));
    }
  };

  const validateID = () => {
    const regex = /^[0-9]+$/;
    if (!rid.match(regex)) {
      setIDError("Request ID must contain only digits");
      return false;
    }
    setIDError("");
    return true;
  };

  return (
    <div 
  style={{
    backgroundImage: `url('../res/spice10.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#000",
  }}
>
  <div className="w-50 bg-white rounded p-3" style={{ padding: "20px" }}>
    <form onSubmit={Update}>
      <h2>Update Request</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="">Name :</label>
            <br />
            <input
              type="text"
              value={name}
              placeholder="Enter Raw Material Name"
              className="from-control"
              style={{ width: "100%", padding: "8px" }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="">Request ID :</label>
            <br />
            <input
              value={rid}
              type="text"
              placeholder="Enter Request id"
              className="from-control"
              style={{ width: "100%", padding: "8px" }}
              onChange={(e) => {
                setID(e.target.value);
                setIDError("");
              }}
            />
            <span className="text-danger">{idError}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="">Quantity :</label>
            <br />
            <input
              value={quantity}
              type="text"
              placeholder="Enter Quantity"
              className="from-control"
              style={{ width: "100%", padding: "8px" }}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="">Price :</label>
            <br />
            <input
              value={price}
              type="text"
              placeholder="Enter Price Per KG"
              className="from-control"
              style={{ width: "100%", padding: "8px" }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="">DeadLine :</label>
            <br />
            <input
              value={deadLine}
              type="text"
              placeholder="Enter date"
              className="from-control"
              style={{ width: "100%", padding: "8px" }}
              onChange={(e) => setDeadLine(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", display: "block", marginTop: "20px" }}>Update</button>
    </form>
  </div>
</div>

  );
}

export default UpdateOrder;
