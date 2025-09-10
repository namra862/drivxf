import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FilesPage from "./pages/FilesPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashboardUI from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen">
        <nav className="p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Drive X</Link>
          <Link to="/dash" className="px-3 py-1 rounded-md glass">Dashboard</Link>
          <Link to="/files" className="px-3 py-1 rounded-md glass">Files</Link>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/dash" element={<DashboardUI/>} />
            <Route path="/" element={<Home />} />
            <Route path="/files" element={<FilesPage />} />
          </Routes>
        </main>

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
