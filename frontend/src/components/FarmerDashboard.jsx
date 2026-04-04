import { useNavigate } from 'react-router-dom';
import { Search, CalendarClock, Pill, ShoppingCart } from 'lucide-react';

export default function FarmerDashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Quick Actions</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/vets')}>
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-6">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Find Vets</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Browse the directory of verified veterinarians to request a consultation.</p>
          <span className="mt-6 text-primary-600 font-semibold text-sm">Browse Directory &rarr;</span>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/appointments')}>
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
            <CalendarClock size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">My Appointments</h3>
          <p className="text-slate-500 text-sm leading-relaxed">View your active, pending, and completed consultation requests.</p>
          <span className="mt-6 text-indigo-600 font-semibold text-sm">Manage Appointments &rarr;</span>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/prescriptions')}>
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
            <Pill size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Prescriptions</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Access your digital prescriptions safely, issued by your veterinarians.</p>
          <span className="mt-6 text-blue-600 font-semibold text-sm">View Records &rarr;</span>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/pharmacy')}>
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6">
            <ShoppingCart size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Pharmacy Shop</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Order premium medicines, supplements, and supplies directly.</p>
          <span className="mt-6 text-rose-600 font-semibold text-sm">Shop Now &rarr;</span>
        </div>
      </div>
    </div>
  );
}
