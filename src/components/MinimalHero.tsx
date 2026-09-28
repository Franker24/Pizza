import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MinimalHeroProps {
  onOrderNow: () => void;
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({ onOrderNow }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on web load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0908] text-white select-none">
      
      {/* 1. Panoramic Artisan Pizza on Dark Slate Stone Background (Ref: home2.png) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=2400&auto=format&fit=crop"
          alt="Pizza deliciosa artesanal sobre piedra pizarra"
          className={`w-full h-full object-cover object-center filter brightness-90 contrast-110 transition-all duration-1000 ease-out ${
            isLoaded ? 'scale-105 opacity-80' : 'scale-100 opacity-0'
          }`}
        />
        {/* Vignette overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/35 to-[#121110] pointer-events-none" />
      </div>

      {/* Floating subtle ember glow particles for high-end feel */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-[#E52421]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F9BA15]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* 2. Central Content Block (Ref: home2.png) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center flex flex-col items-center justify-center space-y-5 sm:space-y-8">
        
        {/* Main Headline in Distressed Woodblock / Vintage Stamp Typography */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="font-distressed-headline text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-wider leading-[1.15] sm:leading-[1.1] max-w-4xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            PIZZA ARTESANAL AL HORNO DE LEÑA
          </h1>
        </div>

        {/* Subheadline in Rustic Distressed Stamp Lettering */}
        <div
          className={`transition-all duration-700 delay-200 ease-out transform ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="font-distressed-sub text-xs sm:text-base md:text-xl lg:text-2xl text-white/95 uppercase tracking-widest max-w-2xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            MASA MADRE • FERMENTACIÓN LENTA • RECETAS ÚNICAS
          </p>
        </div>

        {/* 3. Central Animated Order Button (Ref: home2.png) */}
        <div
          className={`pt-1 sm:pt-4 transition-all duration-700 delay-300 ease-out transform ${
            isLoaded
              ? 'scale-100 opacity-100'
              : 'scale-90 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={onOrderNow}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 sm:gap-2.5 px-7 sm:px-12 py-3.5 sm:py-4 rounded-full bg-[#BA0C0C] hover:bg-[#D41010] text-white font-black text-xs sm:text-sm md:text-base tracking-widest uppercase shadow-[0_10px_35px_rgba(186,12,12,0.65)] animate-pulse-glow transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-sweep-shine" />

            <span className="relative z-10">HAZ AHORA TU PEDIDO</span>
            <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>

      </div>

      {/* Bottom subtle divider to smoothly transition into next section */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#121110] to-transparent pointer-events-none" />

    </section>
  );
};

export default MinimalHero;
