import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import {
  Volume2,
  VolumeX,
  ChevronDown,
  ArrowRight,
  Flame,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  FaPhone,
  FaPizzaSlice,
  FaMotorcycle,
  FaWhatsapp,
  FaFire,
} from 'react-icons/fa6';
import { MenuItem } from '../types';

interface HeroProps {
  onExploreMenu?: () => void;
  onOpenReservation?: () => void;
  onOpenPairing?: () => void;
  onOpenCart?: () => void;
  onSelectItemToCustomize?: (item: MenuItem) => void;
  onQuickAdd?: (item: MenuItem) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenReservation,
  onOpenCart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedBranch, setSelectedBranch] = useState<'recoleta' | 'bnorte' | 'palermo'>('recoleta');

  // GSAP 3D Subtle Parallax Effect on Mouse Move
  useEffect(() => {
    const container = containerRef.current;
    const headline = headlineRef.current;
    if (!container || !headline) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(headline, {
        x: x * 20,
        y: y * 14,
        rotationY: x * 4,
        rotationX: -y * 4,
        ease: 'power2.out',
        duration: 0.7,
        transformPerspective: 900,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(headline, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        ease: 'power3.out',
        duration: 0.9,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // GSAP Smooth Entrance Timeline
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-pill-badge',
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          '.hero-curva-text',
          { opacity: 0, y: 20, rotate: -2 },
          { opacity: 1, y: 0, rotate: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-title-main',
          { opacity: 0, y: 35, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '.hero-bottom-capsule',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          '.hero-side-badge',
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.12 },
          '-=0.5'
        );
    }, el);

    return () => {
      try {
        ctx.revert();
      } catch {
        // ignore
      }
    };
  }, []);

  // Safe Video Autoplay with proper catch shielding
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    try {
      const playPromise = video.play();
      if (playPromise !== undefined && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay policy or interruptions handled silently
        });
      }
    } catch {
      // Synchronous failure handled silently
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      try {
        const p = video.play();
        if (p !== undefined && typeof p.catch === 'function') {
          p.catch(() => {});
        }
      } catch {
        // ignore
      }
    }
  };

  const handleOrderClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else if (onExploreMenu) {
      onExploreMenu();
    }
  };

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  const branchPhones = {
    recoleta: { name: 'Recoleta', phone: '4812-2721', addr: 'Paraná 1249' },
    bnorte: { name: 'B. Norte', phone: '4821-4658', addr: 'Uriburu 1305' },
    palermo: { name: 'Palermo', phone: '4800-1112', addr: 'Solo delivery' },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100vh-76px)] min-h-[660px] max-h-[1050px] bg-[#0C0B0A] overflow-hidden flex flex-col items-center justify-between py-6 px-4 sm:px-6 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND VIDEO (Kept exactly as requested, bright & appetizing)      */}
      {/* ========================================================================= */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] saturate-[1.2]"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster="/hero-pizza-poster.jpg"
      >
        <source src="/hero-pizza.mp4" type="video/mp4" />
        <source src="/hero-pizza-uhd.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Vignette & Soft Gradient Gradients (Allows the video to breathe) */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/25 to-black/80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0C0B0A]/90 via-[#0C0B0A]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/70 to-transparent" />

      {/* Subtle Central Warm Fire Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E52421]/15 rounded-full blur-[100px]" />


      {/* ========================================================================= */}
      {/* 2. FLOATING QUICK ACTION BADGES ON RIGHT (Inspired by home.png)           */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3.5 pointer-events-auto">
        
        {/* Badge 1: Horno a leña */}
        <div className="hero-side-badge group relative flex items-center justify-end">
          <div className="absolute right-14 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Horno de leña 485°C
          </div>
          <div className="w-12 h-12 rounded-full bg-[#E52421] text-white flex items-center justify-center shadow-lg shadow-[#E52421]/30 border-2 border-white/20 transform hover:scale-110 active:scale-95 transition-all cursor-pointer">
            <FaFire className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Badge 2: Delivery */}
        <div
          onClick={handleOrderClick}
          className="hero-side-badge group relative flex items-center justify-end cursor-pointer"
        >
          <div className="absolute right-14 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Delivery caliente 30 min
          </div>
          <div className="w-12 h-12 rounded-full bg-[#F9BA15] text-black flex items-center justify-center shadow-lg shadow-[#F9BA15]/30 border-2 border-white/20 transform hover:scale-110 active:scale-95 transition-all">
            <FaMotorcycle className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Badge 3: WhatsApp */}
        <a
          href="https://wa.me/549112772783"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-side-badge group relative flex items-center justify-end"
        >
          <div className="absolute right-14 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            WhatsApp Pedidos
          </div>
          <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 border-2 border-white/20 transform hover:scale-110 active:scale-95 transition-all">
            <FaWhatsapp className="w-5 h-5" />
          </div>
        </a>

      </div>


      {/* ========================================================================= */}
      {/* 3. SOUND TOGGLE (Top right discrete control)                             */}
      {/* ========================================================================= */}
      <div className="absolute top-5 right-5 z-20">
        <button
          type="button"
          onClick={toggleMute}
          title={isMuted ? 'Activar sonido del horno a leña' : 'Silenciar sonido'}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#F9BA15]" />}
        </button>
      </div>


      {/* Spacer top to balance vertical layout */}
      <div className="w-full h-2" />


      {/* ========================================================================= */}
      {/* 4. MAIN EDITORIAL HEADLINE: Clean, Powerful, Elegant (Ref: home2 & home3) */}
      {/* ========================================================================= */}
      <div
        ref={headlineRef}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center my-auto px-4"
      >
        {/* Top Heritage Pill Badge */}
        <div className="hero-pill-badge mb-3 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#E52421] animate-ping" />
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-stone-200">
            Masa Madre 72h • Horno a Leña 485°C
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[11px] sm:text-xs font-semibold text-[#F9BA15]">
            Buenos Aires
          </span>
        </div>

        {/* Refined Cursive Accent Question: "¿Ya sentís el aroma?" (Ref: home3.png) */}
        <div className="hero-curva-text font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#F9BA15] tracking-wide filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          ¿Ya sentís el aroma?
        </div>

        {/* High-Impact Main Title: "LA VERDADERA PIZZA ARTESANAL" (Ref: home2.png) */}
        <h1 className="hero-title-main mt-1 font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
          LA VERDADERA <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF3D6] to-[#F9BA15]">
            PIZZA ARTESANAL
          </span>
        </h1>

        {/* Evocative Subtitle */}
        <p className="hero-subtext mt-3 max-w-2xl text-xs sm:text-base md:text-lg text-stone-200 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Masa crujiente y aireada por fuera, fundente por dentro. Horneada al momento con mozzarella dorada y tomates San Marzano.
        </p>

        {/* High-Converting CTA Buttons Group */}
        <div className="hero-cta-group mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
          
          {/* Primary Action Button: Glowing Golden Pill */}
          <button
            type="button"
            onClick={handleOrderClick}
            className="group relative flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#F9BA15] hover:bg-[#e6a90e] text-black font-extrabold text-sm sm:text-base tracking-wide shadow-[0_10px_25px_rgba(249,186,21,0.35)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FaPizzaSlice className="w-4 h-4 text-black transform group-hover:rotate-12 transition-transform" />
            <span>Hacé tu pedido online</span>
            <ArrowRight className="w-4 h-4 text-black transform group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary Action: Frosted Glass Button */}
          <button
            type="button"
            onClick={onExploreMenu}
            className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-white font-bold text-sm sm:text-base tracking-wide shadow-lg transition-all duration-200 transform hover:scale-102 active:scale-95 cursor-pointer"
          >
            <span>Ver carta y precios</span>
          </button>

        </div>

      </div>


      {/* ========================================================================= */}
      {/* 5. FLOATING GLASS CAPSULE: "PEDÍ POR TELÉFONO Y RETIRÁ EN 15'" (home.png) */}
      {/* ========================================================================= */}
      <div className="hero-bottom-capsule relative z-20 w-full max-w-3xl mx-auto mb-1">
        <div className="rounded-2xl sm:rounded-full bg-black/60 backdrop-blur-xl border border-white/25 px-5 sm:px-7 py-3 sm:py-3.5 shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: Phone icon in badge & Direct message */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#F9BA15] flex-shrink-0 shadow-inner">
              <FaPhone className="w-4 h-4 transform -rotate-12" />
            </div>

            <div className="text-left">
              <div className="text-xs sm:text-sm font-black tracking-wide text-white uppercase leading-tight">
                PEDÍ POR TELÉFONO Y RETIRÁ EN
              </div>
              <div className="text-[11px] text-stone-300 font-medium">
                Listo para retirar en salón o take-away
              </div>
            </div>
          </div>

          {/* Center: The Big "15'" Number (Exactly like home.png) */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-white/5 border border-white/10">
            <span className="font-serif font-black text-3xl sm:text-4xl text-[#F9BA15] leading-none tracking-tight drop-shadow-sm">
              15'
            </span>
          </div>

          {/* Right: Golden Pill Action Button (Matches home.png) */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <a
              href={`tel:${branchPhones[selectedBranch].phone.replace('-', '')}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#F9BA15] hover:bg-[#ffc82a] text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>¡Llamá! {branchPhones[selectedBranch].phone}</span>
            </a>
          </div>

        </div>

        {/* Quick Branch selector pill underneath capsule */}
        <div className="flex items-center justify-center gap-3 mt-2 text-[11px] text-stone-300">
          <span className="text-stone-400">Sucursal:</span>
          {(['recoleta', 'bnorte', 'palermo'] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBranch(b)}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                selectedBranch === b
                  ? 'bg-white/20 text-[#F9BA15] font-bold border border-[#F9BA15]/50'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {branchPhones[b].name}
            </button>
          ))}
        </div>
      </div>

      {/* Discrete bottom scroll indicator */}
      <div
        onClick={scrollToNext}
        className="hidden md:flex absolute bottom-1 left-1/2 -translate-x-1/2 z-10 cursor-pointer text-stone-400 hover:text-white transition-colors"
      >
        <ChevronDown className="w-3.5 h-3.5 text-[#F9BA15] animate-bounce opacity-60" />
      </div>
    </div>
  );
};

export default Hero;
