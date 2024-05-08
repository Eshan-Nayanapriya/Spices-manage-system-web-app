import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Machanic(props) {
  const { _id, name, age, phone, address } = props.machanic;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:4000/machanics/${_id}`)
      .then(res => res.data)
      .then(() => history('/'))
      .then(() => history('/machineDetails'));
  };

  return (
    <center>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <tbody>
          <tr style={{ backgroundColor: 'white' }}>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>Name:</td>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>{name}</td>
          </tr>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>Age:</td>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>{age}</td>
          </tr>
          <tr style={{ backgroundColor: 'white' }}>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>Phone:</td>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>{0}{phone}</td>
          </tr>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>Address:</td>
            <td style={{ padding: '8px', border: '10px solid #ddd' }}>{address}</td>
          </tr>
          <tr>
            <td colSpan="2" style={{ padding: '8px', border: '1px solid #ddd' }}>
              <Link to={`/machineDetails/${_id}`}>
                <button style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', marginRight: '5px', border: 'none' }}>Update</button>
              </Link>
              <button onClick={deleteHandler} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none' }}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  );
}
