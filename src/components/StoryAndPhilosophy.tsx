import React, { useState } from 'react';
import {
  Flame,
  Users,
  Award,
  Clock,
  Sparkles,
  Heart,
  ChevronRight,
  BookOpen,
  Calendar,
  Utensils,
  MapPin,
  Check,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StoryAndPhilosophy: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'historia' | 'gente' | 'horno' | 'mistica'>('historia');

  return (
    <section 
      id="historia" 
      className="relative w-full bg-[#FAF6EE] text-[#1B1815] border-y-4 border-[#E54738] overflow-hidden select-none py-10 sm:py-16 transition-colors"
    >
      {/* Compatibility anchor for old links */}
      <div id="filosofia" className="absolute -top-10 left-0 w-0 h-0" />

      {/* Subtle vintage paper texture background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-45 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(#cfc3ae 0.85px, transparent 0.85px), radial-gradient(#cfc3ae 0.85px, #FAF6EE 0.85px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
        }}
      />

      {/* FULL WIDTH WRAPPER */}
      <div className="relative w-full px-3 sm:px-6 md:px-10 lg:px-14 xl:px-20 space-y-10 sm:space-y-14 z-10">
        
        {/* ========================================================================= */}
        {/* 1. MAIN VINTAGE BANNER ADAPTED TO PIZZEATERÍA (FULL WIDTH STYLE)           */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#FAF6EE] border-2 border-[#E54738] shadow-md relative overflow-hidden">
          
          {/* TOP 3 COMPARTMENTS: HORNO A LEÑA | PIZZA SLICE | PIZZA A LA PIEDRA */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-[#E54738]">
            
            {/* Left: HORNO A LEÑA */}
            <div className="flex items-center justify-center py-6 sm:py-8 px-4 md:border-r-2 border-b-2 md:border-b-0 border-[#E54738] bg-[#FAF6EE]">
              <h2 className="text-[#E54738] font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[0.16em] uppercase text-center font-normal leading-none drop-shadow-sm">
                HORNO A LEÑA
              </h2>
            </div>

            {/* Center: Pizza Slice Line Art Illustration (Matching Reference Drawing) */}
            <div className="flex items-center justify-center py-4 sm:py-6 px-4 md:border-r-2 border-b-2 md:border-b-0 border-[#E54738] bg-[#FAF6EE]/80">
              <svg
                viewBox="0 0 180 160"
                className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto text-[#E54738]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. Straight lower crust base edge (under the dripping cheese) */}
                <path
                  d="M 32 98 L 112 120"
                  stroke="#E54738"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 2. Outer and Inner Puffy Crust Contour */}
                <path
                  d="M 30 96 
                     C 20 74, 42 42, 74 26 
                     C 86 24, 95 30, 98 36 
                     C 103 42, 101 50, 95 54 
                     C 74 46, 52 58, 38 82 
                     C 35 88, 34 94, 38 98 
                     C 34 102, 28 99, 30 96 Z"
                  stroke="#E54738"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 3. Crust Ridges / Baked Cornicione Hatch Marks */}
                <path d="M 33 89 C 36 91, 39 93, 42 92" stroke="#E54738" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 38 77 C 42 79, 46 81, 49 80" stroke="#E54738" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 46 64 C 51 67, 56 69, 60 67" stroke="#E54738" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 58 52 C 64 55, 70 57, 74 54" stroke="#E54738" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 74 41 C 80 44, 86 45, 90 42" stroke="#E54738" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 89 35 C 93 38, 97 40, 100 38" stroke="#E54738" strokeWidth="2.8" strokeLinecap="round" />

                {/* 4. Upper slice edge line from crust corner to tip */}
                <path
                  d="M 98 42 L 168 135"
                  stroke="#E54738"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 5. Melting cheese layer with 2 hanging drips connecting to the tip */}
                <path
                  d="M 38 96 
                     C 52 100, 68 104, 85 108 
                     C 96 110, 106 113, 114 116 
                     C 117 122, 118 132, 124 133 
                     C 129 134, 131 127, 134 122 
                     C 137 120, 140 124, 142 128 
                     C 144 138, 145 152, 151 152 
                     C 156 152, 158 140, 160 134 
                     C 162 133, 165 134, 168 135"
                  stroke="#E54738"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 6. Pepperoni Slice (Outer concentric contour) */}
                <path
                  d="M 103 91 
                     C 101 82, 118 77, 126 83 
                     C 134 89, 127 104, 117 103 
                     C 110 102, 104 98, 103 91 Z"
                  stroke="#E54738"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 7. Pepperoni inner detail loop */}
                <path
                  d="M 112 90 
                     C 111 87, 119 86, 120 89 
                     C 121 92, 115 95, 112 93 Z"
                  stroke="#E54738"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 8. Little seasoning / oregano specks scattered on cheese */}
                <circle cx="74" cy="78" r="1.8" fill="#E54738" />
                <circle cx="88" cy="68" r="1.8" fill="#E54738" />
                <circle cx="98" cy="80" r="1.8" fill="#E54738" />
                <circle cx="85" cy="94" r="1.8" fill="#E54738" />
                <circle cx="102" cy="62" r="1.8" fill="#E54738" />
                <circle cx="114" cy="54" r="1.8" fill="#E54738" />
                <circle cx="135" cy="74" r="1.8" fill="#E54738" />
                <circle cx="138" cy="100" r="1.8" fill="#E54738" />
                <circle cx="146" cy="115" r="1.8" fill="#E54738" />
                <circle cx="130" cy="110" r="1.8" fill="#E54738" />
                <circle cx="160" cy="122" r="1.8" fill="#E54738" />
              </svg>
            </div>

            {/* Right: PIZZA A LA PIEDRA */}
            <div className="flex items-center justify-center py-6 sm:py-8 px-4 bg-[#FAF6EE]">
              <h2 className="text-[#E54738] font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[0.16em] uppercase text-center font-normal leading-none drop-shadow-sm">
                PIZZA A LA PIEDRA
              </h2>
            </div>
          </div>

          {/* LOWER SECTION: DIAMOND WITH "La Pizzeatería" BRANDING */}
          <div className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-8 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[420px]">
            
            {/* The Large Coral Diamond (Rombo) Outline */}
            <div 
              className="absolute inset-x-2 sm:inset-x-8 md:inset-x-16 lg:inset-x-28 inset-y-4 border-2 border-[#E54738] pointer-events-none"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                backgroundColor: 'rgba(250, 246, 238, 0.45)',
              }}
            />

            {/* CIRCULAR COMMEMORATIVE SEAL: 40 ANIVERSARIO · 1984-2024 */}
            <div className="absolute right-4 sm:right-10 md:right-16 lg:right-24 top-6 sm:top-8 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 border-[#181614] flex flex-col items-center justify-center bg-[#FAF6EE]/90 z-20 select-none shadow-sm">
              <div className="text-[6.5px] sm:text-[7.5px] md:text-[8px] font-bold tracking-[0.2em] text-[#181614] uppercase text-center px-1">
                CELEBRANDO NUESTRO
              </div>
              <span className="font-['Bebas_Neue',Impact,sans-serif] text-3xl sm:text-4xl md:text-5xl text-[#181614] leading-none tracking-tight font-bold my-0.5">
                40
              </span>
              <div className="text-[6px] sm:text-[7px] md:text-[7.5px] font-bold tracking-wider text-[#181614] uppercase text-center">
                ANIVERSARIO
              </div>
              <div className="text-[5.5px] sm:text-[6.5px] tracking-widest text-neutral-600 font-mono mt-0.5">
                1984 - 2024
              </div>
            </div>

            {/* CENTRAL BRAND TYPOGRAPHY: "La Pizzeatería" */}
            <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-4xl mt-3 sm:mt-1">
              <h1 className="font-['Alex_Brush',cursive] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#181614] leading-tight select-none tracking-normal drop-shadow-sm">
                La Pizzeatería
              </h1>

              {/* AUTHENTIC ENGRAVING FILIGREE / SWASHES UNDER TITLE */}
              <div className="w-56 sm:w-72 md:w-96 -mt-2 sm:-mt-4 text-[#181614]">
                <svg viewBox="0 0 300 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <path
                    d="M 30 25 C 50 10, 80 40, 110 22 C 125 12, 135 30, 150 22"
                    stroke="#181614"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50 24 C 65 32, 90 28, 105 16 C 115 8, 130 18, 140 22"
                    stroke="#181614"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 270 25 C 250 10, 220 40, 190 22 C 175 12, 165 30, 150 22"
                    stroke="#181614"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 250 24 C 235 32, 210 28, 195 16 C 185 8, 170 18, 160 22"
                    stroke="#181614"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <ellipse cx="150" cy="22" rx="14" ry="10" stroke="#181614" strokeWidth="2.2" />
                  <ellipse cx="132" cy="23" rx="10" ry="8" stroke="#181614" strokeWidth="1.8" />
                  <ellipse cx="168" cy="23" rx="10" ry="8" stroke="#181614" strokeWidth="1.8" />
                </svg>
              </div>

              {/* SUBTITLE: TRADICIÓN DE BARRIO · FUNDADA EN 1984 */}
              <p className="mt-3 text-neutral-900 font-serif font-extrabold text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.25em] uppercase">
                MAESTROS PIZZEROS · FUNDADA EN 1984
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PATRIMONIO Y TRADICIÓN EN ESTILO COMPLETO VINTAGE (FULL WIDTH EXTENSION) */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#FAF6EE] border-2 border-[#E54738] shadow-md p-4 sm:p-8 md:p-12 space-y-10">
          
          {/* HEADER STRIP */}
          <div className="border-b-2 border-[#E54738] pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#E54738] font-bold text-xs sm:text-sm uppercase tracking-[0.2em]">
                <Flame className="w-4 h-4 fill-[#E54738]" />
                <span>Crónica de Barrio & Pasión Artesanal</span>
              </div>
              <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl lg:text-6xl text-[#181614] tracking-wide mt-1 uppercase">
                PATRIMONIO Y TRADICIÓN DE LA PIZZEATERÍA
              </h3>
            </div>

            {/* Vintage Stamp Badge */}
            <div className="border-2 border-[#E54738] px-4 py-2 text-center bg-[#FAF6EE] flex-shrink-0">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E54738] block">
                Masa Madre 72H
              </span>
              <span className="font-['Bebas_Neue'] text-xl sm:text-2xl text-[#181614] tracking-wider leading-none">
                100% A LA LEÑA
              </span>
            </div>
          </div>

          {/* VINTAGE NAVIGATION TABS (STYLE MATCHING VINTAGE POSTER / TICKETS) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('historia')}
              className={`p-3 sm:p-4 border-2 text-left transition-all ${
                activeTab === 'historia'
                  ? 'border-[#E54738] bg-[#E54738] text-white shadow-md'
                  : 'border-[#E54738] bg-[#FAF6EE] text-[#181614] hover:bg-[#F3EBDD]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-['Bebas_Neue'] text-lg sm:text-xl tracking-wider">01. ORIGEN & HISTORIA</span>
                <BookOpen className="w-4 h-4" />
              </div>
              <p className={`text-[11px] sm:text-xs mt-1 font-serif line-clamp-1 ${activeTab === 'historia' ? 'text-white/90' : 'text-neutral-700'}`}>
                1984: La primera pala al horno
              </p>
            </button>

            <button
              onClick={() => setActiveTab('gente')}
              className={`p-3 sm:p-4 border-2 text-left transition-all ${
                activeTab === 'gente'
                  ? 'border-[#E54738] bg-[#E54738] text-white shadow-md'
                  : 'border-[#E54738] bg-[#FAF6EE] text-[#181614] hover:bg-[#F3EBDD]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-['Bebas_Neue'] text-lg sm:text-xl tracking-wider">02. NUESTRA GENTE</span>
                <Users className="w-4 h-4" />
              </div>
              <p className={`text-[11px] sm:text-xs mt-1 font-serif line-clamp-1 ${activeTab === 'gente' ? 'text-white/90' : 'text-neutral-700'}`}>
                Maestros pizzeros y mozos
              </p>
            </button>

            <button
              onClick={() => setActiveTab('horno')}
              className={`p-3 sm:p-4 border-2 text-left transition-all ${
                activeTab === 'horno'
                  ? 'border-[#E54738] bg-[#E54738] text-white shadow-md'
                  : 'border-[#E54738] bg-[#FAF6EE] text-[#181614] hover:bg-[#F3EBDD]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-['Bebas_Neue'] text-lg sm:text-xl tracking-wider">03. EL HORNO A LEÑA</span>
                <Flame className="w-4 h-4" />
              </div>
              <p className={`text-[11px] sm:text-xs mt-1 font-serif line-clamp-1 ${activeTab === 'horno' ? 'text-white/90' : 'text-neutral-700'}`}>
                Quebracho y 450°C a la piedra
              </p>
            </button>

            <button
              onClick={() => setActiveTab('mistica')}
              className={`p-3 sm:p-4 border-2 text-left transition-all ${
                activeTab === 'mistica'
                  ? 'border-[#E54738] bg-[#E54738] text-white shadow-md'
                  : 'border-[#E54738] bg-[#FAF6EE] text-[#181614] hover:bg-[#F3EBDD]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-['Bebas_Neue'] text-lg sm:text-xl tracking-wider">04. LA MÍSTICA</span>
                <Award className="w-4 h-4" />
              </div>
              <p className={`text-[11px] sm:text-xs mt-1 font-serif line-clamp-1 ${activeTab === 'mistica' ? 'text-white/90' : 'text-neutral-700'}`}>
                Fugazzeta, fainá y salón
              </p>
            </button>
          </div>

          {/* DYNAMIC CONTENT PANELS IN FULL WIDTH VINTAGE STYLE */}
          <div>
            {/* TAB 1: ORIGEN & HISTORIA */}
            {activeTab === 'historia' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-2 border-[#E54738] p-6 sm:p-8 bg-[#FAF6EE]">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-block border border-[#E54738] px-3 py-1 bg-[#FAF6EE] text-[#E54738] font-bold text-xs uppercase tracking-widest">
                    Fundación y Primer Fuego · 1984
                  </div>

                  <h4 className="font-['Bebas_Neue'] text-3xl sm:text-4xl lg:text-5xl text-[#181614] tracking-wide leading-tight">
                    CUATRO DÉCADAS DEDICADAS A LA PIZZA A LA PIEDRA
                  </h4>

                  <p className="font-serif text-sm sm:text-base text-neutral-800 leading-relaxed">
                    La Pizzeatería nació como un sueño familiar: construir un espacio donde la pizza respetara los tiempos de la harina pura, el calor seco del quebracho y la mística de la mesa compartida. Aquel primer horno, levantado ladrillo por ladrillo con chamota refractaria, sigue encendido todos los días.
                  </p>

                  <p className="font-serif text-sm sm:text-base text-neutral-800 leading-relaxed">
                    A lo largo de 40 años, la receta se mantuvo inmutable: masa madre con fermentación natural de 72 horas, estirada a pulso con la pala de madera directo al suelo del horno, sin atajos ni moldes de lata.
                  </p>

                  {/* 3 Chronology milestones in vintage boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t-2 border-[#E54738]">
                    <div className="border border-[#E54738] p-3 bg-white/60">
                      <span className="font-['Bebas_Neue'] text-2xl text-[#E54738] block leading-none">1984</span>
                      <p className="text-xs font-serif font-bold text-[#181614] mt-1">El Comienzo</p>
                      <p className="text-[11px] text-neutral-700">Se encienden las brasas de quebracho por primera vez.</p>
                    </div>

                    <div className="border border-[#E54738] p-3 bg-white/60">
                      <span className="font-['Bebas_Neue'] text-2xl text-[#E54738] block leading-none">2004</span>
                      <p className="text-xs font-serif font-bold text-[#181614] mt-1">La Consagración</p>
                      <p className="text-[11px] text-neutral-700">Reconocida como punto de culto por sus pizzas doradas al piso.</p>
                    </div>

                    <div className="border border-[#E54738] p-3 bg-white/60">
                      <span className="font-['Bebas_Neue'] text-2xl text-[#E54738] block leading-none">2024</span>
                      <p className="text-xs font-serif font-bold text-[#181614] mt-1">40 Años de Pasión</p>
                      <p className="text-[11px] text-neutral-700">Más de un millón de pizzas horneadas a la perfección.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="border-2 border-[#E54738] p-2 bg-white shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900&auto=format&fit=crop"
                      alt="Historia y salón clásico de La Pizzeatería"
                      className="w-full h-72 sm:h-80 object-cover filter sepia-[0.25] contrast-[1.1]"
                    />
                    <div className="pt-2 text-center">
                      <p className="text-xs font-serif italic text-neutral-700">
                        "El calor del horno une lo que la prisa cotidiana separa."
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E54738] block mt-0.5">
                        Archivo Fotográfico de La Pizzeatería
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: NUESTRA GENTE */}
            {activeTab === 'gente' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-[#E54738] p-6 bg-[#FAF6EE] space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 border-2 border-[#E54738] flex items-center justify-center text-[#E54738] mb-3">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#E54738] block">
                      Oficio Artesanal
                    </span>
                    <h4 className="font-['Bebas_Neue'] text-2xl sm:text-3xl text-[#181614] tracking-wide mt-1">
                      LOS MAESTROS PIZZEROS
                    </h4>
                    <p className="font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed mt-2">
                      Comienzan su faena antes de que salga el sol. Estudian la textura de la harina, calculan la hidratación exacta del bollo y manejan la pala larga con una precisión milimétrica sobre las brasas.
                    </p>
                  </div>
                  <div className="border-t border-[#E54738] pt-2 text-[11px] font-bold text-[#E54738] uppercase tracking-wider">
                    ★ 40 años perfeccionando el toque a la piedra
                  </div>
                </div>

                <div className="border-2 border-[#E54738] p-6 bg-[#FAF6EE] space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 border-2 border-[#E54738] flex items-center justify-center text-[#E54738] mb-3">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#E54738] block">
                      Hospitalidad Porteña
                    </span>
                    <h4 className="font-['Bebas_Neue'] text-2xl sm:text-3xl text-[#181614] tracking-wide mt-1">
                      LOS MOZOS DE SALÓN
                    </h4>
                    <p className="font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed mt-2">
                      La memoria de elefante para recordar qué mesa prefiere cada cliente, cómo le gusta el dorado del queso y qué porción de fainá crocante acompaña su vaso frío sin necesidad de pedirlo.
                    </p>
                  </div>
                  <div className="border-t border-[#E54738] pt-2 text-[11px] font-bold text-[#E54738] uppercase tracking-wider">
                    ★ Calidez, respeto y vocación de servicio
                  </div>
                </div>

                <div className="border-2 border-[#E54738] p-6 bg-[#FAF6EE] space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 border-2 border-[#E54738] flex items-center justify-center text-[#E54738] mb-3">
                      <Heart className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#E54738] block">
                      Comunidad & Familia
                    </span>
                    <h4 className="font-['Bebas_Neue'] text-2xl sm:text-3xl text-[#181614] tracking-wide mt-1">
                      TRES GENERACIONES
                    </h4>
                    <p className="font-serif text-xs sm:text-sm text-neutral-800 leading-relaxed mt-2">
                      Clientes que venían de novios en los años ochenta y hoy comparten la misma mesa junto a sus hijos y nietos. La Pizzeatería es un templo de recuerdos compartidos.
                    </p>
                  </div>
                  <div className="border-t border-[#E54738] pt-2 text-[11px] font-bold text-[#E54738] uppercase tracking-wider">
                    ★ Donde la amistad y la pizza se heredan
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EL HORNO A LEÑA */}
            {activeTab === 'horno' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-2 border-[#E54738] p-6 sm:p-8 bg-[#FAF6EE]">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="border-2 border-[#E54738] p-2 bg-white shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=900&auto=format&fit=crop"
                      alt="Fuego a 450 grados en horno a leña"
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                    <div className="p-2 border-t border-[#E54738] flex justify-between items-center text-xs font-bold text-[#E54738]">
                      <span>LEÑA DE QUEBRACHO COLORADO</span>
                      <span>450°C AL PISO</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
                  <div className="inline-block border border-[#E54738] px-3 py-1 bg-[#FAF6EE] text-[#E54738] font-bold text-xs uppercase tracking-widest">
                    La Fuerza del Fuego Sagrado
                  </div>

                  <h4 className="font-['Bebas_Neue'] text-3xl sm:text-4xl lg:text-5xl text-[#181614] tracking-wide leading-tight">
                    EL CORAZÓN DE PIEDRA QUE NUNCA SE APAGA
                  </h4>

                  <p className="font-serif text-sm sm:text-base text-neutral-800 leading-relaxed">
                    El calor de la leña de quebracho no tiene sustituto. Su combustión lenta y densa transmite una temperatura homogénea al domo de chamota, permitiendo que la masa se hornee por radiación directa en apenas 90 a 120 segundos.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="border border-[#E54738] p-3 bg-white/70">
                      <span className="font-['Bebas_Neue'] text-xl text-[#E54738] block">COCCIÓN A LA PIEDRA</span>
                      <p className="text-xs font-serif text-neutral-700 mt-0.5">Contacto directo sin molde, generando piso crocante y seco.</p>
                    </div>

                    <div className="border border-[#E54738] p-3 bg-white/70">
                      <span className="font-['Bebas_Neue'] text-xl text-[#E54738] block">AROMA AHUMADO REAL</span>
                      <p className="text-xs font-serif text-neutral-700 mt-0.5">El perfume del quebracho se impregna suavemente en el borde.</p>
                    </div>

                    <div className="border border-[#E54738] p-3 bg-white/70">
                      <span className="font-['Bebas_Neue'] text-xl text-[#E54738] block">GRATINADO PERFECTO</span>
                      <p className="text-xs font-serif text-neutral-700 mt-0.5">La reverberación de la llama funde el queso con motas doradas.</p>
                    </div>

                    <div className="border border-[#E54738] p-3 bg-white/70">
                      <span className="font-['Bebas_Neue'] text-xl text-[#E54738] block">DIGESTIÓN LIVIANA</span>
                      <p className="text-xs font-serif text-neutral-700 mt-0.5">Fermentación de 72 horas para disfrutar sin pesadez.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: LA MÍSTICA */}
            {activeTab === 'mistica' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border-2 border-[#E54738] p-5 bg-[#FAF6EE] space-y-2">
                  <div className="text-2xl">🍕</div>
                  <h5 className="font-['Bebas_Neue'] text-2xl text-[#181614] tracking-wide">
                    LA FUGAZZETA RELLENA
                  </h5>
                  <p className="font-serif text-xs text-neutral-800 leading-relaxed">
                    Doble masa a la piedra rebosante de mozzarella artesanal y jamón cocido seleccionado, cubierta con una generosa capa de cebollas caramelizadas al horno.
                  </p>
                </div>

                <div className="border-2 border-[#E54738] p-5 bg-[#FAF6EE] space-y-2">
                  <div className="text-2xl">🫓</div>
                  <h5 className="font-['Bebas_Neue'] text-2xl text-[#181614] tracking-wide">
                    FAINÁ CALIENTE
                  </h5>
                  <p className="font-serif text-xs text-neutral-800 leading-relaxed">
                    Harina de garbanzo pura, aceite de oliva y pimienta negra recién molida. Horneada en chapa de cobre para servir siempre crocante sobre la porción.
                  </p>
                </div>

                <div className="border-2 border-[#E54738] p-5 bg-[#FAF6EE] space-y-2">
                  <div className="text-2xl">🍷</div>
                  <h5 className="font-['Bebas_Neue'] text-2xl text-[#181614] tracking-wide">
                    EL MARIDAJE CLÁSICO
                  </h5>
                  <p className="font-serif text-xs text-neutral-800 leading-relaxed">
                    Vino tinto de la casa en pingüino o cerveza bien fría con copa helada. La combinación que acompaña a los amigos porteños en cada festejo.
                  </p>
                </div>

                <div className="border-2 border-[#E54738] p-5 bg-[#FAF6EE] space-y-2">
                  <div className="text-2xl">⭐</div>
                  <h5 className="font-['Bebas_Neue'] text-2xl text-[#181614] tracking-wide">
                    LA MESA LARGA
                  </h5>
                  <p className="font-serif text-xs text-neutral-800 leading-relaxed">
                    Acá nadie tiene apuro. Las mesas se juntan, las anécdotas se multiplican y la sobremesa se extiende con café y porción de flan casero.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM RETRO BANNER WITH CALL TO ACTION */}
          <div className="border-2 border-[#E54738] p-5 sm:p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border-2 border-[#E54738] flex items-center justify-center text-[#E54738] flex-shrink-0">
                <Star className="w-6 h-6 fill-[#E54738]" />
              </div>
              <div>
                <h5 className="font-['Bebas_Neue'] text-2xl sm:text-3xl text-[#181614] tracking-wide leading-none">
                  "LA PIZZA NO SE APURA: SE VIVE AL CALOR DEL HORNO CON AMIGOS."
                </h5>
                <p className="font-serif text-xs text-neutral-700 mt-1">
                  Máxima de La Pizzeatería · 40 años honrando el fuego y la masa madre.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/menu')}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#E54738] hover:bg-[#C9382A] text-white font-['Bebas_Neue'] tracking-wider text-xl sm:text-2xl px-6 py-3 border border-[#B72C1F] shadow-md transition-all active:scale-95"
            >
              <span>EXPLORAR LA CARTA DE PIZZAS</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StoryAndPhilosophy;
