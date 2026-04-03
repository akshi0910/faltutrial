import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Briefcase } from 'lucide-react';

export default function Signup() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlRole = queryParams.get('role');

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: urlRole === 'vet' ? 'vet' : 'farmer', specialization: '', experience: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-lg border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-cyan-500" />
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-2">Create an account</h2>
        <p className="text-slate-500 text-center mb-6">
          {urlRole === 'vet' ? 'Join VetReach as a Veterinarian' : 
           urlRole === 'farmer' ? 'Join VetReach as a Farmer / Pet Owner' : 
           'Join VetReach as a Farmer or Vet'}
        </p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          {!urlRole && (
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-xl border font-bold text-sm transition-all shadow-sm ${formData.role === 'farmer' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                onClick={() => setFormData({ ...formData, role: 'farmer' })}
              >
                Farmer / Pet Owner
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-xl border font-bold text-sm transition-all shadow-sm ${formData.role === 'vet' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                onClick={() => setFormData({ ...formData, role: 'vet' })}
              >
                Veterinarian
              </button>
            </div>
          )}

          <div className="relative">
            <User className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
            <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} className="pl-10 block w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900" />
          </div>
          
          <div className="relative">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
            <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleChange} className="pl-10 block w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900" />
          </div>
          
          <div className="relative">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
            <input type="password" name="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="pl-10 block w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900" />
          </div>

          {formData.role === 'vet' && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="relative">
                <Briefcase className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
                <input type="text" name="specialization" required placeholder="Specialization (e.g. Equine, Small Animals)" value={formData.specialization} onChange={handleChange} className="pl-10 block w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900" />
              </div>
              <input type="number" name="experience" required placeholder="Years of Experience" value={formData.experience} onChange={handleChange} className="block w-full border border-slate-200 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900" />
            </div>
          )}

          <button type="submit" className="w-full flex justify-center py-3 mt-4 border border-transparent rounded-xl shadow-md shadow-primary-500/30 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 transition-all hover:-translate-y-0.5">
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
