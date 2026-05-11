import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Load from local storage or default to empty
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ey_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ey_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('ey_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ey_cart', JSON.stringify(cart));
  }, [cart]);

  // Favorites logic
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Cart logic
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1, selectedOption: product.options[0] || '' }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(item => item.qty > 0));
  };

  const clearCart = () => setCart([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <AppContext.Provider value={{
      favorites, toggleFavorite,
      cart, addToCart, updateQty, clearCart, cartTotal,
      isDrawerOpen, setIsDrawerOpen,
      activeProduct, setActiveProduct
    }}>
      {children}
    </AppContext.Provider>
  );
}
