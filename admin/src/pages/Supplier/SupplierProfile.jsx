import { useNavigate } from "react-router-dom";

const SupplierProfile = () => {
  let navigate = useNavigate();
  var SName = ""
  var SMobile = ""
  var SEmail = ""
  var SReg = ""

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
        <div className="bg-black bg-opacity-75 rounded p-5 ">
          <div className="text-center ">
            <h1 className="text-white">Supplier Profile</h1>
            <br />
          </div>
          <div className="d-flex rounded-2">
            <div>
              <div className="rounded-5  text-white text-center p-5 bg-gradient flex-md-column ">
                <div>
                  <label id="Name" className="px-2">
                    Name
                  </label>
                  <br />
                  <input type="text" className="px-5" value={SName} ></input>
                  <br />
                  <br />
                  <label id="Name" className="px-2">
                    Mobile
                  </label>
                  <br />
                  <input type="text" className="px-5" value={SMobile} ></input>
                  <br />
                  <br />
                  <label id="Name" className="px-2">
                    Email
                  </label>
                  <br />
                  <input type="text" className="px-5" value={SEmail} ></input>
                  <br />
                  <br />
                  <label id="Name" className="px-2">
                    Reg. No.{" "}
                  </label>
                  <br />
                  <input type="text" className="px-5"value={SReg} ></input>
                  <br />
                  <br />
                </div>
                <button className="btn btn btn-success   bg-opacity-100 rounded-4 px-5">
                  Edit Details
                </button>
              </div>
            </div>
            <div className="bg-black bg-opacity-25  ">
              <div className=" text-center p-5 bg-gradient flex-md-column rounded-5 ">
                <button
                  onClick={() => navigate("/Supplier/RawMreq")}
                  className="btn btn btn-primary bg-opacity-100 rounded-4 px-5"
                >
                  Supply Requests
                </button>
                <br />
                <br />
                <button
                  onClick={() => navigate("/Supplier/RawMreqres")}
                  className="btn btn btn-primary bg-opacity-100 rounded-4 px-5"
                >
                  Manage Supply Requests
                </button>
                <br />
                <br />
                <button className="btn btn btn-primary bg-opacity-100 rounded-4 px-5" onClick={()=>navigate('/')}>
                  Requests Payments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierProfile;
