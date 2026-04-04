import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const { getCartCount } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navClass = "glass shadow-sm border-b border-slate-200/50";
  const linkClass = "text-slate-600 hover:text-primary-600 font-semibold transition-colors";
  const brandClass = "text-slate-900";
  const iconClass = "text-primary-600";

  return (
    <nav className={`${navClass} sticky top-0 z-50 py-4 px-6 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <HeartPulse size={30} className={iconClass} />
          <span className={`text-2xl font-black tracking-tight ${brandClass}`}>VetReach</span>
        </Link>
        <div className="space-x-5 flex items-center">
          {user ? (
            <>
              <Link to="/dashboard" className={linkClass}>Dashboard</Link>
              {user.role === 'farmer' && <Link to="/vets" className={linkClass}>Find Vets</Link>}
              <Link to="/appointments" className={linkClass}>Appointments</Link>
              {user?.role === 'farmer' && <Link to="/pharmacy" className={linkClass}>Pharmacy</Link>}
              <Link to="/prescriptions" className={linkClass}>Prescriptions</Link>
              <Link to="/profile" className={linkClass}>Profile</Link>
              
              {user?.role === 'farmer' && (
                <Link to="/cart" className={`relative ${linkClass} inline-flex items-center align-middle`}>
                  <ShoppingCart size={22} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="bg-primary-50 hover:bg-primary-100 text-primary-700 px-5 py-2.5 rounded-full font-bold transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass}>Log in</Link>
              <Link to="/signup" className="bg-primary-600 hover:bg-primary-500 text-white px-7 py-3 rounded-full font-bold shadow-md shadow-primary-500/30 transition-all hover:-translate-y-0.5">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
