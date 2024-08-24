import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@store/config";
import { selectToken, logout } from "@store/slices/session.slice";
import { checkSessionStatus } from "@store/actions/session.actions";
import { selectCartTotalQuantity } from "@store/slices/cart.slice";
import { fetchCartTotalQuantity } from "@store/actions/cart.actions";
import { logoutAPI } from "@store/api/session.api";
import Logo from "@assets/instatragos.png";
import User from "@assets/user.png";
import Cart from "@assets/cart.png";

const navItems = [
  { title: "inicio", url: "/" },
  { title: "tragos", url: "/tragos" },
  { title: "acerca", url: "/acerca" },
  // { title: 'contacto', url: '/contacto' },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => selectToken(state));
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const isLoggedIn = !!token;

  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(checkSessionStatus());
  //   dispatch(fetchCartTotalQuantity());
  // }, [dispatch]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Intentar despachar el thunk y obtener el resultado
        const result = await dispatch(checkSessionStatus()).unwrap();
        console.log('Session status:', result); 
        dispatch(fetchCartTotalQuantity());
      } catch (error) {
        console.error('Error checking session status:', error);
        localStorage.removeItem('token');
        dispatch(logout()); // Actualiza el estado en Redux
      }
    };

    checkStatus()
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutAPI();
      dispatch(logout());
      navigate("/iniciar-sesion");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="text-white" style={{ 
   
      backgroundImage: 'radial-gradient(#000000 0.5px, #111827 0.5px)', 
      backgroundSize: '10px 10px', 
      zIndex: 5
    }}>
      <div className="flex flex-wrap justify-between items-center px-2 w-full">
        <img className="object-cover w-20 h-full" src={Logo} alt="Logo" />
        <div className="hidden md:flex space-x-4 mr-2">
          {navItems.map(({ title, url }) => (
            <Link key={title} to={url} className="bg-teal-accent-400 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-white">{title}</Link>
          ))}
          {isLoggedIn && (
            <div className="flex">
              <img className="w-5 h-fit invert mr-auto cursor-pointer" src={Cart} alt="User Icon" onClick={() => navigate("/carrito")} />
              <span className="absolute mt-[0.7rem] ml-[0.7rem] rounded-full py-1 px-1 text-[10px] content-[''] leading-none grid place-items-center bg-red-600 text-white">
                {totalQuantity}
              </span>
            </div>
          )}
          <img className="object-cover w-5 h-full invert mr-auto cursor-pointer" src={User} alt="User Icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-12 w-48 bg-gray-800 rounded-lg shadow-lg z-30">
              {isLoggedIn ? (
                <>
                 <button className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left" onClick={() => { navigate('/perfil'); setIsUserMenuOpen(false); }}>Perfil</button>
                <button className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left" onClick={() => { handleLogout(); setIsUserMenuOpen(false); }}>Salir</button>
                </>
              ) : (
                <>
                  <Link to="/iniciar-sesion" className="block px-4 py-2 text-white hover:bg-gray-700" onClick={() => setIsUserMenuOpen(false)}>Iniciar sesión</Link>
                  <Link to="/registro" className="block px-4 py-2 text-white hover:bg-gray-700" onClick={() => setIsUserMenuOpen(false)}>Registrarse</Link>
                </>
              )}
            </div>
          )}
        </div>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      <div className={`fixed inset-0 z-50 md:hidden transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`} style={{backgroundImage: 'radial-gradient(#000000 0.5px, #111827 0.5px)', backgroundSize: '10px 10px'}}>
        <div className="flex flex-col items-center mt-20">
          <button className="absolute top-4 right-4 text-white" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="space-y-4 text-center">
            {navItems.map(({ title, url }) => (
              <li key={title}>
                <Link to={url} className="bg-teal-accent-400 inline-block rounded-full px-3 py-px text-md font-semibold uppercase tracking-wider text-white" onClick={() => setIsMenuOpen(false)}>{title}</Link>
              </li>
            ))}
              {isLoggedIn && (
                <div className="flex justify-center">
            <div className="flex">
              <img className="w-5 h-fit invert mr-auto cursor-pointer" src={Cart} alt="User Icon" onClick={() => { navigate("/carrito"); setIsMenuOpen(false)}  } />
              <span className="absolute mt-[0.7rem] ml-[0.7rem] rounded-full py-1 px-1 text-[10px] content-[''] leading-none grid place-items-center bg-red-600 text-white">
                {totalQuantity}
              </span>
            </div>
            </div>
          )}
            {isLoggedIn ? (
              <li>
                <button className="bg-teal-accent-400 rounded-full px-3 py-px text-md uppercase font-bold tracking-wider text-white" onClick={() => { navigate("/perfil"); setIsMenuOpen(false)}}>Salir</button>
                <button className="bg-teal-accent-400 rounded-full px-3 py-px text-md uppercase font-bold tracking-wider text-white" onClick={handleLogout}>Salir</button>
              </li>
            ) : (
              <li className="flex flex-col gap-3">
                <Link to="/iniciar-sesion" className="bg-teal-accent-400 rounded-full px-3 py-px text-xs uppercase font-bold tracking-wider text-white" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</Link>
                <Link to="/registro" className="bg-teal-accent-400 rounded-full px-3 py-px text-xs uppercase font-bold tracking-wider text-white" onClick={() => setIsUserMenuOpen(false)}>Registrarse</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
