import { useState } from "react"

function Calculation() {
    const [needed, setNeeded] = useState(0);

    const [fullCap, setFullCap ] = useState(0)
    const [availCap, setAvailCap] = useState(0)

    function CalRequest() {
        const Needed = fullCap - availCap;
        setNeeded(Needed)
    }

    
    return (
        <div
  style={{ 
    marginLeft: '400px',
    backgroundImage: `url('../res/spice10.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ffffff", /* Fallback color */
    color: "#fff",
  }}
>
  <div 
    style={{
      backgroundColor: "#000",
      borderRadius: "10px",
      padding: "20px",
    }}
  >
    <label style={{ padding: "0 10px" }}>
      Full Capacity in Stores (in KG)
    </label>         
    <input 
      type="text" 
      onChange={(e) => setFullCap(e.target.value)} 
      style={{
        padding: "8px",
        marginLeft: "10px",
        width: "200px",
        borderRadius: "5px",
        border: "1px solid #fff",
        color: "#fff",
        backgroundColor: "transparent",
      }}
    />
    <br />
    <br />
    <label style={{ padding: "0 10px" }}>
      Available Capacity in Stores (in KG)
    </label>
    <input 
      type="text" 
      onChange={(e) => setAvailCap(e.target.value)} 
      style={{
        padding: "8px",
        marginLeft: "10px",
        width: "200px",
        borderRadius: "5px",
        border: "1px solid #fff",
        color: "#fff",
        backgroundColor: "transparent",
      }}
    />
    <br />
    <br />
    <button 
      onClick={() => CalRequest()} 
      style={{
        padding: "10px 20px",
        marginTop: "10px",
        backgroundColor: "#28a745",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Calculate
    </button>
    <br />
    <label>Needed Quantity: {needed} KG</label>
  </div>
</div>

        
    )
}

export default Calculation