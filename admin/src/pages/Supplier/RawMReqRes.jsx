import { useEffect, useState } from "react";
import axios from "axios";
const port = 3000;

const RawMReqRes = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = `http://localhost:${port}/arequest/getall/`;
    axios.get(url).then((response) => setData(response.data));
  };

  const deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios
        .delete(`http://localhost:${port}/arequest/delete/` + id)
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
      }}
      className="d-flex vh-100 bg-primary justify-content-center align-items-center "
    >
      <div className="bg-white bg-opacity-10 rounded p-4 ">
        <div className="text-center ">
          <h1 className="text-black bg-white bg-opacity-25 ">
            Raw Material Request Response
          </h1>
          <br />
        </div>
        <div className="d-flex rounded-2">
          <div className="bg-black bg-opacity-25  ">
            <div>
              <table className="border-white">
                <thead className="bg-white bg-opacity-25  text-black">
                  <tr className="p-3 ">
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Dead Line</th>
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
  );
};

export default RawMReqRes;
