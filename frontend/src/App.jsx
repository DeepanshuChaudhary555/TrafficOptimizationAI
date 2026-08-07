import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Detection from "./pages/Detection";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <Layout>

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/upload" element={<Upload />} />

          <Route path="/detection" element={<Detection />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/settings" element={<Settings />} />

        </Routes>

      </Layout>

    </BrowserRouter>
  );
}

export default App;