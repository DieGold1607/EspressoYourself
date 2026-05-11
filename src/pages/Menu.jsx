import { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Plus, X, Minus, Trash2, ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { products, categories } from '../data/products';

export default function Menu() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeCat, setActiveCat] = useState('Todos');
  const { cart, addToCart, updateQty, cartTotal, favorites, toggleFavorite, setIsDrawerOpen, setActiveProduct } = useContext(AppContext);

  const filtered = activeCat === 'Todos' 
    ? products 
    : activeCat === 'Comida'
      ? products.filter(p => ['Repostería', 'Pan Individual', 'Alimentos'].includes(p.category))
      : products.filter(p => p.category === activeCat);

  const total = cartTotal;

  return (
    <motion.div 
      className="min-h-screen px-6 pt-12 pb-32 flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <header className="flex items-center justify-between mb-8 relative h-12">
        <div className="flex flex-col z-10">
          <span className="text-[10px] text-primary/80 uppercase tracking-widest font-medium mb-0.5">Bienvenido</span>
          <span className="text-xl font-medium tracking-wide">Diego</span>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <img src="/logo.png" alt="Espresso Yourself Logo" className="h-20 w-20 object-cover rounded-full border border-primary/20 shadow-[0_0_20px_rgba(197,160,89,0.15)]" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <div style={{ display: 'none' }} className="flex flex-col items-center">
            <h1 className="font-serif text-[13px] tracking-[0.2em] text-primary font-medium whitespace-nowrap">ESPRESSO YOURSELF</h1>
          </div>
        </div>
        
        <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/80 hover:bg-white/5 transition z-10">
          <User size={20} strokeWidth={1.5} />
        </button>
      </header>

      <div className="mb-6 mt-4">
        <h3 className="text-[10px] text-primary/80 uppercase tracking-[0.2em] font-medium mb-2">Carta</h3>
        <h2 className="font-serif text-[32px] text-foreground">Menú de Especialidad</h2>
      </div>

      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        
        <button 
          onClick={() => { if(scrollRef.current) scrollRef.current.scrollBy({ left: -180, behavior: 'smooth' }); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -mt-1 z-20 w-8 h-8 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 flex items-center justify-center text-primary shadow-[0_2px_10px_rgba(0,0,0,0.5)] active:scale-95 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button 
          onClick={() => { if(scrollRef.current) scrollRef.current.scrollBy({ left: 180, behavior: 'smooth' }); }}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mt-1 z-20 w-8 h-8 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 flex items-center justify-center text-primary shadow-[0_2px_10px_rgba(0,0,0,0.5)] active:scale-95 transition"
        >
          <ChevronRight size={18} />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition border ${
                activeCat === cat 
                  ? 'bg-[#B08A45] border-[#B08A45] text-background font-medium' 
                  : 'bg-transparent border-white/10 text-foreground/60 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#151515] rounded-[1.2rem] p-4 flex flex-col border border-white/5 relative"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                className="absolute top-3 right-3 p-2 text-primary/40 hover:text-primary transition z-10"
              >
                <Heart size={16} fill={favorites.includes(item.id) ? "currentColor" : "none"} className={favorites.includes(item.id) ? "text-primary" : ""} />
              </button>
              
              <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center text-2xl mb-4 border border-white/5 shrink-0">
                {item.icon}
              </div>
              
              <h4 className="font-serif text-base mb-1 pr-4">{item.name}</h4>
              <p className="text-[10px] text-foreground/50 leading-relaxed mb-4 flex-grow">{item.desc}</p>
              
              {item.options.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.options.map(opt => (
                    <span key={opt} className="px-2 py-1 rounded-full border border-white/10 text-[9px] text-foreground/60">
                      {opt}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-end mt-auto pt-2">
                <span className="font-serif text-xl text-primary">${item.price}</span>
                <button 
                  onClick={() => setActiveProduct(item)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B08A45] to-[#C5A059] flex items-center justify-center text-background hover:opacity-90 active:scale-95 transition shadow-[0_2px_10px_rgba(197,160,89,0.2)]"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
