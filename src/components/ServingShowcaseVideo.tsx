import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowDown,
  ShoppingBag,
  Sliders,
} from 'lucide-react';

interface ServingShowcaseVideoProps {
  id?: string;
  onExploreMenu?: () => void;
}

interface ServiceStage {
  step: string;
  title: string;
  subtitle: string;
  detail: string;
  range: [number, number]; // progress range [min, max]
}

const SERVICE_STAGES: ServiceStage[] = [
  {
    step: '01',
    title: 'Masa Madre Viva & Fermentación',
    subtitle: '72 horas de maduración a temperatura controlada',
    detail: 'Alveolos livianos, sémola de trigo candeal y digestión óptima.',
    range: [0.0, 0.2],
  },
  {
    step: '02',
    title: 'Entrada al Domo de Fuego Vivo',
    subtitle: 'Horno de piedra refractaria a 480°C',
    detail: 'Leña de quebracho blanco que confiere el inconfundible aroma ahumado.',
    range: [0.2, 0.42],
  },
  {
    step: '03',
    title: 'La Cocción Relámpago',
    subtitle: '90 segundos de magia culinaria napolitana',
    detail: 'Corteza inflada con motas leopardo y emulsión de pomodoro con fior di latte.',
    range: [0.42, 0.68],
  },
  {
    step: '04',
    title: 'La Pala Tradicional de Madera',
    subtitle: 'Retirada artesanal en su punto exacto de hervor',
    detail: 'La madera preserva el calor de piso sin condensar humedad en la base.',
    range: [0.68, 0.88],
  },
  {
    step: '05',
    title: 'El Servicio en Mesa',
    subtitle: 'Humeante, crocante y lista para compartir',
    detail: 'Aceite de oliva virgen extra y hojas de albahaca fresca en el clímax del sabor.',
    range: [0.88, 1.0],
  },
];

const TOTAL_FRAMES = 20;

// Direct valid frame paths from /frames/pizza-reveal-XX.jpg
const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const pad = String(i + 1).padStart(2, '0');
  return `/frames/pizza-reveal-${pad}.jpg`;
});

