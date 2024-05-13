import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <ul className='home-ul'>
        <li className='home-ll'>
          <Link to="/factoryManagement" className="active home-a">
            <h1>Factory</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/addMachine" className="active home-a">
            <h1>ADD Mechanic</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/machineDetails" className="active home-a">
            <h1>Mechanic Details</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/mAdd" className="active home-a">
            <h1>Add Machine</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/mDetails" className="active home-a">
            <h1>Machine Details</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/uAdd" className="active home-a">
            <h1>Add Utility</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/uDetails" className="active home-a">
            <h1>Utility Details</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}
