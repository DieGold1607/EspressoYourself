import { motion } from 'framer-motion';
import { User, Home as HomeIcon, ShoppingBag, Heart, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen px-6 pt-12 pb-32 flex flex-col gap-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <header className="flex items-center justify-between relative">
        <div className="flex flex-col">
          <span className="text-[10px] text-primary/80 uppercase tracking-widest font-medium mb-0.5">Bienvenido</span>
          <span className="text-xl font-medium tracking-wide">Diego</span>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center">
          <img src="/logo.png" alt="Espresso Yourself Logo" className="h-20 w-20 object-cover rounded-full border border-primary/20 shadow-[0_0_20px_rgba(197,160,89,0.15)]" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <div style={{ display: 'none' }} className="flex flex-col items-center">
            <h1 className="font-serif text-[13px] tracking-[0.2em] text-primary font-medium whitespace-nowrap">ESPRESSO YOURSELF</h1>
          </div>
        </div>
        
        <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/80 hover:bg-white/5 transition">
          <User size={20} strokeWidth={1.5} />
        </button>
      </header>

      {/* VIP Card */}
      <section>
        <div className="vip-card rounded-[2rem] p-7 flex flex-col justify-between aspect-[1.4/1] relative overflow-hidden">
          {/* Subtle glow behind card content */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex justify-between items-start z-10">
            <div>
              <div className="text-[10px] text-primary/80 uppercase tracking-[0.2em] font-medium mb-1">Membresía</div>
              <div className="font-serif text-[28px] text-foreground tracking-wide">Black Reserve</div>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-primary/30 text-primary text-[10px] tracking-widest uppercase">
              VIP
            </div>
          </div>
          
          <div className="space-y-6 z-10 mt-6">
            <div>
              <div className="font-serif text-5xl gold-gradient-text mb-1">2,450</div>
              <div className="text-foreground/50 text-[11px] font-medium tracking-wide mb-4">
                Puntos de Oro • 550 pts para el siguiente nivel
              </div>
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '81%' }}
                  transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full relative"
                >
                  {/* Glow tip */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary/40 blur-sm rounded-full"></div>
                </motion.div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/menu')}
              className="w-full py-4 bg-gradient-to-r from-[#B08A45] via-[#C5A059] to-[#B08A45] text-background text-[13px] tracking-[0.15em] font-semibold rounded-[1rem] flex items-center justify-center hover:opacity-90 transition active:scale-[0.98] shadow-[0_4px_20px_rgba(197,160,89,0.3)]"
            >
              INICIAR EXTRACCIÓN
            </button>
          </div>
        </div>
      </section>

      {/* Tu Actividad */}
      <section className="flex flex-col gap-4 mt-2">
        <h3 className="text-[11px] text-foreground/50 uppercase tracking-[0.2em] font-medium ml-1">Tu Actividad</h3>
        <div className="bg-[#111111] border border-white/5 rounded-[1.5rem] p-6 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col justify-center border-r border-white/5">
            <div className="font-serif text-[26px] text-foreground mb-1">12</div>
            <div className="text-[10px] text-foreground/50 font-medium">Visitas este mes</div>
          </div>
          <div className="flex flex-col justify-center border-r border-white/5">
            <div className="font-serif text-[26px] text-foreground mb-1">Cortado</div>
            <div className="text-[10px] text-foreground/50 font-medium">Bebida favorita</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-serif text-[26px] text-foreground mb-1">2023</div>
            <div className="text-[10px] text-foreground/50 font-medium">Miembro desde</div>
          </div>
        </div>
      </section>

      {/* Acceso Rápido */}
      <section className="flex flex-col gap-4 mt-2">
        <h3 className="text-[11px] text-foreground/50 uppercase tracking-[0.2em] font-medium ml-1">Acceso Rápido</h3>
        <div className="h-32 rounded-[1.5rem] border border-dashed border-white/10 flex items-center justify-center bg-[#111111]/30">
          <span className="text-xs text-foreground/30 font-medium">Menú de productos — próximamente</span>
        </div>
      </section>

    </motion.div>
  );
}
