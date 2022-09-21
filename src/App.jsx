import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/LandingPage/Home';
import Contact from './pages/Layout/Contact/Contact';
import Login from './pages/Layout/Login/Login';
import Nopage from './pages/Layout/NoPage/NoPage';
import Register from './pages/Layout/Register/Register';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import { AuthProvider } from './utils/auth';
import RequireAuth from './utils/requireAuth';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route index element={<Home/>} />
              <Route exact path="register" element={<Register/>} />
              <Route exact path='login' element={<Login/>} />
              <Route exact path='contact' element={<RequireAuth><Contact/></RequireAuth>} />
              <Route exact path='unauthorized' element={<Unauthorized/>} />
              <Route exact path='*' element={<Nopage/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
