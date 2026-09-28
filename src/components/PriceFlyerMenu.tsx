import React, { useState } from 'react';
import { ShoppingBag, Check, Printer, Sparkles, Plus, ArrowRight, Percent, Info } from 'lucide-react';
import { MenuItem, PizzaSize } from '../types';

interface PriceFlyerMenuProps {
  onAddToCart: (
    item: MenuItem,
    size?: PizzaSize,
    customPrice?: number
  ) => void;
  onOpenCart?: () => void;
  onSwitchToVisual?: () => void;
}

interface FlyerItem {
  id: string;
  name: string;
  description?: string;
  isNew?: boolean;
  prices: {
    porcion?: number;
    chica?: number;
    grande?: number;
  };
}

const CLASICAS_ITEMS: FlyerItem[] = [
  {
    id: 'muzzarella-clasica',
    name: 'MUZZARELLA',
    prices: { porcion: 3600, chica: 26000, grande: 28000 },
  },
  {
    id: 'muzza-jamon-o-morrones',
    name: 'MUZZARELLA con JAMÓN o MORRONES',
    prices: { porcion: 4600, chica: 28000, grande: 34000 },
  },
  {
    id: 'muzza-jamon-y-morrones',
    name: 'MUZZARELLA con JAMÓN y MORRONES',
    prices: { porcion: 5000, chica: 30000, grande: 38000 },
  },
  {
    id: 'fugazza',
    name: 'FUGAZZA',
    prices: { porcion: 2800, chica: 13000, grande: 18000 },
  },
  {
    id: 'fugarella',
    name: 'FUGARELLA',
    prices: { porcion: 4000, chica: 26000, grande: 31000 },
  },
  {
    id: 'anchoas',
    name: 'ANCHOAS',
    prices: { porcion: 3600, chica: 22000, grande: 28000 },
  },
  {
    id: 'verdura-salsa-blanca',
    name: 'VERDURA Y SALSA BLANCA',
    prices: { porcion: 4800, chica: 26000, grande: 35000 },
  },
  {
    id: 'napolitana',
    name: 'NAPOLITANA',
    prices: { porcion: 5000, chica: 30000, grande: 36000 },
  },
  {
    id: 'fugazzeta-con-jamon',
    name: 'FUGAZZETA CON JAMÓN',
    prices: { porcion: 6400, chica: 36000, grande: 46000 },
  },
  {
    id: 'faina-porcion',
    name: 'FAINÁ (1 porción)',
    prices: { porcion: 1800 },
  },
  {
    id: 'faina-jamon-queso',
    name: 'FAINÁ CON JAMÓN Y QUESO',
    isNew: true,
    prices: { porcion: 5300 },
  },
  {
    id: 'faina-longaniza-queso',
    name: 'FAINÁ CON LONGANIZA Y QUESO',
    isNew: true,
    prices: { porcion: 5300 },
  },
  {
    id: 'pan-de-pizza',
    name: 'PAN DE PIZZA (1 porción)',
    prices: { porcion: 1550 },
  },
];

