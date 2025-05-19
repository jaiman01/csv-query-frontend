import { useState } from "react";

interface UploadButtonProps {
  onUploadSuccess: (fileKey: string) => void;
}

const UploadButton = ({ onUploadSuccess }: UploadButtonProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

      const res = await fetch(`${API_BASE_URL}/upload/csv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }

      const data = await res.json();
      alert(`Uploaded to: ${data.url}`);
      onUploadSuccess(data.key);
    } catch (error: any) {
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={uploading}
      />
      <button
        className="button"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload CSV"}
      </button>
    </div>
  );
};

export default UploadButton;
