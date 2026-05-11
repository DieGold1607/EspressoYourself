import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, setActiveProduct } = useContext(AppContext);
  
  const favoriteItems = products.filter(p => favorites.includes(p.id));

  return (
    <motion.div 
      className="min-h-screen px-6 pt-12 pb-32 flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <header className="flex flex-col mb-4">
        <h3 className="text-[10px] text-primary/80 uppercase tracking-[0.2em] font-medium mb-2">Tus selecciones</h3>
        <h2 className="font-serif text-[32px] text-foreground">Favoritos</h2>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {favoriteItems.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-foreground/40 text-sm">
              No tienes ningún favorito aún.<br/> Toca el corazón en el menú para añadirlos.
            </div>
          ) : (
            favoriteItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#151515] rounded-[1.2rem] p-4 flex flex-col border border-white/5 relative"
              >
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 p-2 text-primary transition z-10"
                >
                  <Heart size={16} fill="currentColor" />
                </button>
                
                <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center text-2xl mb-4 border border-white/5 shrink-0">
                  {item.icon}
                </div>
                
                <h4 className="font-serif text-base mb-1 pr-6">{item.name}</h4>
                <p className="text-[10px] text-foreground/50 leading-relaxed mb-4 flex-grow">{item.desc}</p>
                
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
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
