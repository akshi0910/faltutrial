import { UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-indigo-600 w-full absolute top-0 left-0"></div>
        
        <div className="pt-24 px-8 pb-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white relative z-10 mb-4 text-primary-600">
             <UserCircle size={80} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">{user.name}</h1>
          <span className="mt-2 inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold uppercase tracking-widest rounded-full">{user.role}</span>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-4">Account Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-slate-500">Email Address</p><p className="font-semibold text-slate-800">{user.email}</p></div>
              <div><p className="text-sm text-slate-500">Account ID</p><p className="font-semibold text-slate-800">{user.id}</p></div>
            </div>
          </div>
          
          {user.role === 'vet' && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-4">Professional Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-slate-500">Specialization</p><p className="font-semibold text-slate-800">{user.specialization || 'General'}</p></div>
                <div><p className="text-sm text-slate-500">Experience</p><p className="font-semibold text-slate-800">{user.experience || 'Not specified'} years</p></div>
              </div>
            </div>
          )}

          <div className="flex justify-center pt-6">
             <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); }} className="text-red-500 font-bold hover:underline px-4 py-2">Sign Out Devices</button>
          </div>
        </div>
      </div>
    </div>
  );
}
