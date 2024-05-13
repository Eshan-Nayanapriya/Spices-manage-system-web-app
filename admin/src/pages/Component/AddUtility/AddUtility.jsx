import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router v6
import axios from 'axios';
import '../AddUtility/addUCss.css'; // Assuming the CSS file is in the correct location

function AddUtility() {
  const history = useNavigate();
  const [inputs, setUtilityInput] = useState({
    uDate: '',
    uWater: '',
    uElectricity: '',
    uMachanic_01_Name: '',
    uMachanic_01_Amount: '',
    uMachanic_01_bankD: '',
    uMachanic_01_accNo: '',
    uMachanic_02_Name: '',
    uMachanic_02_Amount: '',
    uMachanic_02_bankD: '',
    uMachanic_02_accNo: '',
    uMachanic_03_Name: '',
    uMachanic_03_Amount: '',
    uMachanic_03_bankD: '',
    uMachanic_03_accNo: ''
  });

  const handleChange = (e) => {
    setUtilityInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/uDetails'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:4000/utilitis", {
      uDate: String(inputs.uDate),
      uWater: String(inputs.uWater),
      uElectricity: String(inputs.uElectricity),
      uMachanic_01_Name: String(inputs.uMachanic_01_Name),
      uMachanic_01_Amount: String(inputs.uMachanic_01_Amount),
      uMachanic_01_bankD: String(inputs.uMachanic_01_bankD),
      uMachanic_01_accNo: String(inputs.uMachanic_01_accNo),
      uMachanic_02_Name: String(inputs.uMachanic_02_Name),
      uMachanic_02_Amount: String(inputs.uMachanic_02_Amount),
      uMachanic_02_bankD: String(inputs.uMachanic_02_bankD),
      uMachanic_02_accNo: String(inputs.uMachanic_02_accNo),
      uMachanic_03_Name: String(inputs.uMachanic_03_Name),
      uMachanic_03_Amount: String(inputs.uMachanic_03_Amount),
      uMachanic_03_bankD: String(inputs.uMachanic_03_bankD),
      uMachanic_03_accNo: String(inputs.uMachanic_03_accNo)
    }).then(res => res.data);
  };

  return (
    <div className='bg'>
      <Nav />
      <div>
        <center>
          <h1>ADD UTILITY</h1>
          <br></br>
          <div>

          <form onSubmit={handleSubmit} style={{ border: '5px solid #ccc',backgroundColor:'#F5F3EC', padding: '40px', borderRadius: '10px', width: '500px' ,height:'400px'}}>
  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <tbody>
      <tr style={{ borderBottom: '1px solid #ccc' }}>
        <td style={{ padding: '10px', textAlign: 'left' }}>DATE:</td>
        <td style={{ padding: '10px' }}>
          <input type="date" onChange={handleChange} name="uDate" value={inputs.uDate} />
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ccc' }}>
        <td style={{ padding: '10px', textAlign: 'left' }}>Water Bill:</td>
        <td style={{ padding: '10px' }}>
          <input type="text" onChange={handleChange} name="uWater" value={inputs.uWater} />
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ccc' }}>
        <td style={{ padding: '10px', textAlign: 'left' }}>Electricity Bill:</td>
        <td style={{ padding: '10px' }}>
          <input type="text" onChange={handleChange} name="uElectricity" value={inputs.uElectricity} />
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ccc' }}>
        <td style={{ padding: '10px', textAlign: 'left' }}>Mechanic Name:</td>
        <td style={{ padding: '10px' }}>
          <input type="text" onChange={handleChange} name="uMachanic_01_Name" value={inputs.uMachanic_01_Name} />
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ccc' }}>
        <td style={{ padding: '10px', textAlign: 'left' }}>Amount:</td>
        <td style={{ padding: '10px' }}>
          <input type="text" onChange={handleChange} name="uMachanic_01_Amount" value={inputs.uMachanic_01_Amount} />
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ccc' }}>
        <td style={{ padding: '10px', textAlign: 'left' }}>Bank & Branch:</td>
        <td style={{ padding: '10px' }}>
          <input type="text" onChange={handleChange} name="uMachanic_01_bankD" value={inputs.uMachanic_01_bankD} />
        </td>
      </tr>
      <tr>
        <td style={{ padding: '10px', textAlign: 'left' }}>Account No:</td>
        <td style={{ padding: '10px' }}>
          <input type="text" onChange={handleChange} name="uMachanic_01_accNo" value={inputs.uMachanic_01_accNo} />
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <button type="submit">Submit</button>
</form>

            
          </div>
        </center>
      </div>
    </div>
  );
}

export default AddUtility;
