import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DogGallery from './components/DogGallery';
import DogBreedSearch from './components/DogBreedSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<DogGallery />} />
          <Route path="/breed" element={<DogBreedSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;