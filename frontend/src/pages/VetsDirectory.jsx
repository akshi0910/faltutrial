import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Video, Stethoscope, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VetsDirectory() {
  const [vets, setVets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'farmer') return navigate('/dashboard');
    fetchVets();
  }, [user, navigate]);

  const fetchVets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vets');
      setVets(res.data);
    } catch (err) { console.error(err); }
  };

  const requestConsultation = async (vetId, type) => {
    try {
      await axios.post('http://localhost:5000/api/consultations', {
        farmerId: user.id, vetId, type
      });
      alert('Request sent!');
      navigate('/appointments');
    } catch (err) { console.error(err); }
  };

  const filteredVets = vets.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.specialization.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3"><Stethoscope className="text-primary-600" size={32} /> Veterinary Directory</h1>
          <p className="text-slate-500 mt-2">Find and connect with verified professionals for your animals.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or specialization..." 
            className="pl-10 w-full border border-slate-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVets.map(vet => (
          <div key={vet._id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-indigo-50 rounded-2xl flex items-center justify-center text-primary-700 font-bold text-2xl shadow-inner border border-white">
                {vet.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">{vet.name} <ShieldCheck className="text-green-500 h-5 w-5" /></h3>
                <span className="inline-block px-2.5 py-0.5 mt-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">{vet.specialization}</span>
              </div>
            </div>
            
            <div className="mb-6 space-y-2 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-800">Experience:</span> {vet.experience} years</p>
              <p><span className="font-semibold text-slate-800">Availability:</span> <span className="text-green-600 font-medium">Available Now</span></p>
            </div>
            
            <button 
              onClick={() => requestConsultation(vet._id, 'video')}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Video size={18} /> Request Video Consult
            </button>
          </div>
        ))}
        {filteredVets.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <Stethoscope className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">No veterinarians found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
