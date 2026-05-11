export const products = [
  // Espresso
  { id: 1, name: 'Cortado de Reserva', desc: 'Espresso doble con leche de origen', price: 65, icon: '☕', category: 'Espresso', options: ['Simple', 'Doble'] },
  { id: 2, name: 'Flat White', desc: 'Microespuma sedosa, ratio 1:2', price: 70, icon: '🥛', category: 'Espresso', options: ['6 oz', '8 oz'] },
  { id: 3, name: 'Espresso Tónico', desc: 'Shot sobre agua tónica premium', price: 75, icon: '🧊', category: 'Espresso', options: [] },
  // Filtrado
  { id: 4, name: 'Pour Over V60', desc: 'Extracción manual 4 minutos', price: 85, icon: '⚗️', category: 'Filtrado', options: ['250 ml', '500 ml'] },
  { id: 5, name: 'Aeropress', desc: 'Cuerpo denso, acidez baja', price: 75, icon: '🔬', category: 'Filtrado', options: [] },
  // Cold Brew
  { id: 6, name: 'Cold Brew 24h', desc: 'Maceración fría de especialidad', price: 80, icon: '🧊', category: 'Cold Brew', options: ['250 ml', '500 ml'] },
  { id: 7, name: 'Nitro Cold Brew', desc: 'Infusión con nitrógeno', price: 95, icon: '💨', category: 'Cold Brew', options: [] },
  // Otros
  { id: 8, name: 'Matcha Ceremonial', desc: 'Grado ceremonial de Uji', price: 75, icon: '🍵', category: 'Otros', options: ['8 oz', '12 oz'] },
  // Repostería
  { id: 9, name: 'Pastel de Zanahoria', desc: 'Con betún de queso crema', price: 85, icon: '🥕', category: 'Repostería', options: [] },
  { id: 10, name: 'Cheesecake', desc: 'Estilo New York', price: 90, icon: '🍰', category: 'Repostería', options: [] },
  { id: 11, name: 'Pan de Elote', desc: 'Receta tradicional', price: 70, icon: '🌽', category: 'Repostería', options: [] },
  { id: 12, name: 'Tres Leches', desc: 'Esponjoso y húmedo', price: 80, icon: '🥛', category: 'Repostería', options: [] },
  // Pan Individual
  { id: 13, name: 'Pan Español', desc: 'Crujiente por fuera, suave por dentro', price: 45, icon: '🥖', category: 'Pan Individual', options: [] },
  { id: 14, name: 'Ojo de Buey', desc: 'Clásico hojaldre dulce', price: 40, icon: '🥐', category: 'Pan Individual', options: [] },
  { id: 15, name: 'Croissant', desc: 'Mantequilla francesa', price: 55, icon: '🥐', category: 'Pan Individual', options: [] },
  { id: 16, name: 'Pan de Elote Mini', desc: 'Porción individual', price: 35, icon: '🌽', category: 'Pan Individual', options: [] },
  // Alimentos
  { id: 17, name: 'Emparedado de Pollo', desc: 'Tipo Costco, pechuga marinada', price: 120, icon: '🥪', category: 'Alimentos', options: [] },
  { id: 18, name: 'Sandwich de Baguette', desc: 'Tipo español, jamón serrano y queso', price: 130, icon: '🥖', category: 'Alimentos', options: [] },
  { id: 19, name: 'Sandwich Vegetariano', desc: 'Verduras asadas y hummus', price: 110, icon: '🥬', category: 'Alimentos', options: [] }
];

export const categories = ['Todos', 'Comida', 'Espresso', 'Filtrado', 'Cold Brew', 'Otros', 'Repostería', 'Pan Individual', 'Alimentos'];
