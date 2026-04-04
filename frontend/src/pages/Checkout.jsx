import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, CreditCard, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cart, getSubtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = (getSubtotal() * 1.08).toFixed(2);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000); // Simulate API call
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 shadow-xl shadow-green-500/20">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Order Confirmed!</h1>
        <p className="text-xl text-slate-500 mb-8 leading-relaxed">Your medicines have been carefully packed down at the VetReach pharmacy and are ready to ship.</p>
        <button onClick={() => navigate('/dashboard')} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1">
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess && !isProcessing) {
    navigate('/pharmacy');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
      <div className="md:w-2/3">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3"><Truck className="text-primary-600" size={32} /> Checkout</h1>
        
        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Shipping Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required type="text" placeholder="First Name" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
              <input required type="text" placeholder="Last Name" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
              <input required type="text" placeholder="Farm / Street Address" className="w-full sm:col-span-2 border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
              <input required type="text" placeholder="City" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
              <input required type="text" placeholder="ZIP Code" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><CreditCard size={24} className="text-slate-400"/> Payment Method</h2>
            <div className="space-y-4">
              <input required type="text" placeholder="Card Number (Mock Data)" autoComplete="off" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" defaultValue="4111 1111 1111 1111" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="MM/YY" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" defaultValue="12/26" />
                <input required type="text" placeholder="CVC" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary-500" defaultValue="123" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="md:w-1/3">
        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl sticky top-24">
          <h2 className="text-xl font-bold mb-6 border-b border-slate-800 pb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-slate-400 capitalize truncate w-40">{item.quantity}x {item.name}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 text-slate-400 mb-6 pt-4 border-t border-slate-800 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${getSubtotal().toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>${(getSubtotal() * 0.08).toFixed(2)}</span></div>
          </div>
          
          <div className="flex justify-between items-center border-t border-slate-800 pt-6 mb-8">
            <span className="text-lg font-bold">Total</span>
            <span className="text-3xl font-extrabold text-primary-400">${total}</span>
          </div>

          <button form="checkout-form" disabled={isProcessing} className="w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-primary-500/20 hover:-translate-y-0.5 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed">
            {isProcessing ? 'Processing Order...' : `Pay $${total}`}
          </button>
          
          <p className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck size={14} /> Secure Transaction Guaranteed
          </p>
        </div>
      </div>
    </div>
  );
}
