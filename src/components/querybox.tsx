import { useState } from "react";
import UploadButton from "./uploadbutton";

const QueryBox = () => {
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const runQuery = async () => {
    if (!query || !fileKey) {
      alert("Please upload a CSV and enter a query.");
      return;
    }
    setLoading(true);

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

      const res = await fetch(`${API_BASE_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, fileKey }),
      });

      if (!res.ok) {
        throw new Error(`Query failed: ${res.statusText}`);
      }

      const data = await res.json();
      setResults(JSON.stringify(data.results, null, 2));
    } catch (error: any) {
      alert(`Error running query: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
      />
      <button className="button" onClick={runQuery} disabled={loading}>
        {loading ? "Running..." : "Run Query"}
      </button>
      {results && <pre className="results-box">{results}</pre>}
    </div>
  );
};

export default QueryBox;
