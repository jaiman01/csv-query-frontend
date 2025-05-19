import { useState } from "react";

interface UploadButtonProps {
  onUploadSuccess: (fileKey: string) => void;
}

const UploadButton = ({ onUploadSuccess }: UploadButtonProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${API_BASE_URL}/upload/csv`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(`Uploaded to: ${data.url}`);
    onUploadSuccess(data.key);
  };

  return (
    <div className="upload">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button className="button" onClick={handleUpload}>
        Upload CSV
      </button>
    </div>
  );
};

export default UploadButton;
