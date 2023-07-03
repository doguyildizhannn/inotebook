import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import AlertState from './context/alert/AlertState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserState from './context/user/UserState';


function App() {
  return (
    <div>
      <AlertState>
        <UserState>
          <NoteState>
            <Router>
              <Navbar />
              <Alert message="Alert" />
              <div className='container'>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<SignUp />} />
                </Routes>
              </div>
            </Router>
          </NoteState>
        </UserState>
      </AlertState>
    </div>
  );
}

export default App;
