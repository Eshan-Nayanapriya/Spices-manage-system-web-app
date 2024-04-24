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
        <>
        <div         style={{
          backgroundImage: `url('../res/spice10.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="d-flex vh-100 bg-black justify-content-center align-items-center ">
            <div className="bg-black text-white rounded p-5">
            <label id="Name" className="px-2">
                    Full Capacity in Stores (in KG)
            </label>         
            <input type="text" onChange={(e) => setFullCap(e.target.value)} className="px-5" enable></input>
            <br />
            <br />
            <label id="Name" className="px-2">
                    Available Capacity in Stores (in KG)
            </label>
            <input type="text" onChange={(e) => setAvailCap(e.target.value)} className="px-5" enable></input>
            <br />
            <br />
            <button onClick={() => {
                CalRequest()
                }} class="m-2 btn btn-success">
                Calculate
            </button>
            <br />
            <label>Needed Quantity : {needed} KG </label>
        </div>
        </div>
        </>
    )
}

export default Calculation