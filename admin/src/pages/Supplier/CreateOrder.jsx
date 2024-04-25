import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const port = 4000;

function CreateOrder() {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [idError, setIDError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateID()) {
      axios
        .post(`http://localhost:${port}/api/supplier/request/create`, {
          name: name,
          rid: id,
          quantity: quantity,
          price: price,
          deadLine: deadLine,
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
    if (!id.match(regex)) {
      setIDError("Request ID must contain only digits");
      return false;
    }
    setIDError("");
    return true;
  };

  return (
    <div 
  style={{
    marginLeft:"400px",
    marginTop:"50px",
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ffffff", /* Fallback color */
    backgroundImage: `url('../res/spice9.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "left",
  }}
>
  <div 
    style={{
      width: "50%",
      backgroundColor: "tomato",
      opacity: "0.9", /* Background opacity */
      borderRadius: "10px",
      padding: "16px",
    }}
  >
    <form onSubmit={handleSubmit}>
      <h2>Add Supply Request</h2>
      <div style={{ margin: "0 auto", maxWidth: "500px" }}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Raw Material Name"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
              marginBottom: "10px",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="id">Request ID:</label>
          <input
            type="text"
            id="id"
            placeholder="Enter Request id"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
              marginBottom: "10px",
            }}
            value={id}
            onChange={(e) => {
              setID(e.target.value);
              setIDError("");
            }}
          />
          <span style={{ color: "red" }}>{idError}</span>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            placeholder="Enter Quantity"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
              marginBottom: "10px",
            }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            placeholder="Enter Price Per KG"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
              marginBottom: "10px",
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="text"
            id="deadline"
            placeholder="Enter date"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
              marginBottom: "10px",
            }}
            value={deadLine}
            onChange={(e) => setDeadLine(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default CreateOrder;
