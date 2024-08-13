import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/home/Home';
import Drinks from './pages/drinks/Drinks';
import Contact from './pages/contact/Contact';
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
