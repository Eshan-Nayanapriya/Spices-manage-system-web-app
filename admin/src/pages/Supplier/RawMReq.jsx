import { useEffect, useState } from "react";
import axios from "axios";
const port = 3000;

const SupplierProfile = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = `http://localhost:${port}/request/getall/`;

    axios.get(url).then((response) => setData(response.data));
  };

  const Accept = (index) => {
    const setUrl = `http://localhost:${port}/arequest/create`;
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
      .delete(`http://localhost:${port}/request/delete/` + id)
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
        }}
        className="d-flex vh-100 bg-primary justify-content-center align-items-center "
      >
        <div className="bg-black bg-opacity-50 rounded p-5 ">
          <div className="text-center p-5">
            <h1 className="text-black p-2 bg-white bg-opacity-75 rounded-3">
              Raw Material Requests
            </h1>
            <br />
          </div>
          <div className="d-flex rounded-2">
            <div>
              <div className="rounded-2 bg-black bg-opacity-50  text-white text-center p-5 bg-gradient flex-md-column ">
                <div>
                  <table className="border-white border-5">
                    <thead className="bg-white text-black border-2">
                      <tr className="p-2">
                        <th>Item</th><th></th>
                        <th>Quantity</th><th></th>
                        <th>Deadline</th><th></th>
                        <th>Price (Rs.)</th><th></th>
                        <th>Actions</th><th></th>
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
      </div>
    </>
  );
};

export default SupplierProfile;
