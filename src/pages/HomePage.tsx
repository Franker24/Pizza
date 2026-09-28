import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MinimalHero } from '../components/MinimalHero';
import { PizzaScrollExperience } from '../components/PizzaScrollExperience';
import { ProductCategoriesBanner } from '../components/ProductCategoriesBanner';
import { BestSellersSection } from '../components/BestSellersSection';
import { WeeklyPromotionsSection } from '../components/WeeklyPromotionsSection';
import { StoryAndPhilosophy } from '../components/StoryAndPhilosophy';
import { Footer } from '../components/Footer';
import { MenuItem, ExtraOption } from '../types';

interface HomePageProps {
  onSelectItemToCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onAddToCart: (
    menuItem: MenuItem,
    quantity?: number,
    selectedExtras?: ExtraOption[],
    notes?: string,
    unitPriceWithExtras?: number,
    totalPrice?: number
  ) => void;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenPairing: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectItemToCustomize,
  onQuickAdd,
  onAddToCart,
  onOpenCart,
  onOpenReservation,
  onOpenPairing,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. Animated Hero matching home2.png with Distressed Stamp Typography & Central Animated Button */}
      <MinimalHero
        onOrderNow={() => navigate('/menu')}
      />

      {/* 2. Interactive Mozzarella Stretch Scrollytelling (Desktop only, hidden on mobile for faster UX) */}
      <div className="hidden md:block">
        <PizzaScrollExperience
          onExploreMenu={() => navigate('/menu')}
        />
      </div>

      {/* 3. Product Categories Carousel - Navigates directly to /menu?category=... */}
      <ProductCategoriesBanner
        onSelectCategory={(catId) => navigate(`/menu?category=${catId}`)}
      />

      {/* 4. Best Sellers Showcase */}
      <BestSellersSection
        onSelectItemToCustomize={onSelectItemToCustomize}
        onQuickAdd={onQuickAdd}
      />

      {/* 5. Weekly Promotions Section */}
      <WeeklyPromotionsSection
        onAddToCart={onAddToCart}
        onOpenCart={onOpenCart}
      />

      {/* 6. Philosophy, Craftsmanship & Wood Oven */}
      <StoryAndPhilosophy />

      {/* 7. Footer on Home */}
      <Footer
        onOpenReservation={onOpenReservation}
        onExploreMenu={() => navigate('/menu')}
        onOpenCart={onOpenCart}
      />
    </>
  );
};

export default HomePage;

