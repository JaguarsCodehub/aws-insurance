import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='bg-blue-600 text-white p-4'>
      <div className='container mx-auto flex justify-between'>
        <h1 className='text-xl font-bold'>Car Insurance App</h1>
        <div className='flex gap-4'>
          <Link href='/'>
            <a className='hover:underline'>Home</a>
          </Link>
          <Link href='/login'>
            <a className='hover:underline'>Login</a>
          </Link>
          <Link href='/dashboard'>
            <a className='hover:underline'>Dashboard</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
