import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ContactPage } from './pages/ContactPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { TableReservationModal } from './components/TableReservationModal';
import { PairingAssistantModal } from './components/PairingAssistantModal';
import { MenuItem, CartItem, OrderMode, ExtraOption, OrderDetails, PizzaSize } from './types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [orderMode, setOrderMode] = useState<OrderMode>('delivery');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPairingOpen, setIsPairingOpen] = useState(false);
  const [itemToCustomize, setItemToCustomize] = useState<MenuItem | null>(null);
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleAddToCart = (
    menuItem: MenuItem,
    quantity: number = 1,
    selectedExtras: ExtraOption[] = [],
    notes: string = '',
    unitPriceWithExtras?: number,
    totalPrice?: number,
    selectedSize?: PizzaSize
  ) => {
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const computedUnitPrice = unitPriceWithExtras ?? (menuItem.price + extrasTotal);
    const computedTotalPrice = totalPrice ?? (computedUnitPrice * quantity);

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.menuItem.id === menuItem.id &&
        item.selectedSize === selectedSize &&
        item.notes === notes &&
        JSON.stringify(item.selectedExtras.map((e) => e.id).sort()) ===
          JSON.stringify(selectedExtras.map((e) => e.id).sort())
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const current = updated[existingIndex];
      const newQty = current.quantity + quantity;
      updated[existingIndex] = {
        ...current,
        quantity: newQty,
        totalPrice: current.unitPriceWithExtras * newQty,
      };
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${menuItem.id}-${selectedSize || 'std'}-${Date.now()}-${Math.random()}`,
        menuItem,
        quantity,
        selectedSize,
        selectedExtras,
        notes: notes.trim() || undefined,
        unitPriceWithExtras: computedUnitPrice,
        totalPrice: computedTotalPrice,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
  };

  const handleQuickAdd = (menuItem: MenuItem) => {
    handleAddToCart(menuItem, 1, [], '', menuItem.price, menuItem.price);
  };

  const handleAddComboToCart = (items: MenuItem[]) => {
    items.forEach((item) => {
      handleAddToCart(item, 1, [], 'Sugerencia del Pizzero');
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPriceWithExtras * newQty,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderConfirmed = (order: OrderDetails) => {
    setActiveOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const navigateToSection = (sectionId: string) => {
    if (sectionId === 'menu') {
      navigate('/menu');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#EDE8E1] flex flex-col font-sans selection:bg-[#E52421] selection:text-white">
      <ScrollToTop />

      <Navbar
        orderMode={orderMode}
        setOrderMode={setOrderMode}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenPairing={() => setIsPairingOpen(true)}
        onNavigateToSection={navigateToSection}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSelectItemToCustomize={(item) => setItemToCustomize(item)}
                onQuickAdd={handleQuickAdd}
                onAddToCart={handleAddToCart}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenReservation={() => setIsReservationOpen(true)}
                onOpenPairing={() => setIsPairingOpen(true)}
              />
            }
          />

          <Route
            path="/menu"
            element={
              <MenuPage
                onSelectItemToCustomize={(item) => setItemToCustomize(item)}
                onQuickAdd={handleQuickAdd}
                onAddToCart={handleAddToCart}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenReservation={() => setIsReservationOpen(true)}
                orderMode={orderMode}
                setOrderMode={setOrderMode}
                cartCount={cartCount}
              />
            }
          />

          <Route
            path="/contacto"
            element={
              <ContactPage
                onOpenReservation={() => setIsReservationOpen(true)}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
          />
          <Route path="/contact" element={<Navigate to="/contacto" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-[#E52421] text-white px-5 py-3 rounded-full shadow-2xl shadow-[#E52421]/50 font-bold text-xs"
            id="mobile-floating-cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-2 bg-white text-[#E52421] text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span>Ver Pedido (${cartTotal.toLocaleString('es-AR')})</span>
          </button>
        </div>
      )}

      <FloatingWhatsApp />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        orderMode={orderMode}
        setOrderMode={setOrderMode}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onExploreMenu={() => {
          setIsCartOpen(false);
          navigate('/menu');
        }}
      />

      <ItemCustomizeModal
        item={itemToCustomize}
        onClose={() => setItemToCustomize(null)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderMode={orderMode}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <OrderTrackerModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
      />

      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <PairingAssistantModal
        isOpen={isPairingOpen}
        onClose={() => setIsPairingOpen(false)}
        onAddComboToCart={handleAddComboToCart}
      />
    </div>
  );
}

export default App;
