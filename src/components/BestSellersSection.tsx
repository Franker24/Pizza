import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, Phone, ShoppingBag, Sparkles, Flame, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';

interface BestSellersSectionProps {
  onSelectItemToCustomize: (item: MenuItem) => void;
  onQuickAdd?: (item: MenuItem) => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  onSelectItemToCustomize,
  onQuickAdd,
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Find or create the best-seller pizzas matching the user's reference image
  const bestSellers: Array<{
    item: MenuItem;
    ingredientsText: string;
    plateImage: string;
    displayPrice: string;
  }> = [
    {
      item: MENU_ITEMS.find((m) => m.id === 'pizza-4-carni') || {
        id: 'pizza-4-carni',
        name: 'Pizza 4 Carni',
        description: 'Salsa tomate, mozzarella, champiñones, chistorra, lomo ahumado, jamón cocido, salami, cebolla y aceitunas negras.',
        price: 19800,
        priceDisplay: '€11.50',
        category: 'pizzas',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
      },
      ingredientsText: 'salsa tomate, mozzarella, champiñones, chistorra, lomo ahumado, jamón cocido, salami, cebolla, aceitunas',
      plateImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
      displayPrice: '€11.50',
    },
    {
      item: MENU_ITEMS.find((m) => m.id === 'pizza-hot') || {
        id: 'pizza-hot',
        name: 'Pizza Hot',
        description: 'Salsa tomate, mozzarella, champiñones, lomo ahumado, maíz dulce, jalapeños al fuego, cebolla y aceitunas negras.',
        price: 20500,
        priceDisplay: '€12.00',
        category: 'pizzas',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
      },
      ingredientsText: 'salsa tomate, mozzarella, champiñones, lomo ahumado, maíz, jalapeño, cebolla, aceitunas',
      plateImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
      displayPrice: '€12.00',
    },
    {
      item: MENU_ITEMS.find((m) => m.id === 'margherita-clasica') || {
        id: 'margherita-clasica',
        name: 'Pizza Margherita',
        description: 'Salsa de tomate, mozzarella fior di latte hilada, aceitunas negras y albahaca fresca.',
        price: 15500,
        priceDisplay: '€8.50',
        category: 'pizzas',
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop',
      },
      ingredientsText: 'salsa tomate, mozzarella, aceitunas',
      plateImage: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop',
      displayPrice: '€8.50',
    },
  ];

  return (
    <section className="relative w-full bg-[#FAF7F2] py-14 sm:py-20 border-b border-[#E5DEC9] select-none text-[#181614] overflow-hidden">
      
      {/* Background subtle noise and pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(#b8ad98 0.75px, transparent 0.75px), radial-gradient(#b8ad98 0.75px, #FAF7F2 0.75px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER MATCHING masvendidas.png                                   */}
        {/* ========================================================================= */}
        <div className="text-center space-y-2">
          {/* Main Title: Woodblock / Textured Vintage Red */}
          <h2 className="font-['Bebas_Neue',Impact,sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#C92A1D] tracking-[0.06em] uppercase drop-shadow-sm font-normal leading-none">
            LAS PIZZAS MÁS VENDIDAS
          </h2>

          {/* Subtitle: Typewriter / Slab Uppercase */}
          <p className="font-serif font-black text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase text-[#1B1917]">
            DISPONIBLES PARA TOMAR / PARA LLEVAR
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PIZZAS CARDS GRID (EXACT LAYOUT AND STYLE OF masvendidas.png)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {bestSellers.map((bs) => {
            const isFav = !!favorites[bs.item.id];

            return (
              <div
                key={bs.item.id}
                className="bg-white rounded-2xl border border-[#E8DEC9] shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group"
              >
                {/* Plate and Image Container */}
                <div className="relative aspect-square w-full rounded-2xl bg-neutral-100/70 border border-neutral-200/80 flex items-center justify-center p-3 sm:p-4 overflow-hidden shadow-inner">
                  
                  {/* Top-Left Cocoa Price Pill Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-[#32231A] text-white font-bold text-xs sm:text-sm px-2.5 py-1 rounded-md shadow-md tracking-tight font-mono">
                    {bs.displayPrice}
                  </div>

                  {/* Circular White Plate with Round Pizza */}
                  <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-br from-white via-neutral-100 to-neutral-200 shadow-md border-4 border-white flex items-center justify-center overflow-hidden">
                    <img
                      src={bs.plateImage}
                      alt={bs.item.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Bottom-Right Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleFavorite(bs.item.id, e)}
                    className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-neutral-700 hover:text-[#C92A1D] border border-neutral-300 shadow-md flex items-center justify-center transition-colors active:scale-90"
                    title="Guardar en favoritos"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-[#C92A1D] text-[#C92A1D]' : 'stroke-neutral-700'
                      }`}
                    />
                  </button>
                </div>

                {/* Details Section */}
                <div className="pt-5 flex flex-col items-center text-center space-y-3">
                  {/* Pizza Name */}
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#181614] group-hover:text-[#C92A1D] transition-colors">
                    {bs.item.name}
                  </h3>

                  {/* Ingredients in Parentheses */}
                  <p className="text-xs sm:text-[13px] text-neutral-600 font-serif italic max-w-xs leading-relaxed px-2">
                    ({bs.ingredientsText})
                  </p>

                  {/* Availability Badge */}
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 pt-1">
                    <span className="text-[#C92A1D] font-extrabold tracking-tight">»</span>
                    <span>Disponible</span>
                    <span className="text-neutral-700 font-extrabold">SOLO EN TIENDA O POR TELÉFONO</span>
                  </div>

                  {/* Order Button (Capsule Style) */}
                  <div className="pt-2 w-full flex items-center justify-center">
                    <button
                      onClick={() => onSelectItemToCustomize(bs.item)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full border border-neutral-400/80 bg-white hover:bg-[#C92A1D] text-neutral-800 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-sm hover:shadow hover:border-[#C92A1D] active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>PEDIR AHORA</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Link to Dedicated Full Menu Page */}
        <div className="text-center my-6">
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 bg-[#E52421] hover:bg-[#c91d1a] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-full shadow-lg shadow-[#E52421]/25 transition-transform duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Ver toda la Carta y Variedades de Pizzas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Phone & Takeaway Direct Bar */}
        <div className="bg-white/80 border border-[#E8DEC9] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C92A1D]/10 text-[#C92A1D] flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#181614]">
                ¿Querés pedir por teléfono o retirar caliente?
              </h4>
              <p className="text-xs text-neutral-600">
                Llamanos directo al <strong className="text-[#C92A1D]">{RESTAURANT_INFO.phoneDisplay}</strong> o hacé tu pedido por la web.
              </p>
            </div>
          </div>

          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="inline-flex items-center gap-2 bg-[#181614] hover:bg-[#C92A1D] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors flex-shrink-0 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Llamar al {RESTAURANT_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default BestSellersSection;
