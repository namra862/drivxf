import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Copy, Download, X, FolderOpen, Loader2, Plus } from "lucide-react";

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrFile, setQrFile] = useState(null);
  const [view, setView] = useState("list"); // list or grid

  const API_URL = "https://drivx.onrender.com/api/files";

  // Fetch files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${API_URL}/list/all`);
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  // Copy link
  const handleCopy = (id) => {
    const link = `${API_URL}/${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-lg p-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          DrivX
        </h1>
        <nav className="space-y-2">
          <button
            onClick={() => setView("list")}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              view === "list" ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView("grid")}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              view === "grid" ? "bg-blue-100 text-blue-600" : "hover:bg-slate-100"
            }`}
          >
            Grid View
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Files</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-lg text-sm ${
                view === "list" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded-lg text-sm ${
                view === "grid" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              Grid
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white animate-pulse h-20 rounded-xl shadow-sm"
                ></div>
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <FolderOpen className="w-16 h-16 mb-3 text-slate-400" />
              <p>No files uploaded yet</p>
            </div>
          ) : view === "list" ? (
            <div className="space-y-3">
              {files.map((file, i) => (
                <motion.div
                  key={file._id}
                  className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">{file.filename}</p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(file.length || file.size || 0)} •{" "}
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <ActionButtons file={file} onCopy={handleCopy} onQr={setQrFile} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((file, i) => (
                <motion.div
                  key={file._id}
                  className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex flex-col"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="font-medium text-sm truncate mb-1">{file.filename}</p>
                  <p className="text-xs text-slate-500 mb-3">
                    {formatFileSize(file.length || file.size || 0)} •{" "}
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <ActionButtons file={file} onCopy={handleCopy} onQr={setQrFile} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Upload Button (FAB) */}
      <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg">
        <Plus className="w-6 h-6" />
      </button>

      {/* QR Modal */}
      <AnimatePresence>
        {qrFile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setQrFile(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
              <h2 className="text-base font-semibold mb-3 text-center">
                Share via QR Code
              </h2>
              <div className="flex justify-center mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${API_URL}/${qrFile._id}`}
                  alt="QR Code"
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-center text-slate-500 break-words mb-3">
                {API_URL}/{qrFile._id}
              </p>
              <div className="flex gap-2 justify-center">
                <a
                  href={`${API_URL}/${qrFile._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Download
                </a>
                <button
                  onClick={() => handleCopy(qrFile._id)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200"
                >
                  Copy Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable action buttons
function ActionButtons({ file, onCopy, onQr }) {
  const API_URL = "https://drivx.onrender.com/api/files";
  return (
    <>
      <button
        onClick={() => onCopy(file._id)}
        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
      >
        <Copy className="w-4 h-4 text-slate-600" />
      </button>
      <button
        onClick={() => onQr(file)}
        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
      >
        <QrCode className="w-4 h-4 text-blue-600" />
      </button>
      <a
        href={`${API_URL}/${file._id}`}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Download className="w-4 h-4" />
      </a>
    </>
  );
}

// File size formatter
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}
