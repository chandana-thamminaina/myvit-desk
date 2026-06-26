import { useState } from "react";

export default function Marks() {
  const [subject, setSubject] = useState("");
  const [cat1, setCat1] = useState("");
  const [cat2, setCat2] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [da, setDa] = useState("");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState(null);

  const calculateMarks = () => {
    const cat1W = (Number(cat1) / 50) * 15;
    const cat2W = (Number(cat2) / 50) * 15;

    const internal = cat1W + cat2W + Number(q1) + Number(q2) + Number(da);

    const weightedNeed = Number(target) - internal;

    let fatNeed;
    let message = "";

    if (weightedNeed <= 0) {
      fatNeed = 0;
      message = "You are already above your target 🎉";
    } else if (weightedNeed > 40) {
      fatNeed = "Not Possible";
      message =
        "❌ Not possible: even a full FAT score cannot reach this target.";
    } else {
      fatNeed = Math.ceil((weightedNeed / 40) * 100);
    }

    setResult({
      internal: internal.toFixed(1),
      fatNeed,
      message,
    });
  };

  return (
    <div>
      <h1 className="page-title">Marks Safety Calculator</h1>
      <p className="page-subtitle">
        Convert raw marks into weightage and predict FAT targets
      </p>

      <div className="focus-card">
        <input
          className="focus-input"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          className="focus-input"
          type="number"
          placeholder="CAT 1 / 50"
          value={cat1}
          onChange={(e) => setCat1(e.target.value)}
        />

        <input
          className="focus-input"
          type="number"
          placeholder="CAT 2 / 50"
          value={cat2}
          onChange={(e) => setCat2(e.target.value)}
        />

        <input
          className="focus-input"
          type="number"
          placeholder="Q1 / 10"
          value={q1}
          onChange={(e) => setQ1(e.target.value)}
        />

        <input
          className="focus-input"
          type="number"
          placeholder="Q2 / 10"
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
        />

        <input
          className="focus-input"
          type="number"
          placeholder="DA / 10"
          value={da}
          onChange={(e) => setDa(e.target.value)}
        />

        <input
          className="focus-input"
          type="number"
          placeholder="Desired target / 100"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <button className="primary-btn" onClick={calculateMarks}>
          Calculate
        </button>

        {result && (
          <div className="result-card">
            <h2>{subject}</h2>
            <p>Internal marks: {result.internal}/60</p>
            <p>Marks in FAT needed: {result.fatNeed}/100</p>

            {result.message && <p>{result.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
