import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Check,
  Plus,
  ArrowLeft,
  X,
  ShoppingBag,
  SlidersHorizontal,
  Flame,
  FileText,
  LayoutGrid,
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MenuItem, MenuCategoryId, PizzaSize, ExtraOption } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS, PIZZA_SUB_CATEGORIES } from '../data/menuData';
import { PriceFlyerMenu } from './PriceFlyerMenu';

interface MenuSectionProps {
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
  isStandalonePage?: boolean;
  onOpenCart?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItemToCustomize,
  onQuickAdd,
  onAddToCart,
  isStandalonePage = false,
  onOpenCart,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mode: 'visual' (Image 1 style) or 'flyer' (Image 2 style)
  const [viewStyle, setViewStyle] = useState<'visual' | 'flyer'>('visual');

  const categoryParam = searchParams.get('category') as MenuCategoryId | null;
  const subCategoryParam = searchParams.get('sub');

  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>(
    categoryParam && MENU_CATEGORIES.some((c) => c.id === categoryParam)
      ? categoryParam
      : 'pizzas'
  );

  const [activeSubCategory, setActiveSubCategory] = useState<string>(
    subCategoryParam || 'clasicas'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  // Per-item selected size state: item.id -> PizzaSize
  const [selectedSizes, setSelectedSizes] = useState<Record<string, PizzaSize>>({});

  // Sync state if URL search param changes
  useEffect(() => {
    if (categoryParam && MENU_CATEGORIES.some((c) => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (catId: MenuCategoryId) => {
    setActiveCategory(catId);
    if (catId === 'todos') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: catId }, { replace: true });
    }
  };

  const handleSubCategoryChange = (subId: string) => {
    setActiveSubCategory(subId);
  };

  // Get active size for an item
  const getItemSize = (item: MenuItem): PizzaSize => {
    if (selectedSizes[item.id]) {
      return selectedSizes[item.id];
    }
    // Default size logic: if individual is only non-zero price (like SIN TACC), pick individual
    if (item.sizePrices?.individual && !item.sizePrices?.grande) {
      return 'individual';
    }
    if (item.sizePrices?.porcion && !item.sizePrices?.grande && !item.sizePrices?.individual) {
      return 'porcion';
    }
    return 'grande';
  };

  // Get price for specific size
  const getItemPriceForSize = (item: MenuItem, size: PizzaSize): number => {
    if (item.sizePrices) {
      const priceForSize = item.sizePrices[size];
      if (priceForSize !== undefined && priceForSize > 0) {
        return priceForSize;
      }
    }
    return item.price;
  };

  // Select size for an item
  const handleSelectSize = (itemId: string, size: PizzaSize) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'todos') {
        if (activeCategory === 'pizzas' && item.category !== 'pizzas') {
          return false;
        }
        if (activeCategory === 'empanadas' && item.category !== 'empanadas') {
          return false;
        }
        if (activeCategory === 'tartas' && item.category !== 'tartas') {
          return false;
        }
        if (activeCategory === 'bebidas' && item.category !== 'bebidas') {
          return false;
        }
        if (activeCategory === 'calzones' && item.category !== 'calzones') {
          return false;
        }
        if (activeCategory === 'postres' && item.category !== 'postres') {
          return false;
        }
      }

      // Subcategory filter (only applies when pizzas is active)
      if (activeCategory === 'pizzas' && activeSubCategory) {
        if (activeSubCategory === 'clasicas' && item.subCategory !== 'clasicas') {
          return false;
        }
        if (activeSubCategory === 'especiales' && item.subCategory !== 'especiales') {
          return false;
        }
        if (activeSubCategory === 'creaciones' && item.subCategory !== 'creaciones') {
          return false;
        }
        if (activeSubCategory === 'con-muzzarella') {
          const isWithout = item.tags?.includes('Sin Muzzarella') || item.subCategory === 'sin-muzzarella';
          if (isWithout) return false;
        }
        if (activeSubCategory === 'sin-muzzarella') {
          const isWithout = item.tags?.includes('Sin Muzzarella') || item.subCategory === 'sin-muzzarella';
          if (!isWithout) return false;
        }
        if (activeSubCategory === 'fugazzas' && item.subCategory !== 'fugazzas') {
          return false;
        }
        if (activeSubCategory === 'faina' && item.subCategory !== 'faina') {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, activeSubCategory, searchQuery]);

  // Order click handler
  const handlePedirOnline = (item: MenuItem) => {
    const size = getItemSize(item);
    const price = getItemPriceForSize(item, size);

    setAddedItemKey(item.id);

    if (onAddToCart) {
      onAddToCart(item, 1, [], '', price, price, size);
    } else {
      onQuickAdd(item);
    }

    setTimeout(() => {
      setAddedItemKey(null);
    }, 1200);
  };

  const formatPriceDisplay = (val?: number) => {
    if (val === undefined || val === null) return '—';
    if (val === 0) return '$0';
    return `$${val.toLocaleString('es-AR')}`;
  };

  return (
    <div id="menu" className="w-full bg-[#FAFAFA] text-neutral-900 font-sans selection:bg-[#E52421] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER WITH ARTISANAL PIZZA & NOTCHED WHITE RIBBON (Ref: menu.png)*/}
      {/* ========================================================================= */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-black select-none">
        
        {/* Panoramic pizza image background */}
        <img
          src="/hero-pizza-poster.jpg"
          alt="Menú Artesanal de Pizzeateria"
          className="w-full h-full object-cover object-center opacity-85 scale-105"
        />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Central White Notched Ribbon: "Menú" */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8 sm:pb-10">
          <div
            className="relative inline-flex items-center justify-center px-14 sm:px-20 py-2.5 sm:py-3.5 bg-white text-neutral-800 shadow-2xl pointer-events-auto"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 18px) 50%, 100% 100%, 0% 100%, 18px 50%)',
            }}
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-neutral-800">
              Menú
            </h1>
          </div>
        </div>

        {/* Floating Switcher between "Carta con Fotos" and "Pizarra de Precios Flyer" */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <div className="bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg flex items-center text-xs">
            <button
              type="button"
              onClick={() => setViewStyle('visual')}
              className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewStyle === 'visual'
                  ? 'bg-white text-black shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Carta Visual</span>
            </button>
            <button
              type="button"
              onClick={() => setViewStyle('flyer')}
              className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewStyle === 'flyer'
                  ? 'bg-[#E52421] text-white shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lista de Precios</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. FLOATING WHITE CATEGORY PILL BAR (Ref: menu.png)                       */}
      {/* ========================================================================= */}
      <div className="relative -mt-10 sm:-mt-12 z-20 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 py-3 px-4 sm:px-8 flex items-center justify-around sm:justify-center gap-4 sm:gap-12 md:gap-16">
          
          {/* 1. PIZZAS */}
          <button
            type="button"
            onClick={() => handleCategoryChange('pizzas')}
            className={`group flex flex-col items-center gap-1 text-center cursor-pointer transition-colors ${
              activeCategory === 'pizzas'
                ? 'text-[#00897B] font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeCategory === 'pizzas' ? 'bg-[#E0F2F1]' : 'group-hover:bg-neutral-100'}`}>
              {/* Pizza slice icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
                <path d="M12 2 L2 22 L22 22 Z" />
                <circle cx="12" cy="14" r="1.5" className="fill-current" />
                <circle cx="8" cy="18" r="1.5" className="fill-current" />
                <circle cx="15" cy="18" r="1.5" className="fill-current" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tight">Pizzas</span>
          </button>

          {/* 2. EMPANADAS */}
          <button
            type="button"
            onClick={() => handleCategoryChange('empanadas')}
            className={`group flex flex-col items-center gap-1 text-center cursor-pointer transition-colors ${
              activeCategory === 'empanadas'
                ? 'text-[#00897B] font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeCategory === 'empanadas' ? 'bg-[#E0F2F1]' : 'group-hover:bg-neutral-100'}`}>
              {/* Empanada / crescent icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
                <path d="M3 18 C3 7, 21 7, 21 18 Z" />
                <path d="M5 16 C8 13, 16 13, 19 16" strokeDasharray="2,2" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tight">Empanadas</span>
          </button>

          {/* 3. TARTAS */}
          <button
            type="button"
            onClick={() => handleCategoryChange('tartas')}
            className={`group flex flex-col items-center gap-1 text-center cursor-pointer transition-colors ${
              activeCategory === 'tartas'
                ? 'text-[#00897B] font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeCategory === 'tartas' ? 'bg-[#E0F2F1]' : 'group-hover:bg-neutral-100'}`}>
              {/* Pie / tart icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
                <path d="M21 16 L3 16 L6 7 L18 7 Z" />
                <path d="M12 7 L12 16" />
                <ellipse cx="12" cy="7" rx="6" ry="2" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tight">Tartas</span>
          </button>

          {/* 4. BEBIDAS */}
          <button
            type="button"
            onClick={() => handleCategoryChange('bebidas')}
            className={`group flex flex-col items-center gap-1 text-center cursor-pointer transition-colors ${
              activeCategory === 'bebidas'
                ? 'text-[#00897B] font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <div className={`p-1.5 rounded-full ${activeCategory === 'bebidas' ? 'bg-[#E0F2F1]' : 'group-hover:bg-neutral-100'}`}>
              {/* Bottle / Drink icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
                <path d="M9 2 L15 2 L15 6 L18 10 L18 22 L6 22 L6 10 L9 6 Z" />
                <path d="M6 14 L18 14" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tight">Bebidas</span>
          </button>

          {/* 5. TOGGLE PIZARRA DE PRECIOS */}
          <button
            type="button"
            onClick={() => setViewStyle(viewStyle === 'visual' ? 'flyer' : 'visual')}
            className={`hidden md:flex flex-col items-center gap-1 text-center cursor-pointer transition-colors ${
              viewStyle === 'flyer'
                ? 'text-[#E52421] font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <div className={`p-1.5 rounded-full ${viewStyle === 'flyer' ? 'bg-red-50' : 'group-hover:bg-neutral-100'}`}>
              <FileText className="w-6 h-6 stroke-2" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-tight">Pizarra Precios</span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONDITIONAL RENDER: FLYER MODE (Image 2) OR VISUAL CARDS (Image 1)       */}
      {/* ========================================================================= */}
      {viewStyle === 'flyer' ? (
        <div className="py-8">
          <PriceFlyerMenu
            onAddToCart={(item, size, customPrice) => {
              if (onAddToCart) {
                onAddToCart(item, 1, [], '', customPrice, customPrice, size);
              } else {
                onQuickAdd(item);
              }
            }}
            onOpenCart={onOpenCart}
            onSwitchToVisual={() => setViewStyle('visual')}
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* ========================================================================= */}
          {/* 3. SUBCATEGORY HORIZONTAL NAV ROW (Ref: menu.png)                        */}
          {/* ========================================================================= */}
          {activeCategory === 'pizzas' && (
            <div className="flex items-center justify-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar border-b border-neutral-200/80 pb-3 mb-8">
              {PIZZA_SUB_CATEGORIES.map((sub) => {
                const isActive = activeSubCategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSubCategoryChange(sub.id)}
                    className={`text-sm sm:text-base whitespace-nowrap transition-all cursor-pointer relative pb-1 ${
                      isActive
                        ? 'font-bold text-neutral-900 border-b-2 border-neutral-900'
                        : 'text-neutral-600 hover:text-neutral-900 font-normal'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Search & Banner */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por ingrediente..."
                className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-8 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setViewStyle('flyer')}
              className="text-xs text-[#E52421] hover:text-[#991B1B] font-bold flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Formato Tradicional de Precios de Salón (Flyer) →</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 4. PRODUCTS GRID (Ref: menu.png 4-column cards)                           */}
          {/* ========================================================================= */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 space-y-3">
              <p className="text-base font-bold text-neutral-800">
                No encontramos platos con estos filtros.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveSubCategory('clasicas');
                }}
                className="text-xs text-[#E52421] font-bold underline cursor-pointer"
              >
                Ver todas las pizzas clásicas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => {
                const currentSize = getItemSize(item);
                const hasSizes = Boolean(item.sizePrices);
                const isAdded = addedItemKey === item.id;

                const grandePrice = item.sizePrices?.grande;
                const medianaPrice = item.sizePrices?.mediana || item.sizePrices?.chica;
                const individualPrice = item.sizePrices?.individual;
                const porcionPrice = item.sizePrices?.porcion;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
                    id={`menu-card-${item.id}`}
                  >
                    <div>
                      {/* Top Pizza Photo */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Card Content Details */}
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-base text-neutral-900 leading-snug line-clamp-1">
                          {item.name}
                        </h3>

                        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed min-h-[34px]">
                          {item.description}
                        </p>

                        {/* 4-column Size / Price Table (Ref: menu.png) */}
                        {hasSizes ? (
                          <div className="pt-2 border-t border-neutral-100">
                            <div className="grid grid-cols-4 gap-1 text-center">
                              {/* 1. Grande */}
                              <button
                                type="button"
                                onClick={() => grandePrice && grandePrice > 0 && handleSelectSize(item.id, 'grande')}
                                className={`p-1 rounded cursor-pointer transition-colors ${
                                  currentSize === 'grande' && grandePrice && grandePrice > 0
                                    ? 'bg-neutral-100 ring-1 ring-neutral-400'
                                    : 'hover:bg-neutral-50'
                                }`}
                              >
                                <span className="block text-[10px] text-neutral-500 font-semibold leading-tight">Grande</span>
                                <span className="block text-xs font-bold text-neutral-900 mt-0.5">
                                  {formatPriceDisplay(grandePrice)}
                                </span>
                              </button>

                              {/* 2. Mediana */}
                              <button
                                type="button"
                                onClick={() => medianaPrice && medianaPrice > 0 && handleSelectSize(item.id, 'mediana')}
                                className={`p-1 rounded cursor-pointer transition-colors ${
                                  currentSize === 'mediana' && medianaPrice && medianaPrice > 0
                                    ? 'bg-neutral-100 ring-1 ring-neutral-400'
                                    : 'hover:bg-neutral-50'
                                }`}
                              >
                                <span className="block text-[10px] text-neutral-500 font-semibold leading-tight">Mediana</span>
                                <span className="block text-xs font-bold text-neutral-900 mt-0.5">
                                  {formatPriceDisplay(medianaPrice)}
                                </span>
                              </button>

                              {/* 3. Individual */}
                              <button
                                type="button"
                                onClick={() => individualPrice && individualPrice > 0 && handleSelectSize(item.id, 'individual')}
                                className={`p-1 rounded cursor-pointer transition-colors ${
                                  currentSize === 'individual' && individualPrice && individualPrice > 0
                                    ? 'bg-neutral-100 ring-1 ring-neutral-400'
                                    : 'hover:bg-neutral-50'
                                }`}
                              >
                                <span className="block text-[10px] text-neutral-500 font-semibold leading-tight">Individual</span>
                                <span className="block text-xs font-bold text-neutral-900 mt-0.5">
                                  {formatPriceDisplay(individualPrice)}
                                </span>
                              </button>

                              {/* 4. Porción */}
                              <button
                                type="button"
                                onClick={() => porcionPrice && porcionPrice > 0 && handleSelectSize(item.id, 'porcion')}
                                className={`p-1 rounded cursor-pointer transition-colors ${
                                  currentSize === 'porcion' && porcionPrice && porcionPrice > 0
                                    ? 'bg-neutral-100 ring-1 ring-neutral-400'
                                    : 'hover:bg-neutral-50'
                                }`}
                              >
                                <span className="block text-[10px] text-neutral-500 font-semibold leading-tight">Porción</span>
                                <span className="block text-xs font-bold text-neutral-900 mt-0.5">
                                  {formatPriceDisplay(porcionPrice)}
                                </span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Single price fallback for non-pizza items */
                          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                            <span className="text-neutral-500 font-medium">
                              {item.servesCount || 'Individual'}
                            </span>
                            <span className="text-sm font-bold text-neutral-900">
                              ${item.price.toLocaleString('es-AR')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Full-width Black Button (Ref: menu.png) */}
                    <div>
                      {item.availableExtras && item.availableExtras.length > 0 ? (
                        <div className="grid grid-cols-2">
                          <button
                            type="button"
                            onClick={() => onSelectItemToCustomize(item)}
                            className="bg-neutral-100 text-neutral-800 hover:bg-neutral-200 font-bold text-[11px] uppercase py-3 border-r border-neutral-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <SlidersHorizontal className="w-3 h-3" />
                            <span>Extras</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePedirOnline(item)}
                            className={`font-bold text-xs uppercase py-3 tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-700 text-white'
                                : 'bg-black text-white hover:bg-neutral-800'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>¡Agregado!</span>
                              </>
                            ) : (
                              <span>PEDIR ONLINE</span>
                            )}
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePedirOnline(item)}
                          className={`w-full font-bold text-xs uppercase py-3 tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-black text-white hover:bg-neutral-800'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>¡Agregado!</span>
                            </>
                          ) : (
                            <span>PEDIR ONLINE</span>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default MenuSection;
