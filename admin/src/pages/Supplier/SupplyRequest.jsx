import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const port = 4000;

function SupplyRequest() {
  const [data, setData] = useState([]);
  const [serQuery, setQuery] = useState("");
  const [deletionFlag, setDeletionFlag] = useState(false); // New state variable for deletion flag

  useEffect(() => {
    fetchData(); // Fetch items when component mounts or deletion occurs
  }, [deletionFlag]); // Trigger useEffect on deletionFlag change

  const fetchData = () => {
    const url = `http://localhost:${port}/api/supplier/request/getall`;
    axios.get(url).then((response) => setData(response.data));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supply request?")) {
      axios
        .delete(`http://localhost:${port}/api/supplier/request/delete/` + id)
        .then((res) => {
          console.log(res);
          //setDeletionFlag(!deletionFlag); // Toggle the deletion flag to trigger re-render and refetch
          //fetchData()
          setDeletionFlag(!deletionFlag);
        })
        .catch((errr) => console.log(errr));
    }
  };

  function searchfun(e) {
    setQuery(e.target.value);
  }

  const Rowgen = () => {
    return data.filter(
      (e) =>
        e.rid.toLowerCase().includes(serQuery) ||
        e.name.includes(serQuery)
    ).map((Request) => (
      <tr key={Request._id}>
        <td style={{ margin: "15px" }}>{Request.name}</td>
        <td style={{ padding: "5px" }}>{Request.rid}</td>
        <td style={{ padding: "5px" }}>{Request.quantity}</td>
        <td style={{ padding: "5px" }}>{Request.price}</td>
        <td style={{ padding: "15px" }}>{Request.deadLine}</td>
        <td>
          <Link to={`update/${Request._id}`} className="btn btn-success">
            Update
          </Link>
          <button
            style={{ margin: "10px" }}
            className="btn btn-danger"
            onClick={() => {
              handleDelete(Request._id);
            }}

          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div
      style={{
        backgroundImage: `url('../res/spice9.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "left",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#007bff", /* Fallback color */
        backgroundBlendMode: "screen",
      }}
    >
      <input
        onChange={searchfun}
        placeholder="Search raw material by Name or ID"
        style={{
          padding: "10px",
          borderRadius: "50px",
          border: "10px solid #ccc",
          width: "400px",
          fontSize: "16px",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "10px",
        }}
      />
      <div 
        style={{
          width: "70%",
          height: "60vh",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <a 
          href="/create" 
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            marginBottom: "16px",
          }}
        >
          ADD REQUEST +
        </a>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ padding: "5px", textAlign: "center" }}>Raw Material Name</th>
              <th style={{ padding: "5px" }}>Request Id</th>
              <th style={{ padding: "5px" }}>Quantity</th>
              <th style={{ padding: "5px" }}>Price</th>
              <th style={{ padding: "15px" }}>DeadLine</th>
              <th style={{ padding: "15px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <Rowgen />
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default SupplyRequest;
