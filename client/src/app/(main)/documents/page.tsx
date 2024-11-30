'use client';

import { useState } from 'react';

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setUploadedUrl(data.file_url);
    } catch (err) {
      setError('Failed to upload file');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-8 text-center'>
          Upload Documents
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='border-2 border-dashed border-gray-300 rounded-lg p-6'>
            <input
              type='file'
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className='w-full'
              accept='image/*,.pdf'
            />
          </div>

          <button
            type='submit'
            disabled={!file || uploading}
            className='w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 disabled:bg-blue-300'
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>

        {error && <div className='mt-4 text-red-600 text-center'>{error}</div>}

        {uploadedUrl && (
          <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-md'>
            <h2 className='text-xl font-semibold text-center'>
              Upload Successful!
            </h2>
            <a
              href={uploadedUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:underline break-all'
            >
              View Uploaded File
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