const ESPECIALES_ITEMS: FlyerItem[] = [
  {
    id: 'bruschetta',
    name: 'BRUSCHETTA',
    description: 'Tomate en cubos, provolone en hebras, albahaca, ajo y aceite de oliva.',
    prices: { chica: 24000, grande: 29000 },
  },
  {
    id: 'calabresa',
    name: 'CALABRESA',
    description: 'Salsa de tomate, muzzarella, longaniza, ají molido y aceitunas negras.',
    prices: { chica: 26000, grande: 32000 },
  },
  {
    id: 'cancha',
    name: 'CANCHA',
    description: 'Salsa de tomate, ajo y aceite de oliva.',
    prices: { chica: 13000, grande: 15500 },
  },
  {
    id: 'cuatro-quesos',
    name: 'CUATRO QUESOS',
    description: 'Salsa de tomate, muzzarella, roquefort, sardo, provolone y aceitunas negras.',
    prices: { chica: 25000, grande: 32000 },
  },
  {
    id: 'fugazza-gratin',
    name: 'FUGAZZA AL GRATÍN',
    description: 'Cebolla y queso provolone rallado y gratinado.',
    prices: { chica: 15000, grande: 25000 },
  },
  {
    id: 'fugazzeta-queso',
    name: 'FUGAZZETA CON QUESO',
    description: 'Rellena con queso cremoso.',
    prices: { chica: 26000, grande: 32000 },
  },
  {
    id: 'pizzeateria-especial',
    name: 'LA PIZZEATERIA',
    description: 'Salsa de tomate, muzzarella, jamón, morrones, palmitos, huevo duro y aceitunas verdes.',
    prices: { chica: 32000, grande: 40000 },
  },
  {
    id: 'margarita',
    name: 'MARGARITA',
    description: 'Salsa de tomate, muzzarella y hojas de albahaca fresca.',
    prices: { chica: 25000, grande: 28000 },
  },
  {
    id: 'palmitos',
    name: 'PALMITOS',
    description: 'Salsa de tomate, muzzarella, palmitos y salsa golf.',
    prices: { chica: 30000, grande: 36000 },
  },
  {
    id: 'primavera',
    name: 'PRIMAVERA',
    isNew: true,
    description: 'Salsa de tomate, muzzarella, tomate, huevo duro y aceitunas verdes.',
    prices: { chica: 28000, grande: 37000 },
  },
  {
    id: 'provolone',
    name: 'PROVOLONE',
    description: 'Salsa de tomate, muzzarella y queso provolone.',
    prices: { chica: 26000, grande: 32000 },
  },
  {
    id: 'roquefort',
    name: 'ROQUEFORT',
    description: 'Salsa de tomate, muzzarella y queso roquefort.',
    prices: { chica: 26000, grande: 32000 },
  },
];

const CALZONES_ITEMS: FlyerItem[] = [
  {
    id: 'calzone-tradicional',
    name: 'TRADICIONAL',
    description: 'Relleno con queso cremoso, rodajas de tomate y jamón.',
    prices: { grande: 30000 },
  },
  {
    id: 'calzone-calabres',
    name: 'CALABRÉS',
    description: 'Relleno con queso cremoso, rodajas de tomate y longaniza.',
    prices: { grande: 30000 },
  },
];

