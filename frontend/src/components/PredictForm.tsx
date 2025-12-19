import { useState } from "react";
import axios from "axios";
import { PredictResponse } from "../types/types";

type FormData = {
  monthly_fobvalue: number | "";
  monthly_netWgt: number | "";
  value_per_kg: number | "";
  fobvalue_lag1: number | "";
  fobvalue_lag3: number | "";
  fobvalue_roll3: number | "";
  fobvalue_roll3_std: number | "";
  mom_growth: number | "";
};

const initialState: FormData = {
  monthly_fobvalue: "",
  monthly_netWgt: "",
  value_per_kg: "",
  fobvalue_lag1: "",
  fobvalue_lag3: "",
  fobvalue_roll3: "",
  fobvalue_roll3_std: "",
  mom_growth: "",
};

export default function PredictForm() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const features = Object.values(formData).map((v) =>
      v === "" ? 0 : v
    );

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post<PredictResponse>(
        "http://127.0.0.1:8000/api/predict",
        { features }
      );

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Gagal melakukan prediksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-24">
      <h2 className="text-xl font-bold mb-4">Single Prediction</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">
              {key}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key as keyof FormData]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        ))}

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Memproses..." : "Prediksi"}
          </button>
        </div>

      </form>

      {/* ERROR */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Hasil Prediksi</h3>
          <p>
            <strong>Index:</strong> {result.prediction_index}
          </p>
          <p>
            <strong>Label:</strong> {result.prediction_label}
          </p>
        </div>
      )}
    </div>
  );
}
