import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, ShoppingBag, SlidersHorizontal, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';

interface MinimalHomeShowcaseProps {
  onSelectItemToCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onOpenCart?: () => void;
}

export const MinimalHomeShowcase: React.FC<MinimalHomeShowcaseProps> = ({
  onSelectItemToCustomize,
  onQuickAdd,
  onOpenCart,
}) => {
  const navigate = useNavigate();

  // Curated 4 best-selling artisan pizzas
  const featuredPizzas: MenuItem[] = [
    MENU_ITEMS.find((m) => m.id === 'pepperoni') || MENU_ITEMS[1],
    MENU_ITEMS.find((m) => m.id === 'napolitana') || MENU_ITEMS[2],
    MENU_ITEMS.find((m) => m.id === 'muzzarella-clasica') || MENU_ITEMS[4],
    MENU_ITEMS.find((m) => m.id === 'fugazzeta-con-jamon') || MENU_ITEMS[10],
  ];

  return (
    <div className="w-full bg-[#121110] text-[#EDE8E1] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* 1. Quick Category Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate('/menu?category=pizzas')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
          >
            <span>🍕 Pizzas</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/menu?category=empanadas')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
          >
            <span>🥟 Empanadas</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/menu?category=tartas')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
          >
            <span>🥧 Tartas</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/menu?category=bebidas')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
          >
            <span>🍷 Bebidas</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E52421]/20 hover:bg-[#E52421]/30 border border-[#E52421]/40 text-[#F9BA15] font-black text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
          >
            <span>📜 Lista de Precios</span>
          </button>
        </div>

        {/* 2. Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F9BA15]">
            NUESTRAS FAVORITAS
          </span>
          <h2 className="font-distressed-headline text-2xl sm:text-4xl text-white tracking-wide uppercase">
            LAS PIZZAS MÁS PEDIDAS
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light">
            Elaboradas en horno a la piedra a 485°C con masa de fermentación lenta de 72 horas.
          </p>
        </div>

        {/* 3. Minimalist Product Grid (4 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-[#1C1A18] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#E52421]/50 transition-all duration-300 shadow-lg hover:shadow-[#E52421]/10"
            >
              <div>
                {/* Photo */}
                <div className="relative h-44 w-full overflow-hidden bg-black/40">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {pizza.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#E52421] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                      {pizza.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-base text-white tracking-tight leading-snug line-clamp-1">
                      {pizza.name}
                    </h3>
                    <span className="text-xs font-bold text-[#F9BA15] flex-shrink-0">
                      ${(pizza.price || 28000).toLocaleString('es-AR')}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 font-light line-clamp-2 leading-relaxed min-h-[34px]">
                    {pizza.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => onQuickAdd(pizza)}
                  className="w-full bg-[#E52421] hover:bg-[#BA0C0C] text-white font-extrabold text-xs tracking-wider uppercase py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Pedir Online</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Minimalist Link to Full Menu */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Ver Carta Completa & Pizarra de Precios</span>
            <ArrowRight className="w-4 h-4 text-[#F9BA15]" />
          </button>
        </div>

        {/* 5. Essential Location & Hours Minimalist Banner */}
        <div className="bg-[#181614] border border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="flex flex-col md:flex-row items-center gap-3 pt-4 md:pt-0">
            <div className="p-3 rounded-full bg-white/5 text-[#F9BA15]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-stone-400 font-medium">Ubicación</span>
              <span className="block text-sm font-bold text-white">Calle Madrid, Getafe Centro</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="p-3 rounded-full bg-white/5 text-[#E52421]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-stone-400 font-medium">Horario de Salón & Envíos</span>
              <span className="block text-sm font-bold text-white">Mar - Dom: 19:30 a 00:00 h</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-white/5 text-[#F9BA15]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-stone-400 font-medium">Pedidos Telefónicos</span>
                <span className="block text-sm font-bold text-white">912 77 27 83</span>
              </div>
            </div>

            <a
              href="tel:912772783"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Llamar
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MinimalHomeShowcase;
