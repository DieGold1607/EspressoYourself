import { motion } from 'framer-motion';
import { Wallet as WalletIcon, CreditCard, ChevronRight, Plus } from 'lucide-react';

export default function Wallet() {
  return (
    <motion.div 
      className="min-h-screen px-6 pt-12 pb-32 flex flex-col gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <header className="flex flex-col mb-4">
        <h3 className="text-[10px] text-primary/80 uppercase tracking-[0.2em] font-medium mb-2">Finanzas</h3>
        <h2 className="font-serif text-[32px] text-foreground">Billetera</h2>
      </header>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[2rem] p-6 border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <WalletIcon size={20} />
          </div>
          <span className="text-sm font-medium text-foreground/80">Saldo disponible</span>
        </div>
        
        <div className="font-serif text-5xl text-white mb-2">$450.00</div>
        <div className="text-xs text-foreground/50">Expira en 60 días</div>
        
        <button className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2">
          <Plus size={16} />
          Añadir fondos
        </button>
      </div>

      {/* Payment Methods */}
      <section>
        <h3 className="text-[11px] text-foreground/50 uppercase tracking-[0.2em] font-medium mb-4 ml-1">Métodos de Pago</h3>
        
        <div className="space-y-3">
          <div className="bg-[#111] border border-white/5 rounded-[1.5rem] p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <CreditCard size={20} className="text-white/60" />
              </div>
              <div>
                <div className="text-sm font-medium">Apple Pay</div>
                <div className="text-[10px] text-foreground/50">Conectado</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-foreground/30" />
          </div>

          <div className="bg-[#111] border border-white/5 rounded-[1.5rem] p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-orange-500/80 -ml-1.5"></div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">•••• 4242</div>
                <div className="text-[10px] text-foreground/50">Mastercard</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-foreground/30" />
          </div>
        </div>
      </section>

      {/* History */}
      <section>
        <h3 className="text-[11px] text-foreground/50 uppercase tracking-[0.2em] font-medium mb-4 ml-1">Movimientos Recientes</h3>
        <div className="text-center py-10 bg-[#111]/30 rounded-[1.5rem] border border-dashed border-white/5">
          <p className="text-xs text-foreground/40">No hay movimientos recientes.</p>
        </div>
      </section>
    </motion.div>
  );
}
