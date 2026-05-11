import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cart, updateQty, cartTotal, isDrawerOpen, setIsDrawerOpen } = useContext(AppContext);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 w-full max-w-md bg-[#0A0A0A] rounded-t-[2.5rem] border-t border-white/10 p-6 z-[70] flex flex-col max-h-[85vh]"
          >
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6 shrink-0" />
            
            <div className="flex justify-between items-center mb-8 shrink-0">
              <h2 className="font-serif text-[28px] text-foreground">Tu Orden</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <X size={16} className="text-foreground/60" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-6 scrollbar-hide pb-6">
              {cart.length === 0 ? (
                <p className="text-center text-foreground/50 py-8">Tu carrito está vacío.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-xl border border-white/5 shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      {item.selectedOption && <p className="text-[11px] text-foreground/50">{item.selectedOption}</p>}
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center text-foreground/60 hover:bg-white/5 border border-white/5">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-3 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center text-primary border border-primary/20">
                        <Plus size={12} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-2 w-16 justify-end shrink-0">
                      <span className="font-serif text-primary">${item.price * item.qty}</span>
                      <button onClick={() => updateQty(item.id, -item.qty)} className="text-foreground/30 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/5 mt-auto pb-4 shrink-0">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/60">Total</span>
                  <span className="font-serif text-2xl text-primary">${cartTotal}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/checkout', { state: { total: cartTotal } });
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#B08A45] via-[#C5A059] to-[#B08A45] text-background text-[13px] tracking-[0.1em] font-bold rounded-[1rem] hover:opacity-90 transition shadow-[0_4px_20px_rgba(197,160,89,0.3)]"
                >
                  CONTINUAR AL PAGO • ${cartTotal}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
