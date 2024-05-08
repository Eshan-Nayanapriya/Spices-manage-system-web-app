import React, { useEffect, useRef, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import AddMachine from '../Machine/AddMachine';
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:4000/machins";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Machines() {
  const [machins, setMachins] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setMachins(data.machins));
  }, []);

  // PDF download
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: 'Machine Report',
    onAfterPrint: () => alert('Machine Report Successfully Downloaded!!'),
  });

  // Search function
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      if (!searchQuery) {
        setMachins(data.machins);
        setNoResults(false);
        return;
      }

      const filteredMachins = data.machins.filter((machin) =>
        Object.values(machin).some((field) => {
          if (field !== null && field !== undefined) {
            return field.toString().toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        })
      );
      setMachins(filteredMachins);
      setNoResults(filteredMachins.length === 0);
    });
  };

  return (
    <div>
      <Nav />
      <center>
        <h1>Machine Details Display page</h1>
        <input
          type="text"
          name="search"
          placeholder="Search Machine Details"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </center>

      {noResults ? (
        <div>
          <p>No machines Found</p>
        </div>
      ) : (
        <div ref={componentsRef}>
          {machins && machins.map((machin, i) => (
            <AddMachine key={i} machin={machin} />
          ))}
        </div>
      )}
      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Machines;
