import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from '@components/nav.component';
import Toast from '@components/toast.component';
import Footer from '@components/footer.component';
import Home from '@pages/home/home.page';
import Drinks from '@pages/drinks/drinks.page';
import Contact from './pages/contact/contact.page';
import Login from '@pages/login/login.page';
import SignUp from '@pages/signup/signup.page';
import Cart from '@pages/cart/cart.page';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow bg-slate-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tragos" element={<Drinks />} />
            {/* <Route path="/contacto" element={<Contact />} /> */}
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/registro" element={<SignUp />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
          <Toast />
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
