import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/nav.component';
import Home from './pages/home/home.page';
import Drinks from './pages/drinks/drinks.page';
import Contact from './pages/contact/contact.page';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow bg-slate-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tragos" element={<Drinks />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
