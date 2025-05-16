import { useState } from "react";
import UploadButton from "./uploadbutton";

const QueryBox = () => {
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");

  const runQuery = async () => {
    if (!query || !fileKey) {
      alert("Please upload a CSV and enter a query.");
      return;
    }

    const res = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, fileKey }),
    });

    const data = await res.json();
    setResults(JSON.stringify(data.results, null, 2));
  };

  return (
    <div className="section">
      <h2>Upload CSV & Run Query</h2>
      <UploadButton onUploadSuccess={(key) => setFileKey(key)} />
      <textarea
        className="textarea"
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="button" onClick={runQuery}>
        Run Query
      </button>
      {results && <pre className="results-box">{results}</pre>}
    </div>
  );
};

export default QueryBox;
