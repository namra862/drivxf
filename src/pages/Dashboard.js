import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "https://drivx.onrender.com/api/files";

  // Fetch files from backend
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

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Dashboard
        </h1>
       <button
  onClick={() => navigate("/")}
  className="px-5 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg"
>
  Upload
</button>



      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Advantages Section */}
        <section class="relative group p-px rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-500">
  <div class="absolute inset-0 rounded-xl bg-white transition-opacity duration-300 opacity-100 group-hover:opacity-0"></div>
  <div class="relative z-10 p-6 sm:p-8 space-y-4 bg-white rounded-xl transition-all duration-300 group-hover:bg-transparent">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-white">Why Choose Cloudy?</h2>
    <ul class="text-sm sm:text-base text-gray-600 space-y-2 transition-colors duration-300 group-hover:text-white/80">
      <li>
        <span class="font-semibold text-gray-700 group-hover:text-white">✓</span> Fast & Secure uploads
      </li>
      <li>
        <span class="font-semibold text-gray-700 group-hover:text-white">✓</span> Share via link or QR
      </li>
      <li>
        <span class="font-semibold text-gray-700 group-hover:text-white">✓</span> Mobile-friendly design
      </li>
      <li>
        <span class="font-semibold text-gray-700 group-hover:text-white">✓</span> Reliable cloud storage
      </li>
      <li>
        <span class="font-semibold text-gray-700 group-hover:text-white">✓</span> Combination of Google Drive and Samsung Quickshare
      </li>
    </ul>
    <p class="mt-6 text-xs text-gray-400 text-right italic transition-colors duration-300 group-hover:text-white/50">
      Developed by <span class="font-semibold text-gray-600 group-hover:text-white/80">Namra Patel</span>
    </p>
  </div>
</section>


        {/* Recent Files (Cards for Mobile) */}
        <section>
          <h2 className="text-base font-semibold mb-3">Recent Uploads</h2>
          {loading ? (
            <p className="text-slate-500 text-sm">Loading files...</p>
          ) : files.length === 0 ? (
            <p className="text-slate-500 text-sm">No files uploaded yet.</p>
          ) : (
            <div className="space-y-3">
              {files.slice(0, 5).map((file, i) => (
                <motion.div
                  key={file._id}
                  className="bg-white rounded-xl shadow p-3 flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div>
                    <p className="font-medium text-sm truncate">{file.filename}</p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(file.length || file.size || 0)} •{" "}
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={`${API_URL}/${file._id}`}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs shadow"
                  >
                    <Download className="w-3 h-3" /> Download
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}
