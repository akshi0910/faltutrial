import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, Video, CheckCircle, Clock } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/consultations/user/${user.id}`);
      setAppointments(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (!user) return navigate('/login');
    fetchAppointments();
    
    const intervalId = setInterval(() => {
      fetchAppointments();
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [user, navigate]);

  const updateStatus = async (id, status, type) => {
    try {
      let payload = { status };
      if (status === 'accepted') {
        payload.meetingRoom = Math.random().toString(36).substring(2, 10);
      }
      await axios.put(`http://localhost:5000/api/consultations/${id}/status`, payload);
      fetchAppointments();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3"><CalendarClock className="text-primary-600" size={32} /> My Appointments</h1>
        <p className="text-slate-500 mt-2">Manage your consultation history and upcoming calls.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {appointments.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No appointments found.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {appointments.map(appt => (
              <div key={appt._id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors">
                
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 
                    ${appt.status === 'completed' ? 'bg-slate-100 text-slate-400' : 'bg-primary-50 text-primary-600'}`}>
                    {appt.status === 'completed' ? <CheckCircle /> : <Clock />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {user.role === 'farmer' ? `Dr. ${appt.vetId?.name}` : appt.farmerId?.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                       {user.role === 'farmer' ? `${appt.vetId?.specialization}` : `${appt.farmerId?.email}`} • {appt.type.replace('_', ' ')}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border
                      ${appt.status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                        appt.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {appt.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:w-auto w-full shrink-0">
                  {user.role === 'vet' && appt.status === 'pending' && (
                     <button onClick={() => updateStatus(appt._id, 'accepted')} className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm">
                       Accept
                     </button>
                  )}
                  {user.role === 'vet' && appt.status === 'accepted' && (
                     <button onClick={() => updateStatus(appt._id, 'completed')} className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-2.5 rounded-xl font-bold transition">
                       Mark Completed
                     </button>
                  )}
                  
                  {appt.status === 'accepted' && appt.meetingRoom && (
                     <button onClick={() => navigate(`/room/${appt.meetingRoom}`)} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-sm shadow-green-500/30 transition hover:-translate-y-0.5">
                       <Video size={18} /> Join Call
                     </button>
                  )}

                  {appt.status === 'completed' && user.role === 'vet' && (
                     <button onClick={() => navigate(`/prescriptions?new=${appt._id}`)} className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-6 py-2.5 rounded-xl font-bold transition">
                       Write Prescription
                     </button>
                  )}
                  {appt.status === 'completed' && user.role === 'farmer' && (
                     <button onClick={() => navigate(`/prescriptions?view=${appt._id}`)} className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl font-bold transition">
                       View Prescription
                     </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
