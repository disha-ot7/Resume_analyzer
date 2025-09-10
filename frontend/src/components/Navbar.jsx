import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='bg-white dark:bg-gray-800 shadow sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        {/* Logo / Brand */}
        <Link to='/' className='text-xl font-bold text-blue-600'>
          Resume Analyzer
        </Link>

        {/* Navigation Links */}
        <div className='space-x-6'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }>
            Home
          </NavLink>
          <NavLink
            to='/upload'
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }>
            Upload
          </NavLink>
          <NavLink
            to='/results'
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }>
            Results
          </NavLink>
          <NavLink
            to='/history'
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }>
            History
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
