import React, { useState } from 'react';

export default function App() {
  const [bp, setBp] = useState('');
  const [a1c, setA1c] = useState('');
  const [education, setEducation] = useState({});

  const handleCheckbox = (measure) => {
    setEducation({ ...education, [measure]: !education[measure] });
  };

  return (
    <div className="app">
      <h1>CareTrack STARs</h1>

      <section>
        <h2>Screenings / Prevention</h2>
        <label>
          <input type="checkbox" onChange={() => handleCheckbox('Breast Cancer Screening')} />
          Breast Cancer Screening
        </label>
        <label>
          <input type="checkbox" onChange={() => handleCheckbox('Colorectal Cancer Screening')} />
          Colorectal Cancer Screening
        </label>
      </section>

      <section>
        <h2>Chronic Condition Management</h2>
        <label>
          Blood Pressure (mmHg):
          <input type="text" value={bp} onChange={(e) => setBp(e.target.value)} />
        </label>
        <label>
          A1C (%):
          <input type="text" value={a1c} onChange={(e) => setA1c(e.target.value)} />
        </label>
      </section>

      <section>
        <h2>Education Provided</h2>
        <label>
          <input type="checkbox" onChange={() => handleCheckbox('Diabetes Education')} />
          Diabetes Education
        </label>
        <label>
          <input type="checkbox" onChange={() => handleCheckbox('Blood Pressure Education')} />
          Blood Pressure Education
        </label>
      </section>
    </div>
  );
}
