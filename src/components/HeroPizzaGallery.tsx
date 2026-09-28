import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Plus,
  Maximize2,
  X,
  Play,
  Pause,
  Award,
  Clock,
  Check,
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface SignaturePizzaSlide {
  item: MenuItem;
  closeUpImage: string;
  tagline: string;
  flavorProfile: string;
  keyIngredients: string[];
  crustHighlight: string;
}

// Curated high-resolution macro shots of FORNO signature pizzas
const SIGNATURE_PIZZAS: SignaturePizzaSlide[] = [
  {
    item: MENU_ITEMS.find((i) => i.id === 'pizza-de-temporada') || MENU_ITEMS[0],
    closeUpImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=1400&auto=format&fit=crop',
    tagline: 'Equilibrio sublime entre higos dulces al fuego y jamón de Parma curado.',
    flavorProfile: 'Cremoso · Dulce · Ahumado',
    keyIngredients: ['Stracciatella fresca', 'Higos al fuego', 'Jamón de Parma 18m', 'Reducción balsámica'],
    crustHighlight: 'Masa madre 72h con aireado pronunciado y borde leopardo.',
  },
  {
    item: MENU_ITEMS.find((i) => i.id === 'pepperoni-hot-honey') || MENU_ITEMS[4],
    closeUpImage: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=85&w=1400&auto=format&fit=crop',
    tagline: 'Pepperoni artesanal en copas crocantes bañado en miel picante infusionada.',
    flavorProfile: 'Picante · Intenso · Caramelizado',
    keyIngredients: ['Pepperoni de campo', 'Hot Honey ahumada', 'Fior di Latte', 'Pomodoro San Marzano'],
    crustHighlight: 'Crocancia croc-mordida con piso de piedra refractaria.',
  },
  {
    item: MENU_ITEMS.find((i) => i.id === 'especial-forno') || MENU_ITEMS[1],
    closeUpImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=85&w=1400&auto=format&fit=crop',
    tagline: 'Nuestra creación insigne con triple queso fundido y portobellos asados.',
    flavorProfile: 'Terroso · Ahumado · Umami',
    keyIngredients: ['Tomates confitados', 'Mozzarella ahumada', 'Provolone fundido', 'Portobellos'],
    crustHighlight: 'Bordes inflados y alveolos de fermentación lenta.',
  },
  {
    item: MENU_ITEMS.find((i) => i.id === 'stracciatella-mortadella') || {
      id: 'stracciatella-mortadella',
      name: 'Stracciatella & Mortadella',
      description: 'Base blanca, mortadela con pistachos, corazón cremoso de stracciatella fresca y lluvia de pistachos.',
      price: 24500,
      category: 'pizzas',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=85&w=1400&auto=format&fit=crop',
      tags: ['Gourmet', 'Exclusiva'],
    },
    closeUpImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=85&w=1400&auto=format&fit=crop',
    tagline: 'Fascinante contraste térmico: masa humeante coronada con charcutería y crema fría.',
    flavorProfile: 'Fresco · Crocante · Sedoso',
    keyIngredients: ['Mortadella Bologna', 'Stracciatella hilada', 'Pistachos tostados', 'Zeste de limón'],
    crustHighlight: 'Base blanca con aceite de oliva extra virgen prensado en frío.',
  },
  {
    item: MENU_ITEMS.find((i) => i.id === 'fugazzeta-rellena') || MENU_ITEMS[3],
    closeUpImage: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=85&w=1400&auto=format&fit=crop',
    tagline: 'Monumento al queso: más de 500g de mozzarella y cebollas dulces doradas al horno.',
    flavorProfile: 'Generoso · Dorado · Tradicional',
    keyIngredients: ['500g Mozzarella', 'Provolone Tandil', 'Cebollas dulces', 'Orégano del monte'],
    crustHighlight: 'Doble masa rellena con corteza dorada y crocante.',
  },
  {
    item: MENU_ITEMS.find((i) => i.id === 'margherita-clasica') || MENU_ITEMS[2],
    closeUpImage: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=85&w=1400&auto=format&fit=crop',
    tagline: 'La esencia pura napolitana: tomate dulce, fior di latte hilada y albahaca fresca.',
    flavorProfile: 'Puro · Aromático · Balanceado',
    keyIngredients: ['Tomates San Marzano', 'Fior di Latte', 'Albahaca recién cortada', 'Oliva virgen'],
    crustHighlight: 'Cocción relámpago de 90 segundos a 450°C.',
  },
];

