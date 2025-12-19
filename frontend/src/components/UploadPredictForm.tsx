import { useState } from "react";
import axios from "axios";

type TableResponse = {
  columns: string[];
  data: Record<string, any>[];
};

export default function UploadPredictForm() {
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState<"table" | "download">("table");
  const [table, setTable] = useState<TableResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Silakan pilih file CSV atau XLSX");
      return;
    }

    setLoading(true);
    setError(null);
    setTable(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/predict/upload?output=${output}`,
        formData,
        {
          responseType: output === "download" ? "blob" : "json",
        }
      );

      // 📊 MODE TABLE
      if (output === "table") {
        setTable(response.data);
      }

      // ⬇️ MODE DOWNLOAD
      if (output === "download") {
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "prediction_result.csv";
        link.click();

        window.URL.revokeObjectURL(url);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Gagal memproses file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-12">
      <h2 className="text-xl font-bold mb-4">Batch Prediction (Upload File)</h2>

      {/* FILE INPUT */}
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {/* OUTPUT OPTION */}
      <div className="mb-4 flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={output === "table"}
            onChange={() => setOutput("table")}
          />
          Tampilkan Tabel
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={output === "download"}
            onChange={() => setOutput("download")}
          />
          Download CSV
        </label>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Memproses..." : "Upload & Predict"}
      </button>

      {/* ERROR */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* TABLE RESULT */}
      {table && (
        <div className="mt-6 overflow-x-auto">
          <table className="border w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {table.columns.map((col) => (
                  <th key={col} className="border px-2 py-1 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.map((row, i) => (
                <tr key={i}>
                  {table.columns.map((col) => (
                    <td key={col} className="border px-2 py-1">
                      {row[col] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
