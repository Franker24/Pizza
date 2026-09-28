import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PizzaScrollExperienceProps {
  onExploreMenu?: () => void;
}

interface PizzaLayerDef {
  id: string;
  name: string;
  sub: string;
  webpSrc: string;
  pngFallback: string;
  alt: string;
  // Exploded offsets (in pixels)
  offsetY: number;
  offsetZ: number;
  scale: number;
  labelSide: 'left' | 'right';
  num: string;
}

const PIZZA_LAYERS: PizzaLayerDef[] = [
  {
    id: 'crust',
    num: '01',
    name: 'MASA ARTESANAL',
    sub: 'Fermentación lenta y textura ligera',
    webpSrc: '/pizza-artisan-crust.webp',
    pngFallback: '/pizza-artisan-crust.png',
    alt: 'Masa de fermentación lenta',
    offsetY: 135, // Desciende
    offsetZ: -60,
    scale: 0.94,
    labelSide: 'left',
  },
  {
    id: 'sauce',
    num: '02',
    name: 'SALSA DE TOMATE',
    sub: 'Tomates seleccionados y cocción lenta',
    webpSrc: '/pizza-artisan-sauce.webp',
    pngFallback: '/pizza-artisan-sauce.png',
    alt: 'Salsa de tomate San Marzano',
    offsetY: 65,
    offsetZ: -15,
    scale: 0.97,
    labelSide: 'right',
  },
  {
    id: 'cheese',
    num: '03',
    name: 'MOZZARELLA',
    sub: 'Fior di latte cremoso',
    webpSrc: '/pizza-artisan-cheese.webp',
    pngFallback: '/pizza-artisan-cheese.png',
    alt: 'Fior di latte fundido',
    offsetY: -10,
    offsetZ: 35,
    scale: 1.0,
    labelSide: 'left',
  },
  {
    id: 'toppings',
    num: '04',
    name: 'INGREDIENTES FRESCOS',
    sub: 'Seleccionados diariamente',
    webpSrc: '/pizza-artisan-toppings.webp',
    pngFallback: '/pizza-artisan-toppings.png',
    alt: 'Pepperoni y toppings horneados',
    offsetY: -85,
    offsetZ: 85,
    scale: 1.03,
    labelSide: 'right',
  },
  {
    id: 'basil',
    num: '05',
    name: 'TOQUE FINAL',
    sub: 'Albahaca & AOVE',
    webpSrc: '/pizza-artisan-basil.webp',
    pngFallback: '/pizza-artisan-basil.png',
    alt: 'Albahaca fresca y aceite de oliva virgen extra',
    offsetY: -155,
    offsetZ: 140,
    scale: 1.06,
    labelSide: 'left',
  },
];

