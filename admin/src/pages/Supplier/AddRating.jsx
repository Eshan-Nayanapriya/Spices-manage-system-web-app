import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const port = 3000;

function AddRating() {
  const [Cname, setCName] = useState();
  const [feedback, setFeedback] = useState();
  const [rating, setRating] = useState();

  let navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:${port}/rating/create`, {
        item: Cname,
        feedback: feedback,
        rating: rating
      })
      .then((result) => {
        console.log(result);
        navigate("/Supplier/ratings");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="d-flex vh-100 bg-primary justify-content-center align-items-center"
      style={{
        backgroundImage: `url('../res/spice10.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-50 bg-white bg-opacity rounded p-4">
      <form onSubmit={Submit}>
                <h2> Add Rating</h2>
                <div className="container">
                    <div className="row">
                    <div className="col">

                          <div >
                              <label htmlFor="">Customer Name:</label>
                          </div>
                          <div >
                              <label htmlFor="">FeedBack :</label>
                          </div>
                          <div >
                              <label htmlFor="">Rating :</label>
                          </div>

                        </div>
                        <div className="col"> 
                            <div className="row">
                                <input type="text"  placeholder="Enter Customer Name" className="from-control"
                                onChange={(e) => setCName(e.target.value)}/>
                            </div>
                            <div className="row">
                                <input type="text"  placeholder="Enter FeedBack" className="from-control"
                                onChange={(e) => {
                                  setFeedback(e.target.value)
                              }}/>
                            </div>
                            <div className="row">
                                <input type="text"  placeholder="Enter Between 1-10" className="from-control"
                                onChange={(e) => setRating(e.target.value)}/>
                            </div>
                          </div>  
                    </div>
                </div>
                <button className="btn btn-success">Submit</button>

             </form>
      </div>
    </div>
  );
}

export default AddRating;
