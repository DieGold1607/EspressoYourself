import { Home as HomeIcon, Search, ShoppingBag, Heart, Wallet } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setIsDrawerOpen } = useContext(AppContext);

  const isHome = location.pathname === '/';
  const isMenu = location.pathname === '/menu';
  const isFavorites = location.pathname === '/favorites';
  const isWallet = location.pathname === '/wallet';

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="fixed bottom-6 ml-6 w-[calc(100%-3rem)] max-w-[calc(28rem-3rem)] bg-[#111111] border border-white/5 rounded-full p-2 flex justify-between items-center z-50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center justify-center gap-1 w-1/5 py-2.5 rounded-[2rem] transition ${isHome ? 'bg-[#A38144] text-background' : 'text-foreground/40 hover:text-foreground/80'}`}
      >
        <HomeIcon size={20} strokeWidth={isHome ? 2 : 1.5} />
        <span className={`text-[9px] ${isHome ? 'font-semibold tracking-wide' : 'font-medium'}`}>Inicio</span>
      </button>
      
      <button 
        onClick={() => navigate('/menu')}
        className={`flex flex-col items-center justify-center gap-1 w-1/5 py-2.5 rounded-[2rem] transition relative ${isMenu ? 'bg-[#A38144] text-background' : 'text-foreground/40 hover:text-foreground/80'}`}
      >
        <Search size={20} strokeWidth={isMenu ? 2 : 1.5} />
        <span className={`text-[9px] ${isMenu ? 'font-semibold tracking-wide' : 'font-medium'}`}>Menú</span>
      </button>

      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="flex flex-col items-center justify-center gap-1 w-1/5 py-2.5 rounded-[2rem] transition relative text-foreground/40 hover:text-foreground/80"
      >
        <div className="relative">
          <ShoppingBag size={20} strokeWidth={1.5} />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#C5A059] rounded-full flex items-center justify-center text-[9px] font-bold text-[#0A0A0A] shadow-[0_0_10px_rgba(197,160,89,0.5)]"
              >
                {totalItems}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-[9px] font-medium">Orden</span>
      </button>
      
      <button 
        onClick={() => navigate('/favorites')}
        className={`flex flex-col items-center justify-center gap-1 w-1/5 py-2.5 rounded-[2rem] transition ${isFavorites ? 'bg-[#A38144] text-background' : 'text-foreground/40 hover:text-foreground/80'}`}
      >
        <Heart size={20} strokeWidth={isFavorites ? 2 : 1.5} />
        <span className={`text-[9px] ${isFavorites ? 'font-semibold tracking-wide' : 'font-medium'}`}>Favoritos</span>
      </button>
      
      <button 
        onClick={() => navigate('/wallet')}
        className={`flex flex-col items-center justify-center gap-1 w-1/5 py-2.5 rounded-[2rem] transition ${isWallet ? 'bg-[#A38144] text-background' : 'text-foreground/40 hover:text-foreground/80'}`}
      >
        <Wallet size={20} strokeWidth={isWallet ? 2 : 1.5} />
        <span className={`text-[9px] ${isWallet ? 'font-semibold tracking-wide' : 'font-medium'}`}>Billetera</span>
      </button>
    </nav>
  );
}
