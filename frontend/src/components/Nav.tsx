import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/instatragos.png';

const navItems = [
  { title: 'inicio', url: '/' },
  { title: 'tragos', url: '/tragos' },
  { title: 'acerca', url: '/acerca' },
  { title: 'contacto', url: '/contacto' },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-950 text-white ">
      <div className="flex flex-wrap justify-between items-center px-2 w-full">
        <img className="object-cover w-20 h-full" src={Logo} alt="Logo" />
        <div className="hidden md:flex space-x-4">
          {navItems.map(({ title, url }) => (
            <Link
              key={title}
              to={url}
              className="bg-teal-accent-400 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-white"
            >
              {title}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-gray-900 z-50 md:hidden transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-center mt-20">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="space-y-4 text-center">
            {navItems.map(({ title, url }) => (
              <li key={title}>
                <Link
                  to={url}
                  className="block px-6 py-4 text-white text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
