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
    if (window.confirm("Are you sure you want to delete this rating ?")) {
      axios
        .delete(`http://localhost:${port}/api/supplier/rating/delete/` + id)
        .then((resp) => {
          console.log(resp);
          fetchData();
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
            <button
              style={{
                backgroundColor: "#dc3545", // Red color
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "10px",
                marginLeft: "10px"
              }}
              onClick={() => {
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
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa", // Light gray background
      }}
    >
      <div>
        <div
          style={{
            opacity: "0.75",
            padding: "10px",
            backgroundColor: "#fff",
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
            marginLeft: "1200px",
            padding: "20px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={downloadPDF}
        >
          Generate Report
        </button>
        <div
          style={{
            backgroundColor: "#f8f9fa", // Light gray background
            display: "flex",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <button
              style={{
                padding: "20px 30px",
                backgroundColor: "#007bff", // Blue color
                marginLeft: "-250px",
                marginBottom: "830px",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => navigate('/Supplier/addrating')}
            >
              Add Rating
            </button>
            <div>
              <table
                style={{
                  width: "450%",
                  textAlign: "center",
                  marginLeft: "-250px",
                  marginTop: "-800px",
                  borderCollapse: "separate", // Added border collapse
                  border: "10px solid #000", // Added border style
                }}
              >
                <thead style={{
                  backgroundColor: "#343a40",
                  color: "#fff", border: "10px"
                }}>
                  <tr>
                    <th style={{ padding: "25px", border: "1px solid #fff" }}>Supplier Name</th>
                    <th style={{ padding: "15px", border: "1px solid #fff" }}>FeedBack</th>
                    <th style={{ padding: "15px", border: "1px solid #fff" }}>Rating</th>
                    <th style={{ padding: "15px", border: "1px solid #fff" }}>Actions</th>
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
