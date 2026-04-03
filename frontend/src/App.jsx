import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VideoCall from './pages/VideoCall';
import VetsDirectory from './pages/VetsDirectory';
import Appointments from './pages/Appointments';
import Prescriptions from './pages/Prescriptions';
import Profile from './pages/Profile';
import Pharmacy from './pages/Pharmacy';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vets" element={<VetsDirectory />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/room/:roomId" element={<VideoCall />} />
          </Routes>
        </main>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
