'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    year: '',
    registrationNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quote, setQuote] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setQuote(data.premium);
    } catch (err) {
      setError('Failed to generate quote');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-8 text-center'>
          Get Your Car Insurance Quote
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Car Make
            </label>
            <input
              type='text'
              name='carMake'
              value={formData.carMake}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Car Model
            </label>
            <input
              type='text'
              name='carModel'
              value={formData.carModel}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Year
            </label>
            <input
              type='number'
              name='year'
              value={formData.year}
              onChange={handleChange}
              min='1900'
              max='2024'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Registration Number
            </label>
            <input
              type='text'
              name='registrationNumber'
              value={formData.registrationNumber}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 disabled:bg-blue-300'
          >
            {loading ? 'Calculating...' : 'Get Quote'}
          </button>
        </form>

        {error && <div className='mt-4 text-red-600 text-center'>{error}</div>}

        {quote && (
          <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-md'>
            <h2 className='text-xl font-semibold text-center'>Your Quote</h2>
            <p className='text-2xl text-center text-green-600 mt-2'>£{quote}</p>
          </div>
        )}
      </div>
    </main>
  );
}
