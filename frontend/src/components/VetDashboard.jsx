import { useNavigate } from 'react-router-dom';
import { BellRing, CalendarClock, FileSignature } from 'lucide-react';

export default function VetDashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Vet Command Center</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/appointments')}>
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-6 relative">
            <BellRing size={32} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full"></span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Consultation Requests</h3>
          <p className="text-slate-500 text-sm leading-relaxed">View pending incoming requests from farmers and pet owners.</p>
          <span className="mt-6 text-primary-600 font-semibold text-sm">Respond Now &rarr;</span>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/appointments')}>
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
            <CalendarClock size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Agenda & Schedule</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Manage your accepted appointments and join video calls.</p>
          <span className="mt-6 text-green-600 font-semibold text-sm">View Schedule &rarr;</span>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate('/prescriptions')}>
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-6">
            <FileSignature size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Write Prescriptions</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Issue digital prescriptions for completed consultations instantly.</p>
          <span className="mt-6 text-purple-600 font-semibold text-sm">Issue Records &rarr;</span>
        </div>
      </div>
    </div>
  );
}
