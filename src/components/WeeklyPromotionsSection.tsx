import React, { useState } from 'react';
import { Tag, Sparkles, ShoppingBag, MessageSquare, Check, ArrowRight, Clock, Star } from 'lucide-react';
import { MenuItem } from '../types';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/menuData';

interface WeeklyPromotionsSectionProps {
  onAddToCart?: (
    item: MenuItem,
    quantity?: number,
    selectedExtras?: any[],
    notes?: string,
    unitPriceWithExtras?: number,
    totalPrice?: number
  ) => void;
  onOpenCart?: () => void;
}

interface PromoDay {
  id: string;
  dayName: string;
  bannerTitle: string;
  highlightText?: string;
  image: string;
  priceDisplay: string;
  originalPriceDisplay?: string;
  description: string;
  cartEquivalentItem: MenuItem;
}

export const WeeklyPromotionsSection: React.FC<WeeklyPromotionsSectionProps> = ({
  onAddToCart,
  onOpenCart,
}) => {
  const [selectedDayTab, setSelectedDayTab] = useState<'todos' | 'semana' | 'finde'>('todos');

  // Promos accurately constructed from the user's reference image
  const promotions: PromoDay[] = [
    {
      id: 'promo-lunes',
      dayName: 'Lunes',
      bannerTitle: 'Pedí una pizza chica y ¡llevate una grande!',
      image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
      priceDisplay: '€14.50',
      originalPriceDisplay: '€23.00',
      description: 'Llevate 1 Pizza Grande Muzzarella Clásica al precio de la chica. Masa a la piedra y horno a leña.',
      cartEquivalentItem: {
        id: 'promo-lunes-2x1',
        name: 'Promo Lunes: Pizza Chica + Grande',
        description: 'Pedí una pizza chica y llevate una grande gratis. Masa a la piedra y horno a leña.',
        price: 21500,
        priceDisplay: '€14.50',
        category: 'combos',
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
        tags: ['Promo Lunes', '2x1'],
        badge: 'Promo Lunes',
      },
    },
    {
      id: 'promo-martes',
      dayName: 'Martes',
      bannerTitle: 'Pedí 4 empanadas y pagá 3.',
      highlightText: '• Las más ricas •',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop',
      priceDisplay: '€9.00',
      originalPriceDisplay: '€12.00',
      description: '4 empanadas criollas al horno de leña (carne cortada a cuchillo o humita) abonando solo 3.',
      cartEquivalentItem: {
        id: 'promo-martes-empanadas',
        name: 'Promo Martes: 4 Empanadas (Paga 3)',
        description: '4 empanadas criollas artesanales al horno de quebracho al precio de 3.',
        price: 9600,
        priceDisplay: '€9.00',
        category: 'combos',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop',
        tags: ['Promo Martes', '4x3'],
        badge: 'Promo Martes',
      },
    },
    {
      id: 'promo-miercoles',
      dayName: 'Miércoles',
      bannerTitle: 'Comprá 1 pizza grande y llevá 3 porciones de fainá de regalo.',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
      priceDisplay: '€13.50',
      originalPriceDisplay: '€18.50',
      description: 'Tu pizza grande favorita a la piedra más 3 porciones doradas y crocantes de fainá de cortesía.',
      cartEquivalentItem: {
        id: 'promo-miercoles-faina',
        name: 'Promo Miércoles: Pizza Grande + 3 Fainás Gratis',
        description: 'Comprá 1 pizza grande a elección y te regalamos 3 porciones de fainá recién horneada.',
        price: 20000,
        priceDisplay: '€13.50',
        category: 'combos',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
        tags: ['Promo Miércoles', 'Fainá Gratis'],
        badge: 'Promo Miércoles',
      },
    },
  ];

  const handleClaimPromo = (promo: PromoDay) => {
    if (onAddToCart) {
      onAddToCart(promo.cartEquivalentItem, 1, [], `Promo ${promo.dayName}: ${promo.bannerTitle}`);
    }
    if (onOpenCart) {
      onOpenCart();
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#0A3D35] via-[#08332C] to-[#0A3D35] text-white py-16 sm:py-24 overflow-hidden border-y border-[#0E4F44]">
      
      {/* Background SVG doodle pattern of pizza, cheese, tomatoes and herbs */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #4ECCA3 1px, transparent 1px), radial-gradient(circle at 80% 70%, #4ECCA3 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* TOP RIBBON HEADER: "Promociones Destacadas" (FROM Promociones.png)         */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          
          {/* Classic White Banner Ribbon with Notched Ends */}
          <div className="relative inline-block">
            {/* Left Ribbon Tail */}
            <div 
              className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-8 h-10 sm:h-12 bg-white"
              style={{
                clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
              }}
            />
            {/* Right Ribbon Tail */}
            <div 
              className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-8 h-10 sm:h-12 bg-white"
              style={{
                clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
              }}
            />

            {/* Central Ribbon Body */}
            <div className="bg-white text-[#181614] px-8 sm:px-14 py-2 sm:py-3 shadow-2xl border-y border-neutral-200">
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#181614] drop-shadow-sm">
                Promociones Destacadas
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#A3D9CE] font-serif max-w-lg mt-2">
            Aprovechá nuestras promociones diarias exclusivas para retirar por sucursal o disfrutar en salón.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3 PROMOTION CARDS (LUNES, MARTES, MIÉRCOLES)                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative bg-[#161717] rounded-3xl border border-[#1E4D44] shadow-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden group hover:border-[#F9BA15] transition-all duration-300"
            >
              {/* Top White Tab with Day Name (Lunes / Martes / Miércoles) */}
              <div className="absolute top-0 left-6 z-20">
                <div 
                  className="bg-white text-[#181614] font-serif font-bold text-sm sm:text-base px-6 py-1.5 shadow-md"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 88% 100%, 0% 100%)',
                  }}
                >
                  {promo.dayName}
                </div>
              </div>

              {/* Space for top tab */}
              <div className="pt-8 space-y-4">
                
                {/* Teal Banner with Promo Offer Text */}
                <div className="relative bg-[#006A5F] text-white px-4 py-3 rounded-xl border border-[#009688]/40 shadow-inner text-center">
                  <p className="font-serif font-bold text-sm sm:text-base leading-snug tracking-tight">
                    {promo.bannerTitle}
                  </p>
                </div>

                {/* Promo Featured Food Image Container */}
                <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-[#234F47] flex items-center justify-center p-3 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={promo.image}
                    alt={promo.bannerTitle}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Ribbon over image (for Martes: • Las más ricas •) */}
                  {promo.highlightText && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#00897B] text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-lg border border-white/30 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#F9BA15]" />
                      <span>{promo.highlightText}</span>
                    </div>
                  )}

                  {/* Price Tag Pill */}
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-white/20">
                    {promo.priceDisplay}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#95C7BD] text-center font-serif leading-relaxed px-2">
                  {promo.description}
                </p>
              </div>

              {/* Bottom Action Button (Amber / Gold matching Promociones.png) */}
              <div className="pt-6">
                <button
                  onClick={() => handleClaimPromo(promo)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#F39C12] hover:bg-[#E67E22] text-[#181614] font-serif font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-[#F39C12]/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pedila en tu sucursal</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Disclaimer Asterisks Note */}
        <div className="text-center pt-2">
          <p className="text-xs sm:text-sm text-[#7EB8AC] font-mono tracking-wide">
            ***Aplica para pago en efectivo o takeaway. Válido en todas las sucursales.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WeeklyPromotionsSection;
