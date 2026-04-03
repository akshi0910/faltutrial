import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, HeartPulse, ShieldCheck, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MEDICINES = [
  { id: 1, name: "Bravecto Flea & Tick", target: "Dogs", price: 45.99, desc: "A soft chew for 12 weeks of protection against fleas and ticks.", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: 2, name: "Heartgard Plus", target: "Dogs", price: 38.50, desc: "Prevents heartworm disease and treats roundworms and hookworms.", color: "bg-red-50 text-red-600 border-red-200" },
  { id: 3, name: "Revolution Plus", target: "Cats", price: 52.00, desc: "Broad-spectrum protection against 6 common parasites in cats.", color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: 4, name: "Ivermectin Pour-On", target: "Cattle", price: 85.00, desc: "Treats and controls internal and external parasites in farm cattle.", color: "bg-amber-50 text-amber-600 border-amber-200" },
  { id: 5, name: "Nutri-Drench Elite", target: "Poultry & Sheep", price: 24.99, desc: "High energy, premium nutrient-rich supplement for weak livestock.", color: "bg-green-50 text-green-600 border-green-200" },
  { id: 6, name: "Cosequin Joint Health", target: "Dogs & Cats", price: 29.99, desc: "Supports cartilage production and protects existing cartilage.", color: "bg-teal-50 text-teal-600 border-teal-200" }
];

export default function Pharmacy() {
  const { addToCart, getCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3"><Pill className="text-primary-600" size={32} /> VetReach Pharmacy</h1>
          <p className="text-slate-500 mt-2">Order premium medicines and supplements directly to your door.</p>
        </div>
        <button onClick={() => navigate('/cart')} className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-bold shadow-md transition-all">
          <ShoppingCart size={20} /> View Cart
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MEDICINES.map((med) => (
          <div key={med.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border mb-6 ${med.color}`}>
              <ShieldCheck size={32} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900">{med.name}</h3>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold tracking-wide border border-slate-200">{med.target}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{med.desc}</p>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-extrabold text-slate-900">${med.price.toFixed(2)}</span>
              <button 
                onClick={() => addToCart(med)}
                className="bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
