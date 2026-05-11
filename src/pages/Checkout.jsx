import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Banknote, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(AppContext);
  const [method, setMethod] = useState('tarjeta');
  
  const total = location.state?.total || 145;

  return (
    <motion.div 
      className="min-h-screen px-6 pt-12 pb-12 flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[10px] text-primary/80 uppercase tracking-widest font-medium mb-8 hover:text-primary transition"
      >
        <ArrowLeft size={14} />
        VOLVER
      </button>

      <div className="mb-8">
        <h3 className="text-[10px] text-primary/80 uppercase tracking-[0.2em] font-medium mb-2">Finalizar</h3>
        <h2 className="font-serif text-[32px] text-foreground">Método de Pago</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <button 
          onClick={() => setMethod('tarjeta')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${
            method === 'tarjeta' ? 'bg-[#151515] border-[#B08A45]' : 'bg-[#111111] border-white/5'
          }`}
        >
          <CreditCard size={24} className={method === 'tarjeta' ? 'text-primary' : 'text-foreground/40'} strokeWidth={1.5} />
          <div className="text-center">
            <div className={`text-xs font-medium mb-1 ${method === 'tarjeta' ? 'text-primary' : 'text-foreground/60'}`}>Tarjeta</div>
            <div className="text-[9px] text-foreground/40">Visa, MC, Amex</div>
          </div>
        </button>

        <button 
          onClick={() => setMethod('apple')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${
            method === 'apple' ? 'bg-[#151515] border-[#B08A45]' : 'bg-[#111111] border-white/5'
          }`}
        >
          <Smartphone size={24} className={method === 'apple' ? 'text-primary' : 'text-foreground/40'} strokeWidth={1.5} />
          <div className="text-center">
            <div className={`text-xs font-medium mb-1 ${method === 'apple' ? 'text-primary' : 'text-foreground/60'}`}>Apple Pay</div>
            <div className="text-[9px] text-foreground/40">Touch ID</div>
          </div>
        </button>

        <button 
          onClick={() => setMethod('efectivo')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${
            method === 'efectivo' ? 'bg-[#151515] border-[#B08A45]' : 'bg-[#111111] border-white/5'
          }`}
        >
          <Banknote size={24} className={method === 'efectivo' ? 'text-primary' : 'text-foreground/40'} strokeWidth={1.5} />
          <div className="text-center">
            <div className={`text-xs font-medium mb-1 ${method === 'efectivo' ? 'text-primary' : 'text-foreground/60'}`}>Efectivo</div>
            <div className="text-[9px] text-foreground/40">En sucursal</div>
          </div>
        </button>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-[1.5rem] p-6 mb-6">
        <div className="space-y-6">
          <div>
            <label className="text-[9px] text-foreground/40 uppercase tracking-widest font-medium block mb-2">Número de Tarjeta</label>
            <input 
              type="text" 
              placeholder="•••• •••• •••• ••••" 
              className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-foreground/20"
            />
          </div>
          
          <div>
            <label className="text-[9px] text-foreground/40 uppercase tracking-widest font-medium block mb-2">Nombre del Titular</label>
            <input 
              type="text" 
              placeholder="Como aparece en la tarjeta" 
              className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-foreground/20"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[9px] text-foreground/40 uppercase tracking-widest font-medium block mb-2">Vencimiento</label>
              <input 
                type="text" 
                placeholder="MM/AA" 
                className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-foreground/20"
              />
            </div>
            <div>
              <label className="text-[9px] text-foreground/40 uppercase tracking-widest font-medium block mb-2">CVV</label>
              <input 
                type="text" 
                placeholder="•••" 
                className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-foreground/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-[1.5rem] p-6 mb-8 mt-auto">
        <div className="text-[10px] text-foreground/40 uppercase tracking-widest font-medium mb-4">Resumen</div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/80">Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-primary/80">Puntos aplicados</span>
            <span className="text-primary/80">-$0</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-serif text-[26px] text-primary leading-none">${total}</span>
        </div>
      </div>

      <button 
        onClick={() => {
          clearCart();
          navigate('/order-status');
        }}
        className="w-full py-4 bg-gradient-to-r from-[#B08A45] via-[#C5A059] to-[#B08A45] text-background text-[13px] tracking-[0.1em] font-bold rounded-[1rem] flex items-center justify-center gap-2 hover:opacity-90 transition shadow-[0_4px_20px_rgba(197,160,89,0.3)]"
      >
        <Check size={16} strokeWidth={3} />
        PAGAR ${total}
      </button>
    </motion.div>
  );
}
