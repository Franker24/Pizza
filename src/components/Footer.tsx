import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaLocationDot,
  FaPhone,
  FaClock,
  FaMotorcycle,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
  FaCreditCard,
  FaMoneyBillWave,
  FaQrcode,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaBuildingColumns,
  FaPizzaSlice,
  FaMobileScreen,
  FaArrowRight,
  FaUtensils,
  FaShieldHalved,
  FaHeart,
  FaArrowUp,
} from 'react-icons/fa6';
import { SiMercadopago } from 'react-icons/si';

interface FooterProps {
  onOpenReservation?: () => void;
  onExploreMenu?: () => void;
  onOpenCart?: () => void;
}

interface BranchInfo {
  id: string;
  name: string;
  address: string;
  isDeliveryOnly?: boolean;
  schedule: string;
  phones: string[];
}

const BRANCHES: BranchInfo[] = [
  {
    id: 'recoleta',
    name: 'RECOLETA',
    address: 'Paraná 1249',
    schedule: '7 h a 24 h',
    phones: ['4812-2721'],
  },
  {
    id: 'b-norte',
    name: 'B. NORTE',
    address: 'Uriburu 1305',
    schedule: '7 h a 24 h',
    phones: ['4821-4658'],
  },
  {
    id: 'palermo',
    name: 'PALERMO',
    address: 'Solo delivery',
    isDeliveryOnly: true,
    schedule: '7 h a 24 h',
    phones: ['4800-1112'],
  },
];

