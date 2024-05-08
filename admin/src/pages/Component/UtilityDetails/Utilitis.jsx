import React, { useEffect, useRef, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Utility from '../Utility/Utility';
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:4000/utilitis";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Utilitis() {
  const [utilitis, setUtility] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setUtility(data.utilitis));
  }, []);

  // PDF download
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: 'Utility Report',
    onAfterPrint: () => alert('Utility Report Successfully Downloaded!!'),
  });

  return (
    <div>
      <Nav />
      <center><h1>Utility Details page</h1></center>
      <div ref={componentsRef}>
        {utilitis && utilitis.map((utility, i) => (
          <Utility key={i} utility={utility} />
        ))}
      </div>
      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Utilitis;
