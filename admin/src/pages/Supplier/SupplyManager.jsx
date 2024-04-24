import { useNavigate } from "react-router-dom";

const SupplyManager = () => {
  let navigate = useNavigate();

  return (
    <>
    <div style={{ marginLeft: "50px" }}>
      <div

        className="d-flex vh-100 bg-white justify-content-center align-items-center "
      >
        <div className="bg-white bg-opacity-75  rounded p-4 ">
          <div className="text-center ">
            <h1>Supply Manager DashBoard</h1>
          </div>
          <div className="d-flex">
            <div>
              <div className=" text-center p-5 bg-gradient flex-md-column ">
                <div>
                  <label id="Name" className="px-2">
                    Name{" "}
                  </label>
                  <br />
                  <input type="text" className="px-5" disabled></input>
                  <br />
                  <br />
                  <label id="Name" className="px-2">
                    Mobile{" "}
                  </label>
                  <br />
                  <input type="text" className="px-5" disabled></input>
                  <br />
                  <br />
                  <label id="Name" className="px-2">
                    Email{" "}
                  </label>
                  <br />
                  <input type="text" className="px-5" disabled></input>
                  <br />
                  <br />
                  <label id="Name" className="px-2">
                    Reg. No.{" "}
                  </label>
                  <br />
                  <input type="text" className="px-5" disabled></input>
                  <br />
                  <br />
                </div>
                <button className="btn btn btn-success   bg-opacity-100 rounded-4 px-5">
                  Edit Details
                </button>
              </div>
            </div>
            <div className="bg-black bg-opacity-25  ">
              <div className=" text-center p-5 bg-gradient flex-md-column ">
                <button
                  onClick={() => navigate("/create")}
                  className="btn btn btn-primary bg-opacity-100 rounded-4 px-5"
                >
                  Add Supply Requests
                </button>
                
                
                <br />
                <br />
                <button
                  onClick={() => navigate("/SupplyRequest")}
                  className="btn btn btn-primary bg-opacity-100 rounded-4 px-5"
                >
                  Manage Supply Requests
                </button>
                <br />
                <br />
                <button
                  onClick={() => navigate("/Supplier/ratings")}
                  className="btn btn btn-primary bg-opacity-100 rounded-4 px-5"
                >
                  Give rating about supply quality & generate reports
                </button>
                <br />
                <br />
                <button
                  onClick={() => navigate("/Calculation")}
                  className="btn btn btn-primary bg-opacity-100 rounded-4 px-5"
                >
                  Calculate Requested Quantity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default SupplyManager;
