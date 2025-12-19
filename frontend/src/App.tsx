import { Routes, Route, Link } from "react-router-dom";
import SinglePredict from "./pages/SinglePredict";
import UploadPredict from "./pages/UploadPredict";

function App() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/">Single Prediction</Link>
        <Link to="/upload">Upload File</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<SinglePredict />} />
        <Route path="/upload" element={<UploadPredict />} />
      </Routes>
    </div>
  );
}

export default App;
