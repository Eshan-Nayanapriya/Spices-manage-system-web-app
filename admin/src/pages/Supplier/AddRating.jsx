import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const port = 4000;

function AddRating() {
  const [Cname, setCName] = useState();
  const [feedback, setFeedback] = useState();
  const [rating, setRating] = useState();

  let navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:${port}/api/supplier/rating/create`, {
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
  className="d-flex vh-100 justify-content-center align-items-center"
  style={{
     
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "tomato",
    backgroundBlendMode: "screen",
  }}
>
  <div 
    className="w-50 bg-white rounded p-4"
    style={{
      opacity: "0.9",
      padding: "200px",
    }}
  >
    <form onSubmit={Submit}>
      <h2 style={{ textAlign: "center" }}>Add Rating</h2>
      <div style={{ margin: "40px auto", maxWidth: "400px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="customerName">Customer Name:</label>
          <input 
            type="text" 
            id="customerName" 
            placeholder="Enter Customer Name" 
            style={{
              padding: "15px",
              borderRadius: "15px",
              border: "12px solid #ccc",
              width: "100%",
            }}
            onChange={(e) => setCName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="feedback">Feedback:</label>
          <input 
            type="text" 
            id="feedback" 
            placeholder="Enter Feedback" 
            style={{
              padding: "20px",
              borderRadius: "15px",
              border: "12px solid #ccc",
              width: "100%",
            }}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="rating">Rating:</label>
          <input 
            type="text" 
            id="rating" 
            placeholder="Enter Between 1-10" 
            style={{
              padding: "15px",
              borderRadius: "15px",
              border: "15px solid #ccc",
              width: "100%",
            }}
            onChange={(e) => setRating(e.target.value)}
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

export default AddRating;
