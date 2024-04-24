import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const port = 4000;

const Ratings = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [serQuery, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    var url = `http://localhost:${port}/api/supplier/rating/getall/`;
    axios.get(url).then((response) => setData(response.data));
  }

  function downloadPDF() {
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth();
    var curr_year = today.getFullYear();

    today = [curr_month + 1] + "/ " + curr_date + "/ " + curr_year;
    var newdat = today;

    const doc = new jsPDF('landscape');
    
    doc.text(newdat, 255, 5);
   
    doc.autoTable({
        head: [['item', 'feedback', 'rating']],
        body: Data.filter(e =>
          e.item.toLowerCase().includes(serQuery) ||
          e.item.includes(serQuery) ||
          e.feedback.toLowerCase().includes(serQuery) ||
          e.feedback.includes(serQuery) ||
          e.rating.toLowerCase().includes(serQuery) ||
          e.rating.includes(serQuery)
        ).map(function (e, i) {
            return (
              [e.item, e.feedback, e.rating]
            );
        })
    })
    doc.save("Suppliers.pdf");
  }

  function DeleteRating(id) {
    if (window.confirm("Are you sure you want to delete this rating?")) {
      axios
        .delete(`http://localhost:${port}/api/supplier/rating/delete/` + id)
        .then((resp) => {
          console.log(resp);
          fetchData(); // Fetch data after deletion is confirmed
        })
        .catch((errr) => console.log(errr));
    }
  };

  const RowGen = () => {
    if (!Data) {
      console.log("Err");
    } else {
      return Data.map((Rating, index) => (
        <tr className="py-4" key={index}>
          <td>{Rating.item}</td>
          <td>{Rating.feedback}</td>
          <td>{Rating.rating}</td>
          <td>
            <button onClick={() => {
              DeleteRating(Rating._id);
            }}
              className="btn btn-danger" >Delete</button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div 
  style={{
    backgroundImage: `url('../res/spices2.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#007bff", /* Fallback color */
  }}
>
  <div>
    <div 
      style={{
        opacity: "0.75",
        padding: "10px",
        backgroundColor: "#fff",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Give ratings about product Quality</h1>
    </div>
    <br />
    <br />
    <button 
      type="button" 
      style={{
        marginLeft: "1000px",
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }} 
      onClick={downloadPDF}
    >
      Generate Report
    </button>
    <div 
      style={{
        opacity: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Placeholder for content */}
    </div>
    <div 
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        display: "flex",
        height: "50vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <button 
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }} 
          onClick={() => navigate('/Supplier/addrating')}
        >
          Add Rating
        </button>
        <div>
          <table 
            style={{ borderCollapse: "collapse", border: "5px solid #fff" }}
          >
            <thead style={{ backgroundColor: "#fff", color: "#000", border: "2px solid #fff" }}>
              <tr>
                <th style={{ padding: "10px" }}>Supplier Name</th>
                <th style={{ padding: "10px" }}>FeedBack</th>
                <th style={{ padding: "10px" }}>Rating</th>
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

export default Ratings;
