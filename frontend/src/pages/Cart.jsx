import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getSubtotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingCart size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any medicines yet.</p>
        <button onClick={() => navigate('/pharmacy')} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold shadow-md transition-all">
          Browse Pharmacy
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
          Review Your Cart <span className="text-primary-600">({cart.length})</span>
        </h1>
        
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${item.color}`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                  <p className="text-slate-500 text-sm">{item.target}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <span className="font-extrabold text-slate-900 w-20">${(item.price * item.quantity).toFixed(2)}</span>
                
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-slate-200 rounded-l-xl text-slate-600 transition">
                    <Minus size={16}/>
                  </button>
                  <span className="w-10 text-center font-bold text-slate-800">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-slate-200 rounded-r-xl text-slate-600 transition">
                    <Plus size={16} />
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Order Summary</h2>
          
          <div className="space-y-4 text-slate-600 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-semibold text-slate-800">${(getSubtotal() * 0.08).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-t border-slate-100 pt-6 mb-8">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-2xl font-extrabold text-primary-600">${(getSubtotal() * 1.08).toFixed(2)}</span>
          </div>

          <button onClick={() => navigate('/checkout')} className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-md hover:-translate-y-0.5 transition-all">
            Proceed to Checkout <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
