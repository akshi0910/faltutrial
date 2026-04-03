import { Link } from 'react-router-dom';
import { Video, ShieldCheck, Stethoscope, HeartPulse, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-primary-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{animationDelay: '2s'}} />
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{animationDelay: '4s'}} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 h-full mt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Column: Typography */}
            <div className="lg:w-1/2 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-primary-700 text-sm font-semibold tracking-wide mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                VetReach v2.0 Platform is Live
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                Redefining the standard of  <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-600">
                  Veterinary Care.
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                The most advanced telemedicine and digital pharmacy platform built exclusively for elite veterinarians, pet owners, and modern livestock farmers.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/signup?role=vet" className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1 text-center">
                  Start Your Clinic
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg shadow-sm transition-all text-center">
                  Find a Vet
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-4 text-slate-600 text-sm font-medium">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=11" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=12" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=13" alt="User" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-bold shadow-sm">+2k</div>
                </div>
                <div>
                  <div className="flex text-yellow-500 text-sm">★★★★★</div>
                  <p>Trusted by 2,000+ farmers</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Asset Container */}
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-cyan-200 rounded-[2.5rem] filter blur-2xl transform rotate-3" />
              <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-2 shadow-2xl">
                <img src="/hero-image.png" alt="VetReach Dashboard" className="rounded-[2rem] shadow-sm w-full h-auto object-cover transform transition-transform duration-700 hover:scale-[1.02]" />
              </div>
              <div className="absolute -bottom-6 -left-10 bg-white border border-slate-100 p-4 rounded-2xl shadow-xl flex items-center gap-4 hover:scale-105 transition-all">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <Video size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Live Consult</p>
                  <p className="text-xs text-green-600 font-medium tracking-wide">Connected Securely</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="relative z-10 py-10 border-y border-slate-200 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-6">Powering the next generation of animal healthcare</p>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-extrabold tracking-tighter text-slate-800">AcmeFarms</span>
            <span className="text-2xl font-bold tracking-tight text-slate-800">VET<span className="font-light">CLINIC</span></span>
            <span className="text-2xl font-black italic text-slate-800">AeroPet</span>
            <span className="text-2xl font-serif font-bold text-slate-800">Livestock Global</span>
          </div>
        </div>
      </section>

      {/* Bento Box Features Section */}
      <section className="relative z-10 py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-3">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Everything you need, <br/>beautifully designed.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            {/* Bento Card 1 - Spans 2 cols */}
            <div className="md:col-span-2 group relative overflow-hidden bg-white rounded-[2rem] border border-slate-200 p-10 hover:shadow-lg hover:border-primary-300 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 border border-primary-100 group-hover:scale-110 transition-transform">
                  <Video size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Zero-Latency Video Consultations</h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-md">Connect with WebRTC-powered telemedicine directly from your browser. No downloads, no plugins, just crystal clear health advice for your animals.</p>
              </div>
            </div>

            {/* Bento Card 2 - Spans 1 col */}
            <div className="md:col-span-1 group relative overflow-hidden bg-white rounded-[2rem] border border-slate-200 p-10 hover:shadow-lg hover:border-cyan-300 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 border border-cyan-100 group-hover:scale-110 transition-transform">
                  <Stethoscope size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Elite Vets</h3>
                <p className="text-slate-600 leading-relaxed">Access to a curated directory of the world's most experienced surgical and agricultural veterinarians.</p>
              </div>
            </div>

            {/* Bento Card 3 - Spans 1 col */}
            <div className="md:col-span-1 group relative overflow-hidden bg-white rounded-[2rem] border border-slate-200 p-10 hover:shadow-lg hover:border-purple-300 transition-all">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100 group-hover:scale-110 transition-transform">
                  <Activity size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Digital Rx</h3>
                <p className="text-slate-600 leading-relaxed">Receive cryptographically secure digital prescriptions directly to your dashboard interface.</p>
              </div>
            </div>

            {/* Bento Card 4 - Spans 2 cols */}
            <div className="md:col-span-2 group relative overflow-hidden bg-white rounded-[2rem] border border-slate-200 p-10 hover:shadow-lg hover:border-rose-300 transition-all flex items-center justify-between">
              <div className="relative z-10 lg:w-3/5">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 border border-rose-100 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Integrated Pharmacy Network</h3>
                <p className="text-slate-600 text-lg leading-relaxed">Shop specialized livestock antibiotics and pet supplements directly from our partner network. Instant checkout, overnight rural delivery.</p>
              </div>
              <div className="hidden lg:block w-2/5 p-4">
                <div className="w-full h-40 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-center items-center shadow-md transform rotate-3 skew-y-3 group-hover:rotate-0 group-hover:skew-y-0 transition-transform duration-500">
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-widest block mb-2">Cart Total</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tight">$345.00</span>
                  <button className="mt-4 bg-rose-100 text-rose-700 font-bold px-4 py-1.5 rounded-full text-sm">Checkout Ready</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 text-center text-slate-500 z-10 relative bg-white">
        <p className="flex items-center justify-center gap-2">Built with <HeartPulse size={16} className="text-primary-600"/> by VetReach Technologies Inc. &copy; 2026</p>
      </footer>
    </div>
  );
}
