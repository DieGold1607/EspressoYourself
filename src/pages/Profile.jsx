import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Clock, ChevronLeft, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState('Diego');

  const history = [
    { id: 1, date: 'Hoy, 09:30 AM', items: '1x Flat White, 1x Croissant', total: 125, status: 'Completado' },
    { id: 2, date: 'Ayer, 04:15 PM', items: '1x Espresso Tónico', total: 75, status: 'Completado' },
    { id: 3, date: 'May 8, 10:00 AM', items: '2x Pour Over V60, 1x Pan de Elote', total: 240, status: 'Completado' },
  ];

  return (
    <motion.div 
      className="min-h-screen px-6 pt-12 pb-32 flex flex-col bg-background"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <header className="flex justify-between items-center mb-8 relative">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/80 hover:bg-white/5 transition">
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-xl absolute left-1/2 -translate-x-1/2">Mi Perfil</h2>
        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/80 hover:bg-white/5 transition">
          <Settings size={20} strokeWidth={1.5} />
        </button>
      </header>

      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <User size={40} className="text-primary/60" strokeWidth={1} />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background">
            <span className="text-background font-bold text-xs">V</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-1">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent text-2xl font-serif text-center focus:outline-none w-32 border-b border-dashed border-white/20 pb-1"
          />
        </div>
        <p className="text-primary/80 text-sm tracking-wide">Miembro VIP • Nivel Oro</p>
      </div>

      <div className="bg-[#151515] rounded-[1.5rem] p-6 mb-6 border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Historial de Órdenes
          </h3>
          <button className="text-[10px] text-primary/80 uppercase tracking-widest hover:text-primary transition">Ver Todo</button>
        </div>

        <div className="space-y-4">
          {history.map(order => (
            <div key={order.id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition">
              <div>
                <p className="text-[11px] text-foreground/50 mb-1">{order.date}</p>
                <p className="text-sm font-medium">{order.items}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-serif text-primary">${order.total}</p>
                  <p className="text-[9px] text-green-500 uppercase">{order.status}</p>
                </div>
                <ChevronRight size={16} className="text-foreground/30" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 rounded-xl border border-red-500/20 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/10 transition mt-auto">
        <LogOut size={18} />
        <span className="text-sm font-medium">Cerrar Sesión</span>
      </button>

    </motion.div>
  );
}
