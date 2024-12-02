import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={require('../../assets/images/hero.png')}
            alt="Luxury Car Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white">
          <h1 className="text-5xl font-bold mb-6 text-center font-serif">
            Premium Car Insurance Solutions
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl text-gray-200 font-serif">
            Protect your vehicle with comprehensive coverage tailored to your needs
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/login">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-300 font-serif font-medium text-lg min-w-[160px]">
                Login
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors duration-300 font-serif font-medium text-lg min-w-[160px]">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif text-gray-900">Comprehensive Coverage</h3>
            <p className="text-gray-600 font-serif">Full protection for your vehicle against all types of damage</p>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif text-gray-900">Instant Quotes</h3>
            <p className="text-gray-600 font-serif">Get your insurance quote in minutes with our advanced system</p>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif text-gray-900">24/7 Support</h3>
            <p className="text-gray-600 font-serif">Round-the-clock customer service for your peace of mind</p>
          </div>
        </div>
      </div>
    </main>
  );
}
