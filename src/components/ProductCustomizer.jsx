import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function ProductCustomizer() {
  const { activeProduct, setActiveProduct, addToCart, setIsDrawerOpen } = useContext(AppContext);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMilk, setSelectedMilk] = useState('Entera');
  const [selectedTemp, setSelectedTemp] = useState('Caliente');

  useEffect(() => {
    if (activeProduct) {
      setSelectedSize(activeProduct.options?.[0] || '');
      setSelectedMilk('Entera');
      setSelectedTemp('Caliente');
    }
  }, [activeProduct]);

  if (!activeProduct) return null;

  const isCoffee = activeProduct.category === 'Espresso' || activeProduct.category === 'Filtrado' || activeProduct.category === 'Cold Brew' || activeProduct.category === 'Otros';

  const handleAdd = () => {
    // Generate a unique option string based on selections
    let optionStr = selectedSize;
    if (isCoffee) {
      optionStr += optionStr ? ` • ${selectedMilk} • ${selectedTemp}` : `${selectedMilk} • ${selectedTemp}`;
    }
    
    addToCart({
      ...activeProduct,
      options: [optionStr] // Pass the combined string as the only option so it saves correctly
    });
    
    setActiveProduct(null);
    setIsDrawerOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={() => setActiveProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
      />
      <motion.div 
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 w-full max-w-md bg-[#0A0A0A] rounded-t-[2.5rem] border-t border-white/10 p-6 z-[90] flex flex-col max-h-[90vh]"
      >
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6 shrink-0" />
        
        <div className="flex justify-between items-start mb-6 shrink-0">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-3xl border border-white/5 shrink-0">
              {activeProduct.icon}
            </div>
            <div>
              <h2 className="font-serif text-[22px] text-foreground leading-tight mb-1">{activeProduct.name}</h2>
              <div className="font-serif text-lg text-primary">${activeProduct.price}</div>
            </div>
          </div>
          <button onClick={() => setActiveProduct(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mt-1">
            <X size={16} className="text-foreground/60" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-8 scrollbar-hide pb-6">
          
          {/* Size / Variant Options */}
          {activeProduct.options && activeProduct.options.length > 0 && (
            <div>
              <h3 className="text-[11px] text-foreground/50 uppercase tracking-[0.2em] font-medium mb-3">Variante</h3>
              <div className="grid grid-cols-2 gap-3">
                {activeProduct.options.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelectedSize(opt)}
                    className={`py-3 rounded-xl border transition text-sm font-medium ${selectedSize === opt ? 'bg-[#1A1A1A] border-primary text-primary' : 'bg-[#111] border-white/5 text-foreground/70'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Coffee Specific Options */}
          {isCoffee && (
            <>
              <div>
                <h3 className="text-[11px] text-foreground/50 uppercase tracking-[0.2em] font-medium mb-3">Temperatura</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Caliente', 'Frío (Hielo)'].map(temp => (
                    <button 
                      key={temp}
                      onClick={() => setSelectedTemp(temp)}
                      className={`py-3 rounded-xl border transition text-sm font-medium ${selectedTemp === temp ? 'bg-[#1A1A1A] border-primary text-primary' : 'bg-[#111] border-white/5 text-foreground/70'}`}
                    >
                      {temp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] text-foreground/50 uppercase tracking-[0.2em] font-medium mb-3">Tipo de Leche</h3>
                <div className="space-y-2">
                  {['Entera', 'Deslactosada', 'Avena (+ $10)', 'Almendra (+ $10)'].map(milk => (
                    <button 
                      key={milk}
                      onClick={() => setSelectedMilk(milk)}
                      className={`w-full py-3 px-4 rounded-xl border transition flex justify-between items-center text-sm font-medium ${selectedMilk === milk ? 'bg-[#1A1A1A] border-primary text-primary' : 'bg-[#111] border-white/5 text-foreground/70'}`}
                    >
                      {milk}
                      {selectedMilk === milk && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        <div className="pt-6 border-t border-white/5 mt-auto pb-4 shrink-0">
          <button 
            onClick={handleAdd}
            className="w-full py-4 bg-gradient-to-r from-[#B08A45] via-[#C5A059] to-[#B08A45] text-background text-[13px] tracking-[0.1em] font-bold rounded-[1rem] hover:opacity-90 transition shadow-[0_4px_20px_rgba(197,160,89,0.3)] flex items-center justify-center gap-2"
          >
            AGREGAR A LA ORDEN
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
