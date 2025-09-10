import React from 'react';
import UploadCard from '../components/UploadCard';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="text-center my-8">
        <h1 className="text-3xl font-bold">Secure File Sharing. Simple. Fast. Temporary.</h1>
        <p className="mt-2 text-gray-600">Upload files, choose how long they live — one hour or one day.</p>
      </header>

      <UploadCard />
    </div>
  );
}
