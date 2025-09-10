import React, { useState, useRef } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";

export default function UploadCard() {
  const [file, setFile] = useState(null);
  const [expiry, setExpiry] = useState("1h");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const inputRef = useRef();

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  const upload = async () => {
    if (!file) return toast.error("Select a file first");

    const form = new FormData();
    form.append("file", file);
    form.append("expiry", expiry);

    try {
      const res = await API.post("/uploads", form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          if (!p.total) return;
          const percent = Math.round((p.loaded / p.total) * 100);
          setProgress(percent);
        },
      });

      setResult(res.data); // ✅ backend already sends { shortUrl, token, ... }
      setProgress(0);
      toast.success("Upload completed");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
      setProgress(0);
    }
  };

  return (
    <div className="glass p-6 rounded-2xl shadow-lg">
      {/* Upload area */}
      <div
        className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <div>
          {file ? (
            <div className="text-sm">
              <div className="font-medium">{file.name}</div>
              <div className="text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          ) : (
            <div className="text-gray-600">
              Drag & drop or click to select file
            </div>
          )}
        </div>
      </div>

      {/* Expiry + Upload button */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <label className="mr-3">Expiry:</label>
          <select
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="rounded-md p-1 border"
          >
            <option value="1h">1 hour</option>
            <option value="1d">1 day</option>
          </select>
        </div>
        <button
          onClick={upload}
          className="relative px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 ease-in-out
                     bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500
                     shadow-lg hover:shadow-xl hover:shadow-purple-500/50
                     focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500
                     active:scale-95"
        >
          Upload
        </button>
      </div>

      {/* Progress bar */}
      {progress > 0 && (
        <div className="mt-4">
          <div className="h-2 w-full bg-gray-200 rounded">
            <div
              style={{ width: `${progress}%` }}
              className="h-2 rounded bg-gradient-to-r from-blue-500 to-indigo-600"
            />
          </div>
          <div className="mt-1 text-sm text-gray-600">{progress}%</div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{result.filename}</div>
              <div className="text-sm text-gray-500">
                {new Date(result.expiryAt).toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm break-all text-blue-700">
                {result.shortUrl}
              </div>
              <button
                className="mt-2 text-sm underline"
                onClick={() => {
                  navigator.clipboard.writeText(result.shortUrl);
                  toast.success("Copied link");
                }}
              >
                Copy link
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 justify-center">
            <QRCodeCanvas value={result.shortUrl} size={140} />
          </div>
        </div>
      )}
    </div>
  );
}
