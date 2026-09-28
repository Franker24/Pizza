import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaPause, FaPlay, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa6';

export interface CategoryCardData {
  id: string;
  menuCategoryId: string;
  name: string;
  sublabel: string;
  image: string;
  isStar?: boolean;
  starOnly?: boolean;
}

export const CATEGORIES_DATA: CategoryCardData[] = [
  {
    id: 'must-try',
    menuCategoryId: 'must-try',
    name: 'MUST TRY!',
    sublabel: 'Selección del Chef',
    image: '/pizza-artisan-full.webp',
    isStar: true,
    starOnly: true,
  },
  {
    id: 'pizza',
    menuCategoryId: 'pizzas',
    name: 'PIZZA',
    sublabel: 'Masa madre 72h',
    image: '/pizza-artisan-full.webp',
  },
  {
    id: 'starters',
    menuCategoryId: 'starters',
    name: 'STARTERS',
    sublabel: 'Garlic rolls & dips',
    image: '/dish-starters.webp',
  },
  {
    id: 'wings',
    menuCategoryId: 'wings',
    name: 'WINGS',
    sublabel: 'Buffalo & BBQ',
    image: '/dish-wings.webp',
  },
  {
    id: 'soups-salads',
    menuCategoryId: 'ensaladas',
    name: 'SOUPS & SALADS',
    sublabel: 'Frescura italiana',
    image: '/dish-salad.webp',
  },
  {
    id: 'calzones',
    menuCategoryId: 'calzones',
    name: 'CALZONES',
    sublabel: 'Masa dorada rellena',
    image: '/dish-calzones.webp',
  },
  {
    id: 'hoagys',
    menuCategoryId: 'hoagys',
    name: 'HOAGYS',
    sublabel: 'Submarinos calientes',
    image: '/dish-hoagys.webp',
  },
  {
    id: 'pasta-meals',
    menuCategoryId: 'pastas',
    name: 'PASTA MEALS',
    sublabel: 'Pomodoro San Marzano',
    image: '/dish-pasta.webp',
  },
  {
    id: 'meals-kids',
    menuCategoryId: 'kids',
    name: 'MEALS FOR KIDS',
    sublabel: 'Spaghetti con albóndiga',
    image: '/dish-kids.webp',
  },
  {
    id: 'create-combo',
    menuCategoryId: 'combos',
    name: 'CREATE A COMBO',
    sublabel: 'Plato + papas + bebida',
    image: '/dish-combo.webp',
  },
];