export const PriceFlyerMenu: React.FC<PriceFlyerMenuProps> = ({
  onAddToCart,
  onOpenCart,
  onSwitchToVisual,
}) => {
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  const handlePriceClick = (item: FlyerItem, size: PizzaSize, price: number) => {
    const key = `${item.id}-${size}`;
    setAddedItemKey(key);

    const syntheticMenuItem: MenuItem = {
      id: item.id,
      name: item.name,
      description: item.description || `Pizza artesanal ${item.name} (${size})`,
      price: price,
      category: 'pizzas',
      image: '/pizza-artisan-full.webp',
    };

    onAddToCart(syntheticMenuItem, size, price);

    setTimeout(() => {
      setAddedItemKey(null);
    }, 1200);
  };

  const formatPrice = (val?: number) => {
    if (!val) return null;
    return `$ ${val.toLocaleString('es-AR')}`;
  };

  const calcSinImpuestos = (val?: number) => {
    if (!val) return null;
    // approx 21% vat removal
    const base = Math.round(val / 1.21);
    return `$ ${base.toLocaleString('es-AR')}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 text-neutral-900 font-sans selection:bg-[#E52421] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT BANNER                                               */}
      {/* ========================================================================= */}
      <div className="bg-black text-white px-4 sm:px-6 py-2.5 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm md:text-base tracking-wider uppercase">
          <Percent className="w-4 h-4 text-[#F9BA15]" />
          <span>LISTA DE PRECIOS SALÓN — ¡10% DESCUENTO PAGANDO EN EFECTIVO!</span>
        </div>

        <div className="flex items-center gap-2">
          {onSwitchToVisual && (
            <button
              type="button"
              onClick={onSwitchToVisual}
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full font-bold transition-colors cursor-pointer"
            >
              Ver Carta Visual →
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors"
            title="Imprimir Pizarra de Precios"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. VIBRANT RED PIZZERIA FLYER CONTAINER                                   */}
      {/* ========================================================================= */}
      <div className="bg-[#E52421] p-3 sm:p-6 lg:p-8 rounded-b-2xl sm:rounded-b-3xl shadow-2xl border-4 border-black/10 space-y-6 sm:space-y-8">
        
        {/* Retro Brand Banner */}
        <div className="text-center py-2 sm:py-4">
          <div className="inline-block relative">
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]"
              style={{
                fontFamily: `'Playfair Display', Georgia, serif`,
                textShadow: '3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0 6px 10px rgba(0,0,0,0.6)',
              }}
            >
              La Pizzeateria
              <span className="text-xs sm:text-sm not-italic align-super ml-1 border-2 border-white rounded-full px-1">®</span>
            </h1>
          </div>
          <p className="text-white/95 text-xs sm:text-sm font-black tracking-widest uppercase mt-1 drop-shadow">
            Maestros Pizzeros Tradicionales • Horno a Leña • Masa Madre
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BLOCK 1: PIZZAS CLÁSICAS                                                  */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl border border-neutral-200">
          
          {/* Section Header with Columns */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-neutral-900 pb-3 mb-4 gap-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#E52421] tracking-tight uppercase">
              Pizzas Clásicas
            </h2>

            {/* Price Column Labels */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 text-right min-w-[280px] sm:min-w-[340px]">
              <div>
                <span className="block text-xs sm:text-sm font-black text-black uppercase">PORCIÓN</span>
                <span className="block text-[8px] sm:text-[9px] font-bold text-[#E52421] leading-tight">PRECIO SIN IMP.</span>
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-black text-black uppercase">CHICA</span>
                <span className="block text-[8px] sm:text-[9px] font-bold text-[#E52421] leading-tight">PRECIO SIN IMP.</span>
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-black text-black uppercase">GRANDE</span>
                <span className="block text-[8px] sm:text-[9px] font-bold text-[#E52421] leading-tight">PRECIO SIN IMP.</span>
              </div>
            </div>
          </div>

          {/* List of Clasicas Rows */}
          <div className="divide-y divide-neutral-200">
            {CLASICAS_ITEMS.map((item) => {
              return (
                <div
                  key={item.id}
                  className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-neutral-50 px-2 rounded-lg transition-colors group"
                >
                  {/* Left: Item Name with dot leader */}
                  <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-2">
                    {item.isNew && (
                      <span className="bg-[#E52421] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm flex-shrink-0 animate-pulse">
                        ¡NUEVA!
                      </span>
                    )}
                    <span className="font-black text-xs sm:text-sm text-neutral-900 uppercase tracking-tight flex-shrink-0 group-hover:text-[#E52421] transition-colors">
                      {item.name}
                    </span>
                    <span className="hidden sm:inline-block flex-1 border-b-2 border-dotted border-neutral-300 mx-2" />
                  </div>

                  {/* Right: Prices in 3 columns */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-6 text-right min-w-[280px] sm:min-w-[340px] items-center flex-shrink-0">
                    
                    {/* Porción */}
                    <div>
                      {item.prices.porcion ? (
                        <button
                          type="button"
                          onClick={() => handlePriceClick(item, 'porcion', item.prices.porcion!)}
                          className={`w-full text-right p-1 rounded transition-transform active:scale-95 cursor-pointer ${
                            addedItemKey === `${item.id}-porcion`
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'hover:bg-[#E52421]/10'
                          }`}
                          title={`Pedir Porción de ${item.name}`}
                        >
                          <span className="block font-black text-xs sm:text-sm text-black">
                            {formatPrice(item.prices.porcion)}
                          </span>
                          <span className="block text-[9px] text-neutral-400 font-semibold leading-none">
                            {calcSinImpuestos(item.prices.porcion)}
                          </span>
                        </button>
                      ) : (
                        <span className="text-neutral-300 font-bold text-xs">—</span>
                      )}
                    </div>

                    {/* Chica */}
                    <div>
                      {item.prices.chica ? (
                        <button
                          type="button"
                          onClick={() => handlePriceClick(item, 'chica', item.prices.chica!)}
                          className={`w-full text-right p-1 rounded transition-transform active:scale-95 cursor-pointer ${
                            addedItemKey === `${item.id}-chica`
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'hover:bg-[#E52421]/10'
                          }`}
                          title={`Pedir Chica de ${item.name}`}
                        >
                          <span className="block font-black text-xs sm:text-sm text-black">
                            {formatPrice(item.prices.chica)}
                          </span>
                          <span className="block text-[9px] text-neutral-400 font-semibold leading-none">
                            {calcSinImpuestos(item.prices.chica)}
                          </span>
                        </button>
                      ) : (
                        <span className="text-neutral-300 font-bold text-xs">—</span>
                      )}
                    </div>

                    {/* Grande */}
                    <div>
                      {item.prices.grande ? (
                        <button
                          type="button"
                          onClick={() => handlePriceClick(item, 'grande', item.prices.grande!)}
                          className={`w-full text-right p-1 rounded transition-transform active:scale-95 cursor-pointer ${
                            addedItemKey === `${item.id}-grande`
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'hover:bg-[#E52421]/10'
                          }`}
                          title={`Pedir Grande de ${item.name}`}
                        >
                          <span className="block font-black text-xs sm:text-sm text-black">
                            {formatPrice(item.prices.grande)}
                          </span>
                          <span className="block text-[9px] text-neutral-400 font-semibold leading-none">
                            {calcSinImpuestos(item.prices.grande)}
                          </span>
                        </button>
                      ) : (
                        <span className="text-neutral-300 font-bold text-xs">—</span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BLOCK 2: PIZZAS ESPECIALES                                                */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl border border-neutral-200">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-neutral-900 pb-3 mb-4 gap-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#E52421] tracking-tight uppercase">
              Pizzas Especiales
            </h2>

            {/* Price Column Labels: Chica and Grande */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 text-right min-w-[200px] sm:min-w-[240px]">
              <div>
                <span className="block text-xs sm:text-sm font-black text-black uppercase">CHICA</span>
                <span className="block text-[8px] sm:text-[9px] font-bold text-[#E52421] leading-tight">PRECIO SIN IMP.</span>
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-black text-black uppercase">GRANDE</span>
                <span className="block text-[8px] sm:text-[9px] font-bold text-[#E52421] leading-tight">PRECIO SIN IMP.</span>
              </div>
            </div>
          </div>

          {/* List of Especiales Rows */}
          <div className="divide-y divide-neutral-200">
            {ESPECIALES_ITEMS.map((item) => {
              const isBrandSpecial = item.name === 'LA PIZZEATERIA';

              return (
                <div
                  key={item.id}
                  className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-neutral-50 px-2 rounded-lg transition-colors group"
                >
                  {/* Left: Name and Ingredients */}
                  <div className="flex-1 pr-2 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.isNew && (
                        <span className="bg-[#E52421] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
                          ¡NUEVA!
                        </span>
                      )}
                      <span
                        className={`font-black text-xs sm:text-sm uppercase tracking-tight ${
                          isBrandSpecial ? 'text-[#E52421] italic font-serif' : 'text-neutral-900 group-hover:text-[#E52421]'
                        }`}
                      >
                        {item.name}
                      </span>
                      {item.description && (
                        <span className="text-[11px] sm:text-xs text-neutral-600 font-normal">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Chica & Grande Prices */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 text-right min-w-[200px] sm:min-w-[240px] items-center flex-shrink-0">
                    
                    {/* Chica */}
                    <div>
                      {item.prices.chica ? (
                        <button
                          type="button"
                          onClick={() => handlePriceClick(item, 'chica', item.prices.chica!)}
                          className={`w-full text-right p-1 rounded transition-transform active:scale-95 cursor-pointer ${
                            addedItemKey === `${item.id}-chica`
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'hover:bg-[#E52421]/10'
                          }`}
                          title={`Pedir Chica de ${item.name}`}
                        >
                          <span className="block font-black text-xs sm:text-sm text-black">
                            {formatPrice(item.prices.chica)}
                          </span>
                          <span className="block text-[9px] text-neutral-400 font-semibold leading-none">
                            {calcSinImpuestos(item.prices.chica)}
                          </span>
                        </button>
                      ) : (
                        <span className="text-neutral-300 font-bold text-xs">—</span>
                      )}
                    </div>

                    {/* Grande */}
                    <div>
                      {item.prices.grande ? (
                        <button
                          type="button"
                          onClick={() => handlePriceClick(item, 'grande', item.prices.grande!)}
                          className={`w-full text-right p-1 rounded transition-transform active:scale-95 cursor-pointer ${
                            addedItemKey === `${item.id}-grande`
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'hover:bg-[#E52421]/10'
                          }`}
                          title={`Pedir Grande de ${item.name}`}
                        >
                          <span className="block font-black text-xs sm:text-sm text-black">
                            {formatPrice(item.prices.grande)}
                          </span>
                          <span className="block text-[9px] text-neutral-400 font-semibold leading-none">
                            {calcSinImpuestos(item.prices.grande)}
                          </span>
                        </button>
                      ) : (
                        <span className="text-neutral-300 font-bold text-xs">—</span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Yellow Special Callout Bar (from Image 2) */}
          <div className="mt-6 p-3 sm:p-4 rounded-xl bg-[#F9BA15] border-2 border-black/20 text-center shadow-md">
            <p className="text-xs sm:text-sm md:text-base font-black text-[#991B1B] uppercase tracking-tight">
              ¡Armá tu pizza como vos quieras, sumale tus ingredientes favoritos!
            </p>
            <p className="text-[11px] sm:text-xs font-bold text-black mt-0.5">
              Ingrediente adicional: <span className="font-extrabold text-[#991B1B]">pizza chica $ 4.200</span> | <span className="font-extrabold text-[#991B1B]">pizza grande $ 5.000</span>
            </p>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BLOCK 3: CALZONES                                                         */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl border border-neutral-200">
          
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#E52421] tracking-tight uppercase">
                Calzones
              </h2>
              {/* Little Calzone Icon */}
              <svg viewBox="0 0 32 20" className="w-8 h-5 stroke-[#E52421] fill-[#E52421]/10">
                <path d="M2 18 C2 4, 30 4, 30 18 Z" strokeWidth="2" strokeLinejoin="round" />
                <path d="M4 17 C6 8, 26 8, 28 17" strokeWidth="1.5" strokeDasharray="2,2" />
              </svg>
            </div>

            <div className="text-right">
              <span className="block text-xs sm:text-sm font-black text-black uppercase">PRECIO</span>
              <span className="block text-[8px] sm:text-[9px] font-bold text-[#E52421] leading-tight">PRECIO SIN IMP.</span>
            </div>
          </div>

          <div className="divide-y divide-neutral-200">
            {CALZONES_ITEMS.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-2 hover:bg-neutral-50 px-2 rounded-lg transition-colors group"
              >
                <div className="flex-1 pr-2">
                  <span className="font-black text-xs sm:text-sm text-neutral-900 uppercase group-hover:text-[#E52421] transition-colors">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="ml-2 text-xs text-neutral-600 font-normal">
                      {item.description}
                    </span>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePriceClick(item, 'grande', item.prices.grande!)}
                    className={`p-1.5 rounded transition-transform active:scale-95 cursor-pointer ${
                      addedItemKey === `${item.id}-grande`
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'hover:bg-[#E52421]/10'
                    }`}
                  >
                    <span className="block font-black text-sm sm:text-base text-black">
                      {formatPrice(item.prices.grande)}
                    </span>
                    <span className="block text-[9px] text-neutral-400 font-semibold leading-none">
                      {calcSinImpuestos(item.prices.grande)}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar: Action to view Cart */}
        <div className="bg-black/90 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#F9BA15] flex-shrink-0" />
            <p className="text-xs sm:text-sm font-medium text-stone-200">
              Podés hacer click directamente en cualquier precio para agregarlo a tu pedido.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCart && (
              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 bg-[#F9BA15] hover:bg-[#ffc82a] text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-transform active:scale-95 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ver Pedido</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default PriceFlyerMenu;
