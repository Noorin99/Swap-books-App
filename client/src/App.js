import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Landing } from './pages';

function App() {
  return <Router>
    <Header />
    <Routes>
    <Route path='/' element={<Landing/>} />
    </Routes>
  </Router>
    
}

export default App;
