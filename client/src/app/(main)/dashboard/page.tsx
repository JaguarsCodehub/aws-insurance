'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpIcon, DocumentTextIcon, PlusCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid';

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
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-stone-500">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section - Added gradient text */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-2 bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 font-serif">Manage your insurance portfolio and explore new coverage options.</p>
        </div>

        {/* Action Buttons - Added gradient hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/quotes"
            className="group relative flex items-center justify-between p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">Get New Quote</h3>
              <p className="text-sm text-gray-600 font-serif">Compare rates and get instant coverage</p>
            </div>
            <PlusCircleIcon className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
          </Link>

          <Link href="/documents"
            className="group relative flex items-center justify-between p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">Upload Documents</h3>
              <p className="text-sm text-gray-600 font-serif">Manage your policy documentation</p>
            </div>
            <CloudArrowUpIcon className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/analysis"
            className="group relative flex items-center justify-between p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">Analyse Car Damage</h3>
              <p className="text-sm text-gray-600 font-serif">Upload and analyze your vehicle photos for instant damage assessment</p>
            </div>
            <PlusCircleIcon className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
          </Link>

          <Link href="/analysis-dashboard"
            className="group relative flex items-center justify-between p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">View Damage Analysis</h3>
              <p className="text-sm text-gray-600 font-serif">View your previous damage analysis results</p>
            </div>
            <CloudArrowUpIcon className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
          </Link>
        </div>

        {/* Quick Stats - Added distinctive styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-semibold text-gray-900">Total Quotes</h3>
              <div className="p-2 bg-green-50 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-gray-900">{quotes.length}</p>
            <p className="text-sm text-gray-600 font-serif mt-2">Active insurance quotes</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-semibold text-gray-900">Average Premium</h3>
              <div className="p-2 bg-indigo-50 rounded-lg">
                <ArrowUpIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-gray-900">
              £{quotes.length > 0
                ? (quotes.reduce((acc, quote) => acc + quote.premium, 0) / quotes.length).toFixed(2)
                : '0'}
            </p>
            <p className="text-sm text-gray-600 font-serif mt-2">Per policy average</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-semibold text-gray-900">Latest Quote</h3>
              <div className="p-2 bg-green-50 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-gray-900">
              {quotes.length > 0
                ? `£${quotes[quotes.length - 1].premium}`
                : 'No quotes'}
            </p>
            <p className="text-sm text-gray-600 font-serif mt-2">Most recent quote</p>
          </div>
        </div>

        {/* Quotes Table - Enhanced styling */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-serif font-semibold text-gray-900">Your Insurance Quotes</h2>
          </div>

          {loading && (
            <div className="p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50">
              <p className="text-red-600 font-serif">{error}</p>
            </div>
          )}

          {quotes.length === 0 && !loading ? (
            <div className="p-6">
              <p className="text-gray-600 font-serif">No quotes found. Get your first quote now!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-serif font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-4 text-left text-xs font-serif font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-4 text-left text-xs font-serif font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                    <th className="px-6 py-4 text-left text-xs font-serif font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                    <th className="px-6 py-4 text-left text-xs font-serif font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotes.map((quote) => (
                    <tr key={quote.quote_id} className="hover:bg-green-50/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap font-serif">
                        {quote.car_make} {quote.car_model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-serif">
                        {quote.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-serif">
                        {quote.registration_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-serif font-semibold text-green-600">
                        £{quote.premium}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="px-4 py-2 text-green-600 hover:text-green-700 font-serif transition-colors duration-200 hover:bg-green-50 rounded-lg"
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
      </main>
    </div>
  );
}