export const PizzaScrollExperience: React.FC<PizzaScrollExperienceProps> = ({ onExploreMenu }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mouseTilt, setMouseTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  // Preload all photorealistic assets in memory safely
  useEffect(() => {
    const urls = [
      '/pizza-artisan-full.webp',
      ...PIZZA_LAYERS.map((l) => l.webpSrc),
    ];
    urls.forEach((url) => {
      const img = new Image();
      img.onerror = () => {};
      img.src = url;
    });
  }, []);

  // Subtle 3D mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({
      rx: -y * 6,
      ry: x * 6,
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rx: 0, ry: 0 });
  };

  // Scroll progress via ScrollTrigger without DOM reparenting/pinning
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let trigger: ScrollTrigger | null = null;

    try {
      trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    } catch {
      // ignore
    }

    return () => {
      if (trigger) {
        try {
          trigger.kill();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Animation Timeline Mapping:
  // 0% -> 20%: Pizza completa
  // 20% -> 40%: Comienza separación
  // 40% -> 60%: Separación progresiva
  // 60% -> 75%: Exploded view
  // 75% -> 88%: Máxima separación (Momento Hero)
  // 88% -> 100%: Reensamblado & Hero Final
  const { separation, stageRotateX, stageScale, labelsOpacity, finalHeroOpacity } = useMemo(() => {
    const p = scrollProgress;

    let sep = 0;
    let rx = 18;
    let sc = 0.96;
    let lblOp = 0;
    let heroOp = 0;

    if (p < 0.2) {
      // 0% - 20%: Pizza completa
      const sub = p / 0.2;
      sep = 0;
      rx = 16 + sub * 2;
      sc = 0.94 + sub * 0.03;
      lblOp = 0;
      heroOp = 0;
    } else if (p < 0.4) {
      // 20% - 40%: Comienza separación
      const sub = (p - 0.2) / 0.2;
      // Ease in-out
      sep = sub * sub * (3 - 2 * sub);
      rx = 18 + sub * 22; // 18 -> 40 deg
      sc = 0.97 + sub * 0.03;
      lblOp = sub * 0.7;
      heroOp = 0;
    } else if (p < 0.75) {
      // 40% - 75%: Exploded view
      sep = 1;
      rx = 40;
      sc = 1.0;
      lblOp = 1;
      heroOp = 0;
    } else if (p < 0.88) {
      // 75% - 88%: Momento Hero (máxima separación)
      const sub = (p - 0.75) / 0.13;
      sep = 1;
      rx = 40 - sub * 4;
      sc = 1.0 + sub * 0.04; // sutil zoom cinematográfico
      lblOp = 1 - sub * 0.25;
      heroOp = 0;
    } else {
      // 88% - 100%: Reensamblado
      const sub = (p - 0.88) / 0.12;
      // Revert smooth step
      sep = Math.max(0, 1 - sub * sub * (3 - 2 * sub));
      rx = 36 - sub * 18; // 36 -> 18 deg
      sc = 1.04 - sub * 0.06; // settles to 0.98
      lblOp = Math.max(0, 1 - sub * 3);
      heroOp = Math.min(1, Math.max(0, (sub - 0.25) * 1.33));
    }

    return {
      separation: sep,
      stageRotateX: rx,
      stageScale: sc,
      labelsOpacity: lblOp,
      finalHeroOpacity: heroOp,
    };
  }, [scrollProgress]);

  // Combined 3D matrix for perspective
  const finalRx = stageRotateX + mouseTilt.rx;
  const finalRy = mouseTilt.ry;
  const stageTransform = `perspective(1200px) rotateX(${finalRx}deg) rotateY(${finalRy}deg) scale(${stageScale})`;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[2400px]"
    >
      <section
        id="servicio-pizza"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sticky top-0 w-full h-screen bg-[#0E0C0B] text-[#EDE8E1] overflow-hidden select-none"
      >
        {/* 1. Cinematic Studio Background: Dark stone vignette with warm embers */}
        <div className="absolute inset-0 bg-radial from-[#1A130E]/60 via-[#0E0C0B] to-[#070605] pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E52421]/8 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-[#D4A359]/8 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* 2. Top Header (Fase 1 / Initial Cue) */}
        <div
          className="absolute top-8 left-0 right-0 z-20 flex flex-col items-center text-center px-4 transition-all duration-500 pointer-events-none"
          style={{
            opacity: scrollProgress < 0.85 ? 1 : Math.max(0, 1 - (scrollProgress - 0.85) * 8),
            transform: `translateY(${scrollProgress < 0.2 ? 0 : -scrollProgress * 25}px)`,
          }}
        >
          <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-[#D4A359]">
            ARTESANAL • INGREDIENTES REALES
          </span>
          <div className="w-8 h-px bg-[#D4A359]/30 mt-2" />
        </div>

        {/* 3. Central Stage: 3D Exploded Photographic Pizza Stack */}
        <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
          {/* Soft Ambient Shadow Underneath */}
          <div
            className="absolute w-[300px] sm:w-[440px] md:w-[540px] h-[140px] md:h-[190px] bg-black/90 rounded-full blur-2xl pointer-events-none transform translate-y-36"
            style={{
              transform: `translateY(${135 + separation * 60}px) scale(${
                0.85 + separation * 0.35
              })`,
              opacity: 0.85 - separation * 0.3,
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* 3D Rotatable Stage */}
          <div
            ref={stageRef}
            className="relative w-[280px] sm:w-[400px] md:w-[500px] lg:w-[560px] aspect-square flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
              transform: stageTransform,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Base Photorealistic Full Pizza (Shown when assembled) */}
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: separation < 0.05 ? 1 : 0,
              }}
            >
              <picture>
                <source srcSet="/pizza-artisan-full.webp" type="image/webp" />
                <img
                  src="/pizza-artisan-full.png"
                  alt="Pizza Napoletana Artesanal Completa"
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/hero-pizza-poster.jpg';
                  }}
                />
              </picture>
            </div>

            {/* Separated Photographic Layers (Exploded View) */}
            {PIZZA_LAYERS.map((layer) => {
              const currentY = layer.offsetY * separation;
              const currentZ = layer.offsetZ * separation;
              const currentScale = 1 + (layer.scale - 1) * separation;

              return (
                <div
                  key={layer.id}
                  className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                  style={{
                    transform: `translate3d(0, ${currentY}px, ${currentZ}px) scale(${currentScale})`,
                    opacity: separation > 0.02 ? 1 : 0,
                    transformStyle: 'preserve-3d',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <picture>
                    <source srcSet={layer.webpSrc} type="image/webp" />
                    <img
                      src={layer.pngFallback}
                      alt={layer.alt}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/pizza-artisan-full.webp';
                      }}
                    />
                  </picture>
                </div>
              );
            })}

            {/* Sutil Rim Lighting / Reflexión de estudio gastronómico */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay" />
          </div>
        </div>

        {/* 4. Editorial Labels (Desktop: Minimal Left & Right with Thin Hairlines) */}
        <div
          className="absolute inset-0 pointer-events-none z-25 hidden md:block max-w-7xl mx-auto px-8 lg:px-14"
          style={{
            opacity: labelsOpacity,
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Left Side Labels: 05 Albahaca, 03 Mozzarella, 01 Masa */}
          <div className="absolute left-8 lg:left-14 top-1/2 -translate-y-1/2 flex flex-col gap-14 lg:gap-18 w-60 lg:w-72">
            {/* 05 TOQUE FINAL */}
            <div
              className="transition-transform duration-300"
              style={{
                transform: `translateX(${(1 - labelsOpacity) * -25}px)`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#D4A359] font-bold">05</span>
                <div className="w-6 h-px bg-[#D4A359]/40" />
                <span className="text-xs font-semibold tracking-wider text-white uppercase">
                  TOQUE FINAL
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-400 font-light pl-8 leading-snug">
                Albahaca fresca & AOVE virgen extra
              </p>
            </div>

            {/* 03 MOZZARELLA */}
            <div
              className="transition-transform duration-300"
              style={{
                transform: `translateX(${(1 - labelsOpacity) * -20}px)`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#D4A359] font-bold">03</span>
                <div className="w-6 h-px bg-[#D4A359]/40" />
                <span className="text-xs font-semibold tracking-wider text-white uppercase">
                  MOZZARELLA
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-400 font-light pl-8 leading-snug">
                Fior di latte de textura cremosa y fundido láctico
              </p>
            </div>

            {/* 01 MASA ARTESANAL */}
            <div
              className="transition-transform duration-300"
              style={{
                transform: `translateX(${(1 - labelsOpacity) * -15}px)`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#D4A359] font-bold">01</span>
                <div className="w-6 h-px bg-[#D4A359]/40" />
                <span className="text-xs font-semibold tracking-wider text-white uppercase">
                  MASA ARTESANAL
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-400 font-light pl-8 leading-snug">
                Fermentación lenta y textura ligera
              </p>
            </div>
          </div>

          {/* Right Side Labels: 04 Ingredientes Frescos, 02 Salsa de Tomate */}
          <div className="absolute right-8 lg:right-14 top-1/2 -translate-y-1/2 flex flex-col gap-18 w-60 lg:w-72">
            {/* 04 INGREDIENTES FRESCOS */}
            <div
              className="text-right transition-transform duration-300"
              style={{
                transform: `translateX(${(1 - labelsOpacity) * 25}px)`,
              }}
            >
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs font-semibold tracking-wider text-white uppercase">
                  INGREDIENTES FRESCOS
                </span>
                <div className="w-6 h-px bg-[#E52421]/50" />
                <span className="text-[11px] font-mono text-[#E52421] font-bold">04</span>
              </div>
              <p className="mt-1 text-xs text-stone-400 font-light pr-8 leading-snug">
                Seleccionados diariamente
              </p>
            </div>

            {/* 02 SALSA DE TOMATE */}
            <div
              className="text-right transition-transform duration-300"
              style={{
                transform: `translateX(${(1 - labelsOpacity) * 20}px)`,
              }}
            >
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs font-semibold tracking-wider text-white uppercase">
                  SALSA DE TOMATE
                </span>
                <div className="w-6 h-px bg-[#E52421]/50" />
                <span className="text-[11px] font-mono text-[#E52421] font-bold">02</span>
              </div>
              <p className="mt-1 text-xs text-stone-400 font-light pr-8 leading-snug">
                Tomates seleccionados y cocción lenta
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Editorial Tag (Bottom Center Minimalist Pill) */}
        <div
          className="absolute bottom-16 inset-x-6 z-25 md:hidden pointer-events-none transition-all duration-300 text-center"
          style={{
            opacity: scrollProgress >= 0.3 && scrollProgress <= 0.85 ? 1 : 0,
          }}
        >
          <div className="inline-flex flex-col items-center px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#D4A359]">
              <span>
                {scrollProgress < 0.5
                  ? '01 MASA • 02 SALSA'
                  : scrollProgress < 0.7
                  ? '03 MOZZARELLA'
                  : '04 TOPPINGS • 05 AOVE'}
              </span>
            </div>
          </div>
        </div>

        {/* 5. Fase 6 — Final Hero Overlay (Hecha para compartir) */}
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-all duration-500"
          style={{
            opacity: finalHeroOpacity,
            transform: `scale(${0.94 + finalHeroOpacity * 0.06})`,
          }}
        >
          <div className="p-8 sm:p-10 md:p-12 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-w-lg mx-auto pointer-events-auto">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              HECHA PARA COMPARTIR
            </h3>

            <p className="mt-3 text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-sm mx-auto">
              Pizza artesanal, ingredientes reales y mucho sabor.
            </p>

            <div className="mt-7 flex items-center justify-center">
              {onExploreMenu && (
                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E52421] hover:bg-[#c91d1a] text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl shadow-[#E52421]/30 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  <Utensils className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  <span>VER MENÚ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PizzaScrollExperience;
