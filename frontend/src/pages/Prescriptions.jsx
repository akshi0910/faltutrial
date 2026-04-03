import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pill, FileSignature } from 'lucide-react';

export default function Prescriptions() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ animalType: '', symptoms: '', medicines: '', instructions: '' });
  const [prescriptionData, setPrescriptionData] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const isCreating = searchParams.get('new');
  const isViewing = searchParams.get('view');

  useEffect(() => {
    if (!user) navigate('/login');
    if (isViewing) fetchPrescription(isViewing);
  }, [isViewing, user]);

  const fetchPrescription = async (consultationId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/prescriptions/consultation/${consultationId}`);
      setPrescriptionData(res.data);
    } catch (err) { console.error(err); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Need the consultation details to get farmerId, but for now we'll assume the API could handle it 
      // or we extract it. For a robust app, we'd fetch the consultation first.
      // Let's fetch consultation quickly
      const cRes = await axios.get(`http://localhost:5000/api/consultations/user/${user.id}`);
      const consultation = cRes.data.find(c => c._id === isCreating);
      
      if (!consultation) return alert("Consultation not found");

      await axios.post('http://localhost:5000/api/prescriptions', {
        ...formData,
        consultationId: isCreating,
        vetId: user.id,
        farmerId: consultation.farmerId._id
      });
      alert('Prescription saved!');
      navigate('/appointments');
    } catch (err) { console.error(err); }
  };

  if (isCreating && user.role === 'vet') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3"><FileSignature className="text-primary-600" size={32} /> Write Prescription</h1>
          <p className="text-slate-500 mt-2">Issue a digital prescription for the completed consultation.</p>
        </div>
        <form onSubmit={handleCreate} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Animal Type</label>
               <input required type="text" placeholder="e.g. Dog, Cow, Horse" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" value={formData.animalType} onChange={e => setFormData({...formData, animalType: e.target.value})} />
            </div>
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Observed Symptoms</label>
               <input required type="text" placeholder="e.g. Fever, Lethargy" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" value={formData.symptoms} onChange={e => setFormData({...formData, symptoms: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Medicines Prescribed</label>
            <textarea required rows="3" placeholder="List of medicines and dosages" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" value={formData.medicines} onChange={e => setFormData({...formData, medicines: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Care Instructions</label>
            <textarea required rows="4" placeholder="Rest protocols, dietary changes, etc." className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" value={formData.instructions} onChange={e => setFormData({...formData, instructions: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5">
            Submit Prescription
          </button>
        </form>
      </div>
    );
  }

  if (isViewing) {
    if (!prescriptionData) return <div className="p-12 text-center text-slate-500">Loading prescription or none exists...</div>;
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden print:shadow-none print:border-none">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary-400 to-indigo-500 print:hidden" />
          <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
             <div>
                <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2"><Pill className="text-primary-600" size={32}/> Digital Prescription</h1>
                <p className="text-sm text-slate-500 mt-2">Date: {new Date(prescriptionData.createdAt).toLocaleDateString()}</p>
             </div>
             <div className="text-right">
                <p className="font-bold text-slate-800">Dr. {prescriptionData.vetId?.name}</p>
                <p className="text-sm text-slate-500">{prescriptionData.vetId?.specialization}</p>
             </div>
          </div>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl">
              <div><p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Patient Info</p><p className="font-medium text-slate-800">Animal: {prescriptionData.animalType}</p></div>
              <div><p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Symptoms</p><p className="font-medium text-slate-800">{prescriptionData.symptoms}</p></div>
            </div>
            
            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Treatment Plan</h3>
               <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                 <p className="whitespace-pre-line text-slate-800 font-medium leading-relaxed">{prescriptionData.medicines}</p>
               </div>
            </div>

            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Care Instructions</h3>
               <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                 <p className="whitespace-pre-line text-slate-700 leading-relaxed">{prescriptionData.instructions}</p>
               </div>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center print:hidden">
            <button onClick={() => window.print()} className="text-primary-600 font-bold hover:underline">Print PDF</button>
            <button onClick={() => navigate('/appointments')} className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition">Back</button>
          </div>
        </div>
      </div>
    );
  }

  const [completedApps, setCompletedApps] = useState([]);
  
  useEffect(() => {
    if (!isCreating && !isViewing && user) {
      axios.get(`http://localhost:5000/api/consultations/user/${user.id}`)
        .then(res => setCompletedApps(res.data.filter(c => c.status === 'completed')))
        .catch(err => console.error(err));
    }
  }, [isCreating, isViewing, user]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3"><FileSignature className="text-primary-600" size={32} /> Prescription Center</h1>
      {completedApps.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-slate-100 text-slate-500">
          No completed consultations found to write prescriptions for.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {completedApps.map(appt => (
            <div key={appt._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center hover:-translate-y-1 transition-all">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{user.role === 'vet' ? appt.farmerId?.name : `Dr. ${appt.vetId?.name}`}</h3>
                <p className="text-sm text-slate-500">{new Date(appt.createdAt).toLocaleDateString()}</p>
              </div>
              {user.role === 'vet' ? (
                <button onClick={() => navigate(`?new=${appt._id}`)} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold hover:bg-indigo-200 transition">Write</button>
              ) : (
                <button onClick={() => navigate(`?view=${appt._id}`)} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-200 transition">View</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
