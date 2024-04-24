import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const port = 3000;

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
        .post(`http://localhost:${port}/request/create`, {
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
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white bg-opacity rounded p-4">
        <form onSubmit={handleSubmit}>
          <h2>Add Supply Request</h2>
          <div className="container">
            <div className="row">
              <div className="col">
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Raw Material Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="id">Request ID:</label>
                  <input
                    type="text"
                    id="id"
                    placeholder="Enter Request id"
                    value={id}
                    onChange={(e) => {
                      setID(e.target.value);
                      setIDError("");
                    }}
                  />
                  <span className="text-danger">{idError}</span>
                </div>
                <br />
                <div>
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="text"
                    id="quantity"
                    placeholder="Enter Quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    id="price"
                    placeholder="Enter Price Per KG"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="deadline">Deadline:</label>
                  <input
                    type="text"
                    id="deadline"
                    placeholder="Enter date"
                    className="form-control"
                    value={deadLine}
                    onChange={(e) => setDeadLine(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrder;