interface HeroPizzaGalleryProps {
  onSelectItem?: (item: MenuItem) => void;
  onQuickAdd?: (item: MenuItem) => void;
}

export const HeroPizzaGallery: React.FC<HeroPizzaGalleryProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPizza = SIGNATURE_PIZZAS[currentIndex];

  const paginate = (newDirection: 1 | -1) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = SIGNATURE_PIZZAS.length - 1;
      if (next >= SIGNATURE_PIZZAS.length) next = 0;
      return next;
    });
  };

  const jumpToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay management
  useEffect(() => {
    if (!isAutoplay || isHovered || isZoomOpen) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      paginate(1);
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [currentIndex, isAutoplay, isHovered, isZoomOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'Escape' && isZoomOpen) setIsZoomOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  // Framer Motion slide variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-[#2D2A26] bg-[#1C1A18] shadow-2xl flex flex-col group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Gallery Header Bar */}
      <div className="px-4 py-3 bg-[#171513] border-b border-[#2D2A26] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#E05330] animate-pulse" />
          <span className="font-serif-title text-xs sm:text-sm font-bold text-[#EDE8E1] tracking-wide">
            Galería de Pizzas Insignes
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E05330]/20 text-[#D9822B] border border-[#E05330]/30 font-semibold hidden sm:inline-block">
            Primer Plano 4K
          </span>
        </div>

        {/* Autoplay & Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoplay((prev) => !prev)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              isAutoplay
                ? 'bg-[#E05330]/20 border-[#E05330]/40 text-[#D9822B]'
                : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:text-[#EDE8E1]'
            }`}
            title={isAutoplay ? 'Pausar reproducción automática' : 'Iniciar reproducción automática'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[10px] hidden md:inline font-mono">
              {isAutoplay ? 'Auto' : 'Pausa'}
            </span>
          </button>

          <button
            onClick={() => setIsZoomOpen(true)}
            className="p-1.5 rounded-lg border border-[#2D2A26] bg-[#121110] text-[#9E968B] hover:text-[#EDE8E1] hover:border-[#4A443E] transition-colors"
            title="Ver fotografía en alta resolución"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Slide Carousel Area (Aspect Ratio 3:2) */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Appetizing Culinary Photo with Ken Burns subtle breathing */}
            <motion.img
              src={currentPizza.closeUpImage}
              alt={currentPizza.item.name}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 5, ease: 'easeOut' }}
              referrerPolicy="no-referrer"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/30 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/60 pointer-events-none" />

            {/* Top Badges Overlay */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between pointer-events-none">
              <div className="flex flex-col gap-1.5">
                <span className="self-start px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E05330] text-white shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>{currentPizza.item.badge || 'Fuego de Quebracho'}</span>
                </span>
                <span className="self-start px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/60 backdrop-blur-md text-[#EDE8E1] border border-white/10">
                  {currentPizza.flavorProfile}
                </span>
              </div>

              {/* Price Tag */}
              <div className="px-3 py-1.5 rounded-xl bg-[#121110]/90 backdrop-blur-md border border-[#D9822B]/40 text-[#D9822B] shadow-xl text-right">
                <div className="text-[10px] text-[#9E968B] uppercase tracking-wider font-mono">
                  Precio Salón & Delivery
                </div>
                <div className="text-base sm:text-lg font-bold font-mono text-[#EDE8E1]">
                  ${currentPizza.item.price.toLocaleString('es-AR')}
                </div>
              </div>
            </div>

            {/* Bottom Content Card on Slide */}
            <div className="absolute bottom-3 left-3 right-3 pointer-events-auto">
              <div className="bg-[#121110]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-[#2D2A26] shadow-2xl space-y-2.5">
                
                {/* Title and Quick Add Action */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif-title text-base sm:text-xl font-bold text-[#EDE8E1] leading-snug">
                      {currentPizza.item.name}
                    </h3>
                    <p className="text-xs text-[#9E968B] line-clamp-1">
                      {currentPizza.tagline}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {onSelectItem && (
                      <button
                        onClick={() => onSelectItem(currentPizza.item)}
                        className="bg-[#25221F] hover:bg-[#322E2A] text-[#EDE8E1] hover:text-white px-3 py-2 rounded-lg text-xs font-semibold border border-[#2D2A26] hover:border-[#D9822B] transition-all flex items-center gap-1.5"
                        title="Personalizar masa, bordes e ingredientes"
                      >
                        <span>Personalizar</span>
                      </button>
                    )}

                    {onQuickAdd && (
                      <button
                        onClick={() => onQuickAdd(currentPizza.item)}
                        className="bg-[#E05330] hover:bg-[#C94726] text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-lg shadow-[#E05330]/25 transition-all flex items-center gap-1.5 transform hover:scale-105"
                        title="Agregar pizza al pedido actual"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Pedir</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Key Ingredients Tag Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#2D2A26]/80 text-[11px]">
                  <span className="text-[#D9822B] font-semibold mr-1">Ingredientes:</span>
                  {currentPizza.keyIngredients.map((ingredient, i) => (
                    <span
                      key={i}
                      className="bg-[#1C1A18] text-[#EDE8E1]/90 px-2 py-0.5 rounded-md border border-[#2D2A26]"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Arrow Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#121110]/80 hover:bg-[#E05330] text-white border border-white/10 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 z-10"
          aria-label="Pizza anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#121110]/80 hover:bg-[#E05330] text-white border border-white/10 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 z-10"
          aria-label="Siguiente pizza"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail Navigation Strip & Progress Bar */}
      <div className="p-3 bg-[#171513] border-t border-[#2D2A26] space-y-2.5">
        
        {/* Horizontal Thumbnails */}
        <div className="grid grid-cols-6 gap-2">
          {SIGNATURE_PIZZAS.map((pizza, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={pizza.item.id}
                onClick={() => jumpToSlide(idx)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all ${
                  isActive
                    ? 'border-[#E05330] ring-2 ring-[#E05330]/40 scale-105 z-10'
                    : 'border-[#2D2A26] opacity-60 hover:opacity-100 hover:border-[#4A443E]'
                }`}
                title={pizza.item.name}
              >
                <img
                  src={pizza.closeUpImage}
                  alt={pizza.item.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-[#E05330]/15 pointer-events-none" />
                )}
                <div className="absolute bottom-0 inset-x-0 bg-black/70 px-1 py-0.5 text-[9px] font-medium text-white truncate text-center">
                  {pizza.item.name.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress Line */}
        <div className="flex items-center justify-between text-[11px] text-[#9E968B] pt-0.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#D9822B]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(SIGNATURE_PIZZAS.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline">· {currentPizza.crustHighlight}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {SIGNATURE_PIZZAS.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-6 bg-[#E05330]'
                    : 'w-1.5 bg-[#2D2A26] hover:bg-[#4A443E]'
                }`}
                aria-label={`Ir a pizza ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Zoom Lightbox */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-[#1C1A18] text-[#EDE8E1] hover:bg-[#25221F] border border-[#2D2A26] transition-all hover:scale-110"
              title="Cerrar vista completa (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* High-res Image in Zoom Modal */}
            <div className="relative max-w-5xl max-h-[80vh] w-full rounded-2xl overflow-hidden border border-[#2D2A26] shadow-2xl">
              <img
                src={currentPizza.closeUpImage}
                alt={currentPizza.item.name}
                className="w-full h-full object-contain max-h-[75vh]"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Caption in Zoom */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#D9822B] font-bold">
                      {currentPizza.flavorProfile}
                    </span>
                    <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#EDE8E1]">
                      {currentPizza.item.name}
                    </h2>
                    <p className="text-sm text-[#9E968B] max-w-2xl mt-1">
                      {currentPizza.item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-bold text-[#D9822B] font-mono">
                      ${currentPizza.item.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next / Previous inside Zoom Modal */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => paginate(-1)}
                className="px-4 py-2 rounded-xl bg-[#1C1A18] text-[#EDE8E1] border border-[#2D2A26] hover:border-[#D9822B] text-xs font-semibold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
              <span className="text-xs text-[#9E968B] font-mono">
                {currentIndex + 1} de {SIGNATURE_PIZZAS.length}
              </span>
              <button
                onClick={() => paginate(1)}
                className="px-4 py-2 rounded-xl bg-[#1C1A18] text-[#EDE8E1] border border-[#2D2A26] hover:border-[#D9822B] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
