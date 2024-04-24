import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const port = 3000;

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
      .get(`http://localhost:${port}/request/getone/` + id)
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
        .put(`http://localhost:${port}/request/update/` + id, {
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
      }}
      className="d-flex vh-100 bg-black justify-content-center align-items-center"
    >
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update Request</h2>
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="row">
                  <label htmlFor="">Name :</label>
                  <br />
                </div>
                <div class="row">
                  <label htmlFor="">Request ID :</label>
                  <span className="text-danger">{idError}</span>
                  <br />
                </div>
                <div class="row">
                  <label htmlFor="">Quantity :</label>
                  <br />
                </div>
                <div class="row">
                  <label htmlFor="">Price :</label>
                  <br />
                </div>
                <div class="row">
                  <label htmlFor="">DeadLine :</label>
                </div>
              </div>

              <div className="w-50">
                <div>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Raw Material Name"
                    className="from-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    value={rid}
                    type="text"
                    placeholder="Enter Request id"
                    className="from-control"
                    onChange={(e) => {
                      setID(e.target.value);
                      setIDError("");
                    }}
                  />
                </div>
                <div>
                  <input
                    value={quantity}
                    type="text"
                    placeholder="Enter Quantity"
                    className="from-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    value={price}
                    type="text"
                    placeholder="Enter Price Per KG"
                    className="from-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    value={deadLine}
                    type="text"
                    placeholder="Enter date"
                    className="from-control"
                    onChange={(e) => setDeadLine(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder;
