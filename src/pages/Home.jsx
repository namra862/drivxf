import React from "react";
import { motion } from "framer-motion";
import UploadCard from "../components/UploadCard";
import { ShieldCheck, Zap, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      {/* Background Accent Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-16">
         <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex justify-center px-4 pb-16"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
        >
          Secure File Sharing. <br className="hidden md:block" />
          <span className="text-slate-800">Simple. Fast. Temporary.</span>
        </motion.h1>
        

       
      </motion.div>
         <UploadCard />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg text-slate-600 max-w-xl"
        >
          Upload files, generate instant links, and set expiry. <br />
          Choose how long they live — one hour or one day.
        </motion.p>

        {/* Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          <Feature icon={<ShieldCheck />} title="Secure" text="Your files are encrypted & private." />
          <Feature icon={<Zap />} title="Fast" text="Upload and share instantly." />
          <Feature icon={<Clock />} title="Temporary" text="Auto-deletes after expiry." />
        </motion.div>
      </header>

      {/* Upload Card Section */}
     
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl shadow-md px-4 py-3 w-64 hover:shadow-lg transition">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">{icon}</div>
      <div>
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}