export const ServingShowcaseVideo: React.FC<ServingShowcaseVideoProps> = ({
  id = 'video-serving',
  onExploreMenu,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoBgRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isImagesLoadedRef = useRef<boolean[]>([]);

  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  // Preload all frames into memory
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];
    const loadedFlags: boolean[] = [];

    FRAME_URLS.forEach((src, idx) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        loaded++;
        loadedFlags[idx] = true;
        setLoadedCount(loaded);
        if (loaded >= Math.min(10, TOTAL_FRAMES)) {
          setIsLoaded(true);
        }
      };

      // Fallback in case of missing index
      img.onerror = () => {
        img.onerror = null;
        const fallbackPad = String((idx % 20) + 1).padStart(2, '0');
        img.src = `/pizza-reveal-${fallbackPad}.jpg`;
      };

      imgs.push(img);
      loadedFlags.push(false);
    });

    imagesRef.current = imgs;
    isImagesLoadedRef.current = loadedFlags;
  }, []);

  // Draw current frame to full-width canvas
  const renderCanvasFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Compute object-cover positioning across full web width
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawW = width;
    let drawH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawW = width;
      drawH = width / imgRatio;
      offsetY = (height - drawH) / 2;
    } else {
      // Canvas is taller than image
      drawH = height;
      drawW = height * imgRatio;
      offsetX = (width - drawW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();
  }, []);

  // Update canvas on active frame change
  useEffect(() => {
    renderCanvasFrame(activeFrameIndex);
  }, [activeFrameIndex, renderCanvasFrame, isLoaded]);

  // Window resize handler for canvas
  useEffect(() => {
    const handleResize = () => {
      renderCanvasFrame(activeFrameIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeFrameIndex, renderCanvasFrame]);

  // Scroll listener to update frames based on scroll depth
  useEffect(() => {
    if (isAutoPlaying) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section total scrollable height
      const totalScrollableDistance = rect.height - windowHeight;
      if (totalScrollableDistance <= 0) return;

      // Current distance scrolled into the sticky container
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(clampedProgress * (TOTAL_FRAMES - 1))
      );

      setActiveFrameIndex(targetFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoPlaying]);

  // Autoplay timelapse interval
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveFrameIndex((prev) => {
        const next = (prev + 1) % TOTAL_FRAMES;
        setScrollProgress(next / (TOTAL_FRAMES - 1));
        return next;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Jump to specific frame or stage
  const jumpToStage = (stageProgress: number) => {
    setIsAutoPlaying(false);
    const targetIdx = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(stageProgress * (TOTAL_FRAMES - 1))
    );
    setActiveFrameIndex(targetIdx);
    setScrollProgress(stageProgress);

    const section = sectionRef.current;
    if (section) {
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = section.clientHeight - windowHeight;
      const targetTop = section.offsetTop + stageProgress * totalScrollableDistance;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  const handleManualScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setIsAutoPlaying(false);
    setScrollProgress(val);
    const targetIdx = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(val * (TOTAL_FRAMES - 1))
    );
    setActiveFrameIndex(targetIdx);
  };

  // Find active stage text
  const currentStage =
    SERVICE_STAGES.find(
      (s) => scrollProgress >= s.range[0] && scrollProgress <= s.range[1]
    ) || SERVICE_STAGES[SERVICE_STAGES.length - 1];

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative w-full bg-[#0D0B0A] text-[#EDE8E1] select-none"
      style={{ height: '320vh' }} // Generous scroll height for silky frame transitions
    >
      {/* Sticky Fullscreen Stage: Pinned as user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* 1. BACKGROUND VIDEO LAYER (FULL WIDTH EDGE-TO-EDGE) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <video
            ref={videoBgRef}
            className="w-full h-full object-cover object-center filter blur-[1px] brightness-[0.45] saturate-[1.15]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/12717312_2160_3840_25fps.mp4" type="video/mp4" />
            <source src="/pizza-serving.mp4" type="video/mp4" />
            <source src="/hero-pizza.mp4" type="video/mp4" />
          </video>

          {/* Luxury Ember & Heat Color Grading Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B0A] via-[#0D0B0A]/40 to-[#0D0B0A]" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0D0B0A]/60 to-[#0D0B0A]/95" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#E52421]/10 blur-[140px] rounded-full" />
        </div>

        {/* 2. FOREGROUND FULL-WIDTH SCROLL FRAMES (EDGE-TO-EDGE) */}
        <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
          {/* Canvas for zero-flicker instantaneous full-width rendering */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
            style={{ width: '100%', height: '100%' }}
          />

          {/* Fallback image if canvas has not yet rendered first frame */}
          <img
            src={FRAME_URLS[activeFrameIndex]}
            alt="El Servicio de la Pizza"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Full-width cinematic atmospheric vignette around frame */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-[#0D0B0A]/85" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
        </div>

        {/* 3. TOP BRANDING & STAGE NAVIGATION BAR */}
        <div className="relative z-20 w-full pt-6 pb-4 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E52421] mb-1">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span>El Servicio de la Pizza</span>
              <span className="text-[#A09A90]">·</span>
              <span className="text-[#D4AF37] font-mono">Secuencia en Vivo</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-md">
              Del Horno de Barro a tu Mesa
            </h2>
          </div>

          {/* Quick Stage Selectors */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {SERVICE_STAGES.map((stg, idx) => {
              const isCurrent =
                scrollProgress >= stg.range[0] && scrollProgress <= stg.range[1];
              return (
                <button
                  key={stg.step}
                  onClick={() => jumpToStage((stg.range[0] + stg.range[1]) / 2)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#E52421] text-white shadow-lg shadow-[#E52421]/30 font-bold scale-105'
                      : 'bg-black/50 hover:bg-black/80 text-[#A09A90] hover:text-white border border-white/10 backdrop-blur-md'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-80">{stg.step}.</span>
                  <span>{stg.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. DYNAMIC EDITORIAL TEXT OVERLAY (SYNCHRONIZED WITH SCROLL PROGRESS) */}
        <div className="relative z-20 w-full px-4 sm:px-8 max-w-7xl mx-auto my-auto pointer-events-none">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-black/60 backdrop-blur-xl border border-white/15 p-5 sm:p-7 rounded-2xl shadow-2xl text-left pointer-events-auto"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#E52421] px-2 py-0.5 rounded bg-[#E52421]/20 border border-[#E52421]/40">
                    ETAPA {currentStage.step}
                  </span>
                  <span className="text-xs text-[#A09A90] font-mono">
                    Frame {activeFrameIndex + 1} de {TOTAL_FRAMES}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1.5 leading-snug">
                  {currentStage.title}
                </h3>

                <p className="text-sm font-medium text-[#D4AF37] mb-2">
                  {currentStage.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#A09A90] leading-relaxed">
                  {currentStage.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 5. BOTTOM INTERACTIVE TIMELINE SCRUBBER & CONTROLS */}
        <div className="relative z-20 w-full pb-6 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="bg-black/75 backdrop-blur-xl border border-white/15 p-4 rounded-2xl shadow-2xl">
            {/* Top row: Progress info & Scroll hint */}
            <div className="flex items-center justify-between text-xs text-[#A09A90] mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-white font-mono font-bold">
                  {Math.round(scrollProgress * 100)}%
                </span>
                <span className="text-[#A09A90] hidden sm:inline">
                  · Desplaza para ver cada frame en tiempo real
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Scroll Hint */}
                <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#D4AF37] animate-bounce">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Scroll para avanzar la pizza</span>
                </div>

                {/* Autoplay / Manual Toggle */}
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 border transition ${
                    isAutoPlaying
                      ? 'bg-[#E52421] text-white border-[#E52421]'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                  }`}
                  title={isAutoPlaying ? 'Pausar timelapse' : 'Reproducir automáticamente'}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isAutoPlaying ? 'Pausar' : 'Timelapse'}</span>
                </button>

                {/* Reset button */}
                <button
                  type="button"
                  onClick={() => jumpToStage(0)}
                  className="p-1 rounded-md text-[#A09A90] hover:text-white hover:bg-white/10 transition"
                  title="Reiniciar secuencia"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Explore menu link if near completion */}
                {onExploreMenu && (
                  <button
                    type="button"
                    onClick={onExploreMenu}
                    className="ml-1 bg-[#D4AF37] hover:bg-[#C29E30] text-black font-bold px-3 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Ver Menú</span>
                  </button>
                )}
              </div>
            </div>

            {/* Tactile Range Scrubber Bar (Edge-to-Edge inside container) */}
            <div className="relative flex items-center group">
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={scrollProgress}
                onChange={handleManualScrub}
                aria-label="Selector de frame de cocción"
                className="w-full h-2.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#E52421] transition hover:bg-white/30"
              />
            </div>

            {/* Frame Tick Indicator Line */}
            <div className="flex justify-between items-center text-[10px] font-mono text-[#A09A90] mt-2 px-1">
              <span>01 Masa</span>
              <span>02 Entrada al Horno</span>
              <span>03 Cocción 480°C</span>
              <span>04 Pala</span>
              <span>05 Servicio Final</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
