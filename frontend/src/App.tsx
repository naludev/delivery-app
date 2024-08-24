import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from '@components/nav';
import Toast from '@components/toast';
import Footer from '@components/footer';
import Home from '@pages/home/home.page';
import Drinks from '@pages/drinks/drinks.page';
import Login from '@pages/login/login.page';
import SignUp from '@pages/signup/signup.page';
import Cart from '@pages/cart/cart.page';
import Profile from '@pages/profile/profile.page';
import Acerca from '@pages/about/about.page';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow bg-slate-900" style={{backgroundImage: 'radial-gradient(#000000 0.5px, #111827 0.5px)', backgroundSize: '10px 10px'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tragos" element={<Drinks />} />
            {/* <Route path="/contacto" element={<Contact />} /> */}
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/registro" element={<SignUp />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/acerca" element={<Acerca />} />
          </Routes>
          <Toast />
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
