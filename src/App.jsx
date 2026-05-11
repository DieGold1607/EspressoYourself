import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';
import Wallet from './pages/Wallet';
import Favorites from './pages/Favorites';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import ProductCustomizer from './components/ProductCustomizer';
import Profile from './pages/Profile';
import { AppProvider } from './context/AppContext';

function App() {
  const location = useLocation();
  const showBottomNav = !['/checkout', '/order-status'].includes(location.pathname);

  return (
    <AppProvider>
      <div className="max-w-md mx-auto relative w-full bg-background text-foreground min-h-screen font-sans antialiased overflow-x-hidden selection:bg-primary/30">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
        {showBottomNav && <BottomNav />}
        <CartDrawer />
        <ProductCustomizer />
      </div>
    </AppProvider>
  );
}

export default App;
