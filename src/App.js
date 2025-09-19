import logo from './logo.svg';
import './App.css';
import PasteArea from './pages/pasteArea';
import LandingPage from './pages/landingPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App font-retro"> 
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/PasteArea' element={<PasteArea/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
