import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuSection } from '../components/MenuSection';
import { Footer } from '../components/Footer';
import { MenuItem, OrderMode, ExtraOption, PizzaSize } from '../types';

interface MenuPageProps {
  onSelectItemToCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onAddToCart?: (
    menuItem: MenuItem,
    quantity?: number,
    selectedExtras?: ExtraOption[],
    notes?: string,
    unitPriceWithExtras?: number,
    totalPrice?: number,
    selectedSize?: PizzaSize
  ) => void;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  orderMode: OrderMode;
  setOrderMode: (mode: OrderMode) => void;
  cartCount: number;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onSelectItemToCustomize,
  onQuickAdd,
  onAddToCart,
  onOpenCart,
  onOpenReservation,
  orderMode,
  setOrderMode,
  cartCount,
}) => {
  const navigate = useNavigate();

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col">
      
      {/* Main Menu Experience (matching Image 1 & Image 2) */}
      <main className="flex-1">
        <MenuSection
          onSelectItemToCustomize={onSelectItemToCustomize}
          onQuickAdd={onQuickAdd}
          onAddToCart={onAddToCart}
          onOpenCart={onOpenCart}
          isStandalonePage={true}
        />
      </main>

      {/* Footer on Menu Page */}
      <Footer
        onOpenReservation={onOpenReservation}
        onExploreMenu={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenCart={onOpenCart}
      />

    </div>
  );
};

export default MenuPage;
