import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Copy, Download, X } from "lucide-react";

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrFile, setQrFile] = useState(null);

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Your Files
        </h1>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <p className="text-sm text-slate-500">Loading files...</p>
        ) : files.length === 0 ? (
          <p className="text-sm text-slate-500">No files uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {files.map((file, i) => (
              <motion.div
                key={file._id}
                className="bg-white rounded-xl shadow p-3 flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {/* File Info */}
                <div className="flex-1">
                  <p className="font-medium text-sm truncate">{file.filename}</p>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(file.length || file.size || 0)} •{" "}
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => handleCopy(file._id)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                  >
                    <Copy className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => setQrFile(file)}
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
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* QR Modal */}
      <AnimatePresence>
        {qrFile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
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
              <h2 className="text-base font-semibold mb-3">
                Share via QR Code
              </h2>
              <div className="flex justify-center mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${API_URL}/${qrFile._id}`}
                  alt="QR Code"
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-center text-slate-500 break-words">
                {API_URL}/{qrFile._id}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}
