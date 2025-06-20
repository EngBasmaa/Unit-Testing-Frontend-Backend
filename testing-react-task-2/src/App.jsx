import "./App.css";
import Counter from "./components/Counter/Counter";
import Champions from "./components/Champions/Champions";
import FunFact from "./components/FunFact/FunFact";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Counter" element={<Counter />} />
        <Route path="/Champions" element={<Champions  />} />
        <Route path="/FunFact" element={<FunFact   />} />
      </Routes>
    </Router>
  );
}

export default App;
