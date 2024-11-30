'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Quote {
  quote_id: string;
  car_make: string;
  car_model: string;
  year: number;
  registration_number: string;
  premium: number;
}

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('http://localhost:8000/quotes/user');
      const data = await response.json();
      setQuotes(data);
    } catch (err) {
      setError('Failed to fetch quotes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link 
            href="/quotes" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Get New Quote
          </Link>
          <Link 
            href="/documents" 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Upload Documents
          </Link>
        </div>
      </div>

      {/* Quotes Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Insurance Quotes</h2>
        
        {loading && <p>Loading quotes...</p>}
        
        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {quotes.length === 0 && !loading ? (
          <p className="text-gray-500">No quotes found. Get your first quote now!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote.quote_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quote.car_make} {quote.car_model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quote.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quote.registration_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      £{quote.premium}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => window.print()}
                      >
                        Print Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Quotes</h3>
          <p className="text-3xl font-bold">{quotes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Average Premium</h3>
          <p className="text-3xl font-bold">
            £{quotes.length > 0 
              ? (quotes.reduce((acc, quote) => acc + quote.premium, 0) / quotes.length).toFixed(2)
              : '0'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Latest Quote</h3>
          <p className="text-3xl font-bold">
            {quotes.length > 0 
              ? `£${quotes[quotes.length - 1].premium}`
              : 'No quotes yet'}
          </p>
        </div>
      </div>
    </main>
  );
}
