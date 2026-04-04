import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerDashboard from '../components/FarmerDashboard';
import VetDashboard from '../components/VetDashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Welcome, {user.name}</h1>
          <p className="text-slate-500 mt-1 capitalize">{user.role} Dashboard</p>
        </div>
      </div>

      {user.role === 'farmer' ? <FarmerDashboard user={user} /> : <VetDashboard user={user} />}
    </div>
  );
}
