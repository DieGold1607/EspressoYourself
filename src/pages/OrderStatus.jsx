import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Coffee, Package, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderStatus() {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(0); // 0: Confirmed, 1: Preparing, 2: Ready

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        const next = prev + 1;
        if (next === 3) setStatus(1);
        if (next === 8) setStatus(2);
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const steps = [
    { id: 0, title: 'Orden confirmada', desc: 'Tu pago fue procesado', icon: CheckCircle2 },
    { id: 1, title: 'Preparando', desc: 'El barista está moliendo el grano', icon: Coffee },
    { id: 2, title: 'Listo para recoger', desc: 'Tu orden te espera en barra', icon: Package }
  ];

  return (
    <motion.div 
      className="min-h-screen px-8 pt-16 pb-32 flex flex-col items-center bg-[#050505]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-[10px] text-primary/80 uppercase tracking-[0.2em] font-medium mb-10">
        ORDEN #EY-2025-084
      </div>

      {/* Main Icon */}
      <motion.div 
        className={`w-32 h-32 rounded-full flex items-center justify-center border mb-10 transition-colors duration-700 relative ${status === 2 ? 'border-primary bg-primary/10' : 'border-white/10 bg-[#111]'}`}
        animate={status === 2 ? { scale: [1, 1.1, 1] } : {}}
      >
        {/* Glow effect */}
        {status === 2 && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
        {status === 2 ? (
          <Check size={48} className="text-primary" strokeWidth={1.5} />
        ) : (
          <Coffee size={48} className="text-primary/70" strokeWidth={1.5} />
        )}
      </motion.div>

      {/* Title and Time/Code */}
      <div className="text-center mb-16 h-32">
        <h2 className="font-serif text-3xl text-foreground mb-4">
          {status === 2 ? '¡Listo para recoger!' : 'Preparando tu orden'}
        </h2>
        
        {status === 2 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-foreground/60 mb-6">Pasa por barra y muestra este código</p>
            <div className="border border-primary/20 rounded-[1.5rem] px-12 py-4 bg-[#111] shadow-[0_0_20px_rgba(197,160,89,0.1)]">
              <div className="text-[9px] text-foreground/50 uppercase tracking-[0.2em] mb-2">Código de Recogida</div>
              <div className="font-serif text-5xl text-primary tracking-widest">084</div>
            </div>
          </motion.div>
        ) : (
          <p className="text-base text-foreground/60">
            Tiempo en espera: <span className="text-foreground">{formatTime(time)}</span>
          </p>
        )}
      </div>

      {/* Timeline */}
      <div className="w-full max-w-sm mt-auto relative">
        <div className="absolute left-[1.3rem] top-8 bottom-8 w-[1px] bg-white/5" />
        <motion.div 
          className="absolute left-[1.3rem] top-8 w-[1px] bg-primary/50 transition-all duration-1000 origin-top"
          style={{ height: status === 0 ? '0%' : status === 1 ? '50%' : '100%' }}
        />

        <div className="space-y-8 relative z-10">
          {steps.map((step, i) => {
            const isActive = status >= step.id;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="flex items-center gap-5">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-500 bg-[#0A0A0A] ${isActive ? 'border border-primary text-primary shadow-[0_0_15px_rgba(197,160,89,0.2)]' : 'border border-white/5 text-foreground/30'}`}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className={`font-medium text-sm transition-colors duration-500 ${isActive ? 'text-white' : 'text-foreground/40'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-foreground/40 mt-1">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {status === 2 && (
        <motion.button 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          onClick={() => navigate('/')}
          className="mt-16 w-full max-w-sm py-4 bg-white/5 border border-white/10 text-foreground text-[13px] tracking-[0.1em] font-semibold rounded-[1rem] hover:bg-white/10 transition"
        >
          VOLVER AL INICIO
        </motion.button>
      )}
    </motion.div>
  );
}