interface ProductCategoriesBannerProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const ProductCategoriesBanner: React.FC<ProductCategoriesBannerProps> = ({
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (cat: CategoryCardData) => {
    if (onSelectCategory) {
      onSelectCategory(cat.menuCategoryId);
    }
    navigate(`/menu?category=${cat.menuCategoryId}`);
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Duplicated items for a seamless marquee loop
  const marqueeItems = [...CATEGORIES_DATA, ...CATEGORIES_DATA];

  return (
    <section
      id="contenido"
      className="relative w-full overflow-hidden select-none py-6 sm:py-8 border-y border-[#E8E2D8] bg-[#F7F4EE]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.75) 0%, rgba(245, 241, 233, 0.95) 100%),
          url("data:image/svg+xml,%3Csvg width='120' height='60' viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h120v30H0zM0 30h120v30H0z' fill='none' stroke='%23DDD6CA' stroke-width='0.75' stroke-dasharray='3 2' opacity='0.35'/%3E%3Cpath d='M60 0v30M0 30v30M120 30v30' fill='none' stroke='%23DDD6CA' stroke-width='0.75' stroke-dasharray='3 2' opacity='0.35'/%3E%3C/svg%3E")
        `,
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Top Header / Subtle Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#DDD6CA] shadow-xs text-[#E52421] font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E52421] animate-pulse" />
            Nuestras Especialidades
          </span>
          <span className="text-[#8C8274] hidden md:inline text-xs font-medium">
            Platos preparados al momento con ingredientes auténticos
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="flex items-center gap-1.5 text-[#5C5449] hover:text-black transition-colors text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/80 border border-[#DDD6CA] shadow-xs cursor-pointer"
            title={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          >
            {isPaused ? (
              <>
                <FaPlay className="w-2.5 h-2.5 text-[#E52421]" />
                <span className="hidden sm:inline">Reanudar</span>
              </>
            ) : (
              <>
                <FaPause className="w-2.5 h-2.5 text-[#8C8274]" />
                <span className="hidden sm:inline">Pausar</span>
              </>
            )}
          </button>

          {/* Manual Scroll Arrows */}
          <button
            onClick={handleScrollLeft}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 border border-[#DDD6CA] text-[#5C5449] hover:text-[#E52421] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Desplazar a la izquierda"
          >
            <FaChevronLeft className="w-2.5 h-2.5" />
          </button>

          <button
            onClick={handleScrollRight}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 border border-[#DDD6CA] text-[#5C5449] hover:text-[#E52421] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Desplazar a la derecha"
          >
            <FaChevronRight className="w-2.5 h-2.5" />
          </button>

          {/* Full Menu Link */}
          <button
            onClick={() => navigate('/menu')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E52421] text-white hover:bg-[#c91d1a] font-bold text-xs shadow-sm transition-all ml-1 cursor-pointer active:scale-95"
          >
            <span>Ver Carta</span>
            <FaArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Outer Marquee Container with Soft Side Fade Gradients */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-20 bg-gradient-to-r from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-20 bg-gradient-to-l from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />

        {/* Scrolling Track: Plated food items without enclosing cards/boxes */}
        <div
          ref={scrollContainerRef}
          className="animate-marquee-infinite flex items-end gap-6 sm:gap-10 md:gap-14 py-4 px-4 overflow-x-auto no-scrollbar"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {marqueeItems.map((cat, idx) => {
            const isMustTry = cat.isStar && cat.starOnly;

            return (
              <div
                key={`${cat.id}-${idx}`}
                onClick={() => handleCardClick(cat)}
                className="group flex-shrink-0 flex flex-col items-center justify-end text-center cursor-pointer transition-transform duration-300 active:scale-95"
                style={{ width: '145px' }}
                title={`Ver categoría: ${cat.name}`}
              >
                {/* 1. DISH PRESENTATION: Plated Food Image Floating Without Enclosing Box */}
                <div className="relative w-30 sm:w-34 h-24 sm:h-28 flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-108">
                  {/* Subtle realistic contact shadow underneath the plate */}
                  <div className="absolute bottom-1 w-24 sm:w-28 h-4 bg-black/20 rounded-full blur-[7px] transform group-hover:scale-90 group-hover:opacity-40 transition-all duration-300 pointer-events-none" />

                  {isMustTry ? (
                    /* MUST TRY! Golden Star Feature (matching sample image) */
                    <div className="relative flex flex-col items-center justify-center">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
                        <FaStar className="w-16 h-16 sm:w-18 sm:h-18 text-[#F9BA15] filter drop-shadow-[0_8px_12px_rgba(249,186,21,0.45)]" />
                      </div>
                    </div>
                  ) : (
                    /* Plated Dish Image on Real Plate / Platter without square corners */
                    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain rounded-full sm:rounded-[48%_/_52%] filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)] group-hover:drop-shadow-[0_16px_24px_rgba(229,36,33,0.28)] transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/pizza-artisan-full.webp';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* 2. DIRECT BOLD TYPOGRAPHY UNDERNEATH (No Boxes/Cards) */}
                <div className="mt-3 flex flex-col items-center">
                  <h4 className="font-sans font-black text-xs sm:text-sm text-[#1F1B18] group-hover:text-[#E52421] tracking-tight uppercase transition-colors duration-200">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] text-[#7A7163] font-medium tracking-normal mt-0.5 group-hover:text-[#524B40] transition-colors">
                    {cat.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
