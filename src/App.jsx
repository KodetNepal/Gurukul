import { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './services/firebase';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user when logged in
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);
  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* <RedirectWithState /> */}
      <div className="App">
        <Navbar loggedin={user ? 'true' : 'false'} />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/home" element={<Home />} />
              <Route
                path="/login"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/register" element={<SignUp />} />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              {/* <Route path="/courses/:courseName" element={<CourseDetail />} /> */}
              {/* <Route path="/" element={<Dashboard courses={courses} />} /> */}
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