export const Footer: React.FC<FooterProps> = ({
  onExploreMenu,
  onOpenCart,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleOrderOnline = (branchName: string) => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      navigate('/menu');
    }
  };

  const handleGoMenu = () => {
    if (onExploreMenu) {
      onExploreMenu();
    } else {
      navigate('/menu');
    }
  };

  return (
    <footer id="contacto" className="w-full select-none overflow-visible relative">
      
      {/* ========================================================================= */}
      {/* 1. TEASER BANNER: "Conocé más opciones en nuestras sucursales" (footer2)  */}
      {/*    PARALLELOGRAM DIV AS DRAWN BY USER WITH PIZZA BREAKING OUT OVER BORDERS */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#F5F1E8] text-white pt-10 sm:pt-16 pb-16 sm:pb-24 lg:pb-20 overflow-visible z-20 border-t border-[#E2DBD0]">
        
        {/* Subtle vintage sketch wallpaper background on the outside area */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M11 11h20v20H11V11zm40 40h20v20H51V51zm0-40h20v20H51V11zM11 51h20v20H11V51z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          
          {/* THE PARALLELOGRAM DIV CONTAINER (Matches the user's sketch) */}
          <div className="relative w-full overflow-visible">
            
            {/* Parallelogram Cast Shadow onto the light background */}
            <div
              className="absolute inset-0 bg-black/25 blur-2xl transform translate-y-6 pointer-events-none"
              style={{
                clipPath: 'polygon(min(65px, 6vw) 0%, 100% 0%, calc(100% - min(65px, 6vw)) 100%, 0% 100%)',
              }}
            />

            {/* THE PARALLELOGRAM DIV (With dark oven slate background) */}
            <div
              className="relative w-full overflow-hidden bg-gradient-to-r from-[#17120F] via-[#241B16] to-[#1A1411] shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
              style={{
                clipPath: 'polygon(min(65px, 6vw) 0%, 100% 0%, calc(100% - min(65px, 6vw)) 100%, 0% 100%)',
              }}
            >
              {/* Internal warm glow */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(ellipse at 75% 50%, rgba(229,36,33,0.35) 0%, transparent 70%)`,
                }}
              />

              {/* Parallelogram Content Inner Layout */}
              <div className="relative z-10 px-6 sm:px-12 md:px-16 lg:px-20 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                
                {/* Left Content Column */}
                <div className="flex-1 text-center lg:text-left space-y-5 max-w-xl z-10">
                  
                  {/* Brushstroke ribbon banner */}
                  <div className="inline-block relative">
                    <div className="px-5 py-2.5 bg-[#E52421] rounded-sm transform -rotate-1 shadow-xl shadow-[#E52421]/30 hover:rotate-0 transition-transform">
                      <span className="font-serif italic font-bold text-lg sm:text-2xl md:text-3xl text-white tracking-wide">
                        Conocé más opciones en nuestras sucursales.
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                    Vení a disfrutar de nuestras pizzas al corte recién salidas del horno de leña, calzones dorados, pastas artesanales y empanadas tradicionales en nuestros salones.
                  </p>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <button
                      type="button"
                      onClick={handleGoMenu}
                      className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F9BA15] hover:bg-[#e6a90e] text-black font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-[#F9BA15]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <FaUtensils className="w-4 h-4 text-black transition-transform group-hover:rotate-12" />
                      <span>Ver menú Sucursales</span>
                      <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <a
                      href="tel:48122721"
                      className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm tracking-wide transition-all backdrop-blur-xs cursor-pointer active:scale-95"
                    >
                      <FaPhone className="w-3.5 h-3.5 text-[#F9BA15]" />
                      <span>Atención telefónica</span>
                    </a>
                  </div>
                </div>

                {/* Right Placeholder to hold layout space for large breaking-out pizza */}
                <div className="w-full lg:w-[380px] xl:w-[440px] h-48 sm:h-56 lg:h-64 flex-shrink-0" />
              </div>
            </div>

            {/* SVG STROKE BORDER FOR THE PARALLELOGRAM DIV (Outlines the exact shape drawn by user) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              preserveAspectRatio="none"
              viewBox="0 0 1000 500"
            >
              {/* Outer Golden/Red Accent Stroke */}
              <polygon
                points="65,2 998,2 935,498 2,498"
                fill="none"
                stroke="#E52421"
                strokeWidth="3.5"
                className="filter drop-shadow-[0_0_8px_rgba(229,36,33,0.4)]"
              />
              {/* Inner Decorative Warm Line */}
              <polygon
                points="72,8 990,8 928,492 10,492"
                fill="none"
                stroke="#F9BA15"
                strokeWidth="1.5"
                opacity="0.5"
              />
            </svg>

            {/* ==================================================================== */}
            {/* 2. THE PIZZA BREAKING OUT OVER THE BORDERS (Without any wooden board) */}
            {/* ==================================================================== */}
            <div className="absolute right-0 sm:right-2 md:right-4 lg:-right-8 xl:-right-14 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              
              {/* Hand-drawn chalk rays & bursts expanding outwards past the border */}
              <div className="absolute -top-12 sm:-top-16 -left-8 sm:-left-12 pointer-events-none text-[#F9BA15] opacity-90 animate-pulse">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
                  <line x1="15" y1="60" x2="3" y2="55" />
                  <line x1="25" y1="35" x2="8" y2="15" />
                  <line x1="50" y1="20" x2="45" y2="3" />
                  <line x1="75" y1="35" x2="92" y2="15" />
                  <line x1="85" y1="60" x2="97" y2="55" />
                </svg>
              </div>

              {/* Floating Hot Steam Wisps breaking through the top boundary */}
              <div className="absolute -top-16 sm:-top-24 left-1/4 pointer-events-none text-[#8A7968]/70 animate-pulse">
                <svg width="60" height="70" viewBox="0 0 50 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M15 50 Q 5 35, 20 25 T 15 5" opacity="0.6" />
                  <path d="M30 55 Q 40 40, 25 30 T 35 10" opacity="0.8" />
                </svg>
              </div>

              {/* The Real Artisan Pizza directly breaking out without any wooden board */}
              <div className="relative w-72 sm:w-96 md:w-[420px] lg:w-[480px] xl:w-[540px] aspect-square flex items-center justify-center group cursor-pointer transition-all duration-700 ease-out transform -rotate-6 hover:rotate-0 hover:scale-108">
                
                {/* Natural contact shadow projecting onto both the parallelogram and the light background outside */}
                <div className="absolute inset-6 rounded-full bg-black/40 blur-[24px] transform translate-y-12 translate-x-4 group-hover:translate-y-16 group-hover:blur-[30px] group-hover:bg-black/50 transition-all duration-500 pointer-events-none" />

                {/* Real Photographic Pizza breaking out over the borders */}
                <div className="relative z-10 w-[94%] h-[94%] flex items-center justify-center transform transition-transform duration-700 group-hover:scale-105">
                  <img
                    src="/pizza-artisan-full.webp"
                    alt="Pizza artesanal recién horneada saliendo de los bordes"
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_30px_50px_rgba(229,36,33,0.4)] transition-all duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Golden Badge floating on the pizza */}
                <div className="absolute -bottom-2 sm:-bottom-4 right-6 sm:right-10 z-30 px-3.5 py-1.5 rounded-full bg-[#F9BA15] text-black font-black text-[10px] sm:text-xs tracking-wider uppercase shadow-xl border-2 border-black/80 transform rotate-6 group-hover:rotate-0 transition-transform">
                  🔥 ¡Horno de leña 450°!
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. SUCURSALES SECTION: Recoleta, B. Norte, Palermo (footer1)               */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#F5F1E8] text-[#1F1B18] pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#E2DBD0] z-10">
        
        {/* Subtle vintage sketch wallpaper background */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M11 11h20v20H11V11zm40 40h20v20H51V51zm0-40h20v20H51V11zM11 51h20v20H11V51z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Sucursales Header Ribbon with Triangle Ends */}
          <div className="relative inline-flex items-center justify-center mb-2">
            {/* Left Ribbon End */}
            <div
              className="w-4 sm:w-6 h-10 sm:h-12 bg-[#B81D1A] shadow-md transform -translate-x-1"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            
            {/* Center Ribbon Body */}
            <div className="px-8 sm:px-14 py-2 sm:py-3 bg-[#E52421] shadow-xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-white uppercase drop-shadow-sm">
                Sucursales
              </h2>
            </div>

            {/* Right Ribbon End */}
            <div
              className="w-4 sm:w-6 h-10 sm:h-12 bg-[#B81D1A] shadow-md transform translate-x-1"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5A5247] font-medium mt-1 mb-4 text-center">
            ¿Cuál es tu sucursal más cercana?
          </p>

          {/* Whimsical curved arrows pointing to the 3 branch cards */}
          <div className="w-full max-w-2xl hidden md:flex items-center justify-between px-12 mb-6 text-[#756A5B]">
            {/* Left curved arrow */}
            <svg width="45" height="40" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-12">
              <path d="M 40 5 Q 20 15, 10 32" />
              <polyline points="5 22, 10 33, 22 31" />
            </svg>

            {/* Center straight down arrow */}
            <svg width="25" height="40" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="15" y1="5" x2="15" y2="33" />
              <polyline points="7 25, 15 34, 23 25" />
            </svg>

            {/* Right curved arrow */}
            <svg width="45" height="40" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-12">
              <path d="M 10 5 Q 30 15, 40 32" />
              <polyline points="28 31, 40 33, 45 22" />
            </svg>
          </div>

          {/* THE 3 BRANCH CARDS */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 mt-2">
            {BRANCHES.map((branch) => {
              return (
                <div
                  key={branch.id}
                  className="relative group rounded-2xl bg-[#181513] text-white shadow-2xl overflow-hidden border border-[#2B2622] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-black/50"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 0%, #29241F 0%, #181513 85%)`,
                  }}
                >
                  {/* Top Branch Name Tag */}
                  <div className="w-full bg-[#E52421] py-2.5 px-4 text-center shadow-md">
                    <span className="font-sans font-black text-sm sm:text-base tracking-widest uppercase text-white drop-shadow-xs">
                      {branch.name}
                    </span>
                  </div>

                  {/* Card Main Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col items-center text-center">
                    
                    {/* Location Pin or Delivery Icon */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#F9BA15] shadow-inner">
                        {branch.isDeliveryOnly ? (
                          <FaMobileScreen className="w-5 h-5" />
                        ) : (
                          <FaLocationDot className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {branch.address}
                      </span>
                    </div>

                    {/* Schedule Badge (7 h a 24 h) */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-semibold mb-6">
                      <FaClock className="w-3 h-3 text-[#F9BA15]" />
                      <span>{branch.schedule}</span>
                    </div>

                    {/* Phone Call Buttons */}
                    <div className="w-full space-y-2.5 mb-6">
                      {branch.phones.map((phone, pIdx) => {
                        const cleanPhone = phone.replace('-', '');
                        return (
                          <a
                            key={pIdx}
                            href={`tel:${cleanPhone}`}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F9BA15] hover:bg-[#ffc82a] text-black font-black text-sm sm:text-base tracking-wide shadow-md shadow-[#F9BA15]/20 transition-all duration-200 active:scale-98 cursor-pointer"
                          >
                            <FaPhone className="w-3.5 h-3.5 text-black" />
                            <span>¡Llamá! {phone}</span>
                          </a>
                        );
                      })}
                    </div>

                    {/* Divider line */}
                    <div className="w-full h-px bg-white/15 mb-6" />

                    {/* Pedí online Button */}
                    <button
                      type="button"
                      onClick={() => handleOrderOnline(branch.name)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E52421] hover:bg-[#c91d1a] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-[#E52421]/25 transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                    >
                      <FaMotorcycle className="w-4 h-4 text-white" />
                      <span>Pedí online</span>
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. SEGUINOS & MÉTODOS DE PAGO SECTION                                     */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#12100E] text-[#EDE8E1] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-[#29231F]">
            
            {/* COLUMN 1: Brand & Philosophy (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <FaPizzaSlice className="w-6 h-6 text-[#E52421]" />
                <span className="font-serif font-black text-2xl tracking-tight text-white">
                  LA PIZZEATERÍA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
                Auténtica pizza horneada a la leña, masa madre con fermentación natural de 72 horas e ingredientes nobles. Tradición italiana con la pasión de Buenos Aires.
              </p>
              
              <div className="flex items-center gap-3 text-xs text-stone-400 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1F1B18] border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Horario continuo 7:00 a 24:00 hs
                </span>
              </div>
            </div>

            {/* COLUMN 2: SEGUINOS (Follow us) (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E52421]" />
                Seguinos
              </h4>
              <p className="text-xs text-stone-400">
                Enterate de nuestras promociones del día, lanzamientos y sorteos en redes:
              </p>
              
              {/* Social Media React Icons */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E1A17] hover:bg-[#E52421] text-stone-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="Instagram @pizzeateria"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E1A17] hover:bg-[#1877F2] text-stone-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="Facebook /pizzeateria"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E1A17] hover:bg-black text-stone-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="TikTok @pizzeateria"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/549112772783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E1A17] hover:bg-[#25D366] text-stone-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="WhatsApp Pedidos"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E1A17] hover:bg-[#1DA1F2] text-stone-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="X @pizzeateria"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* COLUMN 3: MÉTODOS DE PAGO (Payment Methods) (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F9BA15]" />
                Métodos de pago
              </h4>
              <p className="text-xs text-stone-400">
                Aceptamos todos los medios de pago para delivery, take away y consumo en salón:
              </p>

              {/* Payment Methods Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                
                {/* Mercado Pago */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-[#009EE3]/50 transition-colors">
                  <SiMercadopago className="w-5 h-5 text-[#009EE3] flex-shrink-0" />
                  <span className="text-[11px] font-bold text-stone-200">Mercado Pago</span>
                </div>

                {/* Visa */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-[#1A1F71]/60 transition-colors">
                  <FaCcVisa className="w-5 h-5 text-[#2566AF] flex-shrink-0" />
                  <span className="text-[11px] font-bold text-stone-200">Visa</span>
                </div>

                {/* Mastercard */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-[#EB001B]/50 transition-colors">
                  <FaCcMastercard className="w-5 h-5 text-[#EB001B] flex-shrink-0" />
                  <span className="text-[11px] font-bold text-stone-200">Mastercard</span>
                </div>

                {/* American Express */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-[#006FCF]/50 transition-colors">
                  <FaCcAmex className="w-5 h-5 text-[#006FCF] flex-shrink-0" />
                  <span className="text-[11px] font-bold text-stone-200">Amex</span>
                </div>

                {/* Débito & Crédito */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-white/30 transition-colors">
                  <FaCreditCard className="w-4 h-4 text-[#F9BA15] flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-stone-200">Débito / Crédito</span>
                </div>

                {/* Efectivo */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-emerald-500/50 transition-colors">
                  <FaMoneyBillWave className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-stone-200">Efectivo</span>
                </div>

                {/* QR / Modo */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-[#F9BA15]/50 transition-colors">
                  <FaQrcode className="w-4 h-4 text-[#F9BA15] flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-stone-200">QR / MODO</span>
                </div>

                {/* Transferencia bancaria */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1C1815] border border-white/10 shadow-xs hover:border-stone-400 transition-colors">
                  <FaBuildingColumns className="w-4 h-4 text-stone-300 flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-stone-200">Transferencia</span>
                </div>

              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-0.5">
                <FaShieldHalved className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cobro seguro al recibir o mediante pasarela online cifrada.</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 4. MODERNIZED BOTTOM COPYRIGHT & LEGAL BAR                                */}
          {/* ========================================================================= */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
            
            {/* Left side: Brand identity & copyright info */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#E52421] animate-pulse" />
                <span>Masa Madre 72hs • Horno a Leña</span>
              </div>
              <p className="text-stone-400">
                © {new Date().getFullYear()} <strong className="text-white font-bold">Pizzeatería Buenos Aires</strong>. Todos los derechos reservados.
              </p>
            </div>

            {/* Right side: Modern interactive links & Scroll to Top button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="px-4 py-2 rounded-xl bg-[#1C1815] hover:bg-[#29231F] text-stone-300 hover:text-white border border-white/10 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <FaPizzaSlice className="w-3.5 h-3.5 text-[#E52421]" />
                <span>Nuestra Carta</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/contacto')}
                className="px-4 py-2 rounded-xl bg-[#1C1815] hover:bg-[#29231F] text-stone-300 hover:text-white border border-white/10 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <FaLocationDot className="w-3.5 h-3.5 text-[#F9BA15]" />
                <span>Contacto & Sucursales</span>
              </button>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 rounded-xl bg-[#E52421] hover:bg-[#BA0C0C] text-white font-extrabold shadow-md shadow-[#E52421]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                title="Volver arriba"
              >
                <span>Subir</span>
                <FaArrowUp className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>
      </section>

    </footer>
  );
};

export default Footer;
