import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const port = 3000;

const Ratings = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [serQuery, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    var url = `http://localhost:${port}/rating/getall/`;
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
        .delete(`http://localhost:${port}/rating/delete/` + id)
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
      }}
      className="d-flex bg-primary justify-content-center align-items-center"
    >
      <div>
        <div className="bg-opacity-75  px- alert-danger bg-white rounded-bottom-3   d-flex vh-30 bg-primary justify-content-center align-items-center">
          <h1>Give ratings about product Quality</h1>
        </div>
        <br></br>
        <br></br>
        <button type="button2" className="btn btn-success" style={{ marginLeft: "1000px" }} onClick={downloadPDF}>
          Generate Report
        </button>
        <div className="opacity-0  d-flex bg-primary justify-content-center align-items-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="bg-white bg-opacity-75  d-flex h-50 bg-primary justify-content-center align-items-center">
          <div className="d-flex">
            <button className="btn btn-success" onClick={()=> navigate('/Supplier/addrating')}>
              Add Rating
            </button>
            <div>
              <table className="border-white border-5">
                <thead className="bg-white text-black border-2">
                  <tr className="px-4">
                    <th className="px-5">Supplier Name</th>
                    <th className="px-5">FeedBack</th>
                    <th className="px-5">Rating</th>
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
