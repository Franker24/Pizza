import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Phone,
  User,
  Heart,
  ShoppingBag,
  Search,
  ChevronDown,
  X,
  Clock,
  MapPin,
  Sparkles,
  Calendar,
  Utensils,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { OrderMode } from '../types';
import { PizzeateriaLogo } from './PizzeateriaLogo';

interface NavbarProps {
  orderMode: OrderMode;
  setOrderMode: (mode: OrderMode) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenPairing: () => void;
  onNavigateToSection: (sectionId: string) => void;
  favoritesCount?: number;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  orderMode,
  setOrderMode,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation,
  onOpenPairing,
  onNavigateToSection,
  favoritesCount = 0,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPedidosDropdownOpen, setIsPedidosDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll listener for dynamic navbar animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 28);

      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPedidosDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavInicio = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavMenu = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/menu') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/menu');
    }
  };

  const handleNavContacto = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/contacto' || location.pathname === '/contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/contacto');
    }
  };

  const isContactoActive = location.pathname === '/contacto' || location.pathname === '/contact';
  const isMenuActive = location.pathname === '/menu';
  const isInicioActive = location.pathname === '/';

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full select-none transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-black/92 backdrop-blur-xl border-b border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)]'
            : 'bg-black shadow-xl'
        }`}
      >
        
        {/* === TOP ROW: BLACK HEADER WITH PILLS & CENTER LOGO === */}
        <div
          className={`w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 transition-all duration-300 ease-out ${
            isScrolled ? 'py-1 sm:py-1.5' : 'py-2 sm:py-3'
          }`}
        >
          
          {/* ============================================================== */}
          {/* DESKTOP ROW (md and up)                                        */}
          {/* ============================================================== */}
          <div className="hidden md:flex items-center justify-between gap-3">
            
            {/* LEFT: Phone order pill */}
            <div className="flex-shrink-0">
              <a
                href="tel:912772783"
                className={`group flex flex-col items-start justify-center bg-white text-black rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-neutral-50 active:scale-95 ${
                  isScrolled
                    ? 'px-3 sm:px-4 py-1 sm:py-1.5'
                    : 'px-4 sm:px-5 py-1.5 sm:py-2'
                }`}
                title="Llamar para hacer un pedido: 912 77 27 83"
              >
                <span className="text-[10px] sm:text-xs font-medium text-neutral-600 leading-none group-hover:text-black">
                  Pedidos:
                </span>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                  <Phone className={`text-black fill-black transition-all duration-300 ${isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                  <span className={`font-extrabold tracking-tight text-black transition-all duration-300 ${isScrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>
                    912 77 27 83
                  </span>
                </div>
              </a>
            </div>

            {/* CENTER: PIZZEATERIA Animated Mascot Logo */}
            <div
              className={`flex-1 flex justify-center items-center transition-transform duration-300 ease-out ${
                isScrolled ? 'scale-[0.88] sm:scale-90 py-0.5' : 'scale-100 py-1'
              }`}
            >
              <PizzeateriaLogo onClick={handleNavInicio} />
            </div>

            {/* RIGHT: User, Wishlist, Cart & Search pill */}
            <div className="flex-shrink-0">
              <div
                className={`flex items-center bg-white text-black rounded-full shadow-md transition-all duration-300 ${
                  isScrolled
                    ? 'gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2'
                    : 'gap-3 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5'
                }`}
              >
                {/* User Account */}
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-black hover:text-[#E52421] transition-colors p-0.5 cursor-pointer"
                  title="Mi Cuenta / Iniciar Sesión"
                  aria-label="Perfil de usuario"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                </button>

                {/* Favorites / Wishlist */}
                <button
                  onClick={() => setIsFavoritesModalOpen(true)}
                  className="relative text-black hover:text-[#E52421] transition-colors p-0.5 cursor-pointer"
                  title="Mis Pizzas Favoritas"
                  aria-label="Favoritos"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                </button>

                {/* Shopping Bag / Cart */}
                <button
                  onClick={onOpenCart}
                  className="relative text-black hover:text-[#E52421] transition-colors p-0.5 cursor-pointer"
                  title="Ver Carrito de Pedidos"
                  aria-label="Carrito"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>

                {/* Search Icon */}
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="text-black hover:text-[#E52421] transition-colors p-0.5 cursor-pointer"
                  title="Buscar en el Menú"
                  aria-label="Buscar"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                </button>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* MOBILE ROW (below md): ELEGANT, BALANCED, MINIMALIST            */}
          {/* ============================================================== */}
          <div className="flex md:hidden items-center justify-between gap-3 w-full py-1">
            
            {/* LEFT: Clean Minimalist Burger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/10 flex flex-col items-center justify-center gap-1.5 text-white active:scale-90 transition-all cursor-pointer shadow-sm"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              title="Menú"
            >
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'w-4.5 rotate-45 translate-y-[4px]' : 'w-4.5'
                }`}
              />
              <span
                className={`h-[2px] bg-[#F9BA15] rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? 'w-0 opacity-0' : 'w-3'
                }`}
              />
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'w-4.5 -rotate-45 -translate-y-[4px]' : 'w-4.5'
                }`}
              />
            </button>

            {/* CENTER: Prominent, Centered Mascot Logo */}
            <div className="flex-1 flex items-center justify-center">
              <PizzeateriaLogo onClick={handleNavInicio} className="max-w-[150px] sm:max-w-[180px]" />
            </div>

            {/* RIGHT: Phone Call & Cart with Count Badge */}
            <div className="flex items-center gap-2">
              <a
                href="tel:912772783"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#F9BA15] flex items-center justify-center active:scale-90 transition-all shadow-sm"
                title="Llamar para pedir: 912 77 27 83"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenCart}
                className="relative w-10 h-10 rounded-full bg-[#E52421] hover:bg-[#C91E1B] text-white flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-[#E52421]/35 cursor-pointer"
                title="Ver carrito"
                aria-label="Carrito"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[#E52421] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* === BOTTOM ROW: THE VIBRANT GOLDEN YELLOW NAVIGATION BAR (DESKTOP ONLY) === */}
        <div
          className={`hidden md:block w-full bg-[#F9BA15] border-t border-[#E5A80A] shadow-md transition-all duration-300 ${
            isScrolled ? 'shadow-lg py-0' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              className={`flex items-center justify-center gap-6 sm:gap-8 md:gap-14 overflow-x-auto no-scrollbar transition-all duration-300 ${
                isScrolled ? 'py-1.5 sm:py-2' : 'py-2 sm:py-2.5'
              }`}
            >
              
              {/* 1. INICIO */}
              <button
                onClick={handleNavInicio}
                className={`group flex items-center gap-1.5 sm:gap-2 transition-all font-black text-xs sm:text-sm md:text-base uppercase tracking-wider flex-shrink-0 cursor-pointer ${
                  isInicioActive
                    ? 'text-[#991B1B] bg-white/40 px-3 py-1 rounded-full shadow-inner'
                    : 'text-[#E52421] hover:text-[#991B1B]'
                }`}
              >
                <svg
                  viewBox="0 0 32 32"
                  className={`w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none transition-colors ${
                    isInicioActive ? 'stroke-[#991B1B]' : 'stroke-[#E52421] group-hover:stroke-[#991B1B]'
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 14 L4 6 L28 6 L28 14" />
                  <path d="M2 14 L30 14" />
                  <path d="M6 6 L6 14 M12 6 L12 14 M18 6 L18 14 M24 6 L24 14" />
                  <path d="M22 14 L22 26" />
                  <path d="M26 18 L26 22" />
                  <path d="M4 25 L5 21 L16 21 L18 25 Z" fill="#E52421" fillOpacity="0.15" />
                  <circle cx="7" cy="26" r="2" fill="#E52421" />
                  <circle cx="15" cy="26" r="2" fill="#E52421" />
                  <path d="M8 21 L9 18 L13 18 L15 21" />
                </svg>
                <span>INICIO</span>
              </button>

              {/* 2. NUESTRO MENÚ */}
              <button
                onClick={handleNavMenu}
                className={`group flex items-center gap-1.5 sm:gap-2 transition-all font-black text-xs sm:text-sm md:text-base uppercase tracking-wider flex-shrink-0 cursor-pointer ${
                  isMenuActive
                    ? 'text-[#991B1B] bg-white/40 px-3 py-1 rounded-full shadow-inner'
                    : 'text-[#E52421] hover:text-[#991B1B]'
                }`}
              >
                <svg
                  viewBox="0 0 32 32"
                  className={`w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none transition-colors ${
                    isMenuActive ? 'stroke-[#991B1B]' : 'stroke-[#E52421] group-hover:stroke-[#991B1B]'
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="7" y="4" width="18" height="24" rx="2" />
                  <path d="M5 8 L8 8 M5 12 L8 12 M5 16 L8 16 M5 20 L8 20 M5 24 L8 24" />
                  <path d="M12 17 C12 13 20 13 20 17 Z" fill="#E52421" fillOpacity="0.15" />
                  <path d="M10 17 L22 17" />
                  <circle cx="16" cy="12.5" r="0.8" fill="#E52421" />
                  <path d="M11 20 L21 20 M13 23 L19 23" />
                </svg>
                <span>NUESTRO MENÚ</span>
              </button>

              {/* 3. PEDIDOS ONLINE */}
              <div className="relative flex-shrink-0" ref={dropdownRef}>
                <div className="absolute -top-3 sm:-top-3.5 right-0 sm:right-2 transform rotate-[10deg] z-10 pointer-events-none">
                  <span className="bg-[#E52421] text-white font-black text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded shadow-md uppercase tracking-wider border border-white/40 animate-pulse">
                    ¡EN BREVE!
                  </span>
                </div>

                <button
                  onClick={() => setIsPedidosDropdownOpen((prev) => !prev)}
                  className="group flex items-center gap-1.5 sm:gap-2 text-[#E52421] hover:text-[#991B1B] transition-all font-black text-xs sm:text-sm md:text-base uppercase tracking-wider pr-1 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 32 32"
                    className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#E52421] group-hover:stroke-[#991B1B] fill-none transition-colors"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="24" r="3.5" />
                    <circle cx="24" cy="24" r="3.5" />
                    <path d="M8 24 L10 16 L13 16 L17 23 L24 23" />
                    <path d="M15 19 C15 15 22 15 23 19" />
                    <path d="M10 16 L8 9 L11 9" />
                    <rect x="20" y="10" width="8" height="7" rx="1" fill="#E52421" fillOpacity="0.2" />
                  </svg>
                  <span>PEDIDOS ONLINE</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] transition-transform ${
                      isPedidosDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isPedidosDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white text-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 p-3 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 bg-amber-50 rounded-xl border border-amber-200/70 mb-2">
                      <div className="flex items-center gap-1.5 text-[#E52421] font-bold text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>¡Pedidos Web en Desarrollo!</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 mt-0.5">
                        Muy pronto podrás pedir directamente desde la app. Hoy atendemos por teléfono:
                      </p>
                      <a
                        href="tel:912772783"
                        className="mt-1.5 inline-flex items-center gap-1.5 bg-[#E52421] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:bg-[#C91E1B] transition-colors cursor-pointer"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Llamar al 912 77 27 83</span>
                      </a>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setOrderMode('delivery');
                          setIsPedidosDropdownOpen(false);
                          navigate('/menu');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          orderMode === 'delivery'
                            ? 'bg-[#E52421]/10 text-[#E52421]'
                            : 'hover:bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        <span>🛵 Delivery a Domicilio</span>
                        {orderMode === 'delivery' && <span className="text-[10px] font-bold">Activo</span>}
                      </button>

                      <button
                        onClick={() => {
                          setOrderMode('takeaway');
                          setIsPedidosDropdownOpen(false);
                          navigate('/menu');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          orderMode === 'takeaway'
                            ? 'bg-[#E52421]/10 text-[#E52421]'
                            : 'hover:bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        <span>🛍️ Take Away (Retiro en local)</span>
                        {orderMode === 'takeaway' && <span className="text-[10px] font-bold">Activo</span>}
                      </button>

                      <button
                        onClick={() => {
                          setOrderMode('salon');
                          setIsPedidosDropdownOpen(false);
                          onOpenReservation();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          orderMode === 'salon'
                            ? 'bg-[#E52421]/10 text-[#E52421]'
                            : 'hover:bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        <span>🍽️ Salón & Reserva de Mesa</span>
                        {orderMode === 'salon' && <span className="text-[10px] font-bold">Activo</span>}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. CONTACTO */}
              <button
                onClick={handleNavContacto}
                className={`group flex items-center gap-1.5 sm:gap-2 transition-all font-black text-xs sm:text-sm md:text-base uppercase tracking-wider flex-shrink-0 cursor-pointer ${
                  isContactoActive
                    ? 'text-[#991B1B] bg-white/40 px-3 py-1 rounded-full shadow-inner'
                    : 'text-[#E52421] hover:text-[#991B1B]'
                }`}
              >
                <svg
                  viewBox="0 0 32 32"
                  className={`w-5 h-5 sm:w-6 sm:h-6 fill-none transition-colors ${
                    isContactoActive
                      ? 'stroke-[#991B1B]'
                      : 'stroke-[#E52421] group-hover:stroke-[#991B1B]'
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="16" cy="9" rx="7" ry="3.5" fill="#E52421" fillOpacity="0.2" />
                  <path d="M9 9 C9 5 23 5 23 9" />
                  <path d="M12 11 L23 11" strokeWidth="2.5" />
                  <circle cx="16" cy="14" r="4.5" />
                  <path d="M8 28 C8 21 12 20 16 20 C20 20 24 21 24 28" />
                  <path d="M13 22 L16 25 L19 22" />
                  <circle cx="16" cy="24" r="0.8" fill="#E52421" />
                </svg>
                <span>CONTACTO</span>
              </button>

            </nav>
          </div>
        </div>

        {/* Dynamic scroll progress indicator */}
        <div
          className="h-[2px] bg-gradient-to-r from-[#E52421] via-[#F9BA15] to-[#E52421] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, opacity: isScrolled ? 1 : 0 }}
        />

      </header>

      {/* ========================================================================= */}
      {/* ULTRA-MODERN ITALIAN GOURMET MOBILE CANVAS (FULLSCREEN GLASS SHEET)        */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-between bg-[#0A0908]/96 backdrop-blur-2xl text-[#EDE8E1] animate-in fade-in duration-200 select-none overflow-y-auto">
          
          {/* Subtle Ambient Embers */}
          <div className="absolute top-10 right-0 w-80 h-80 bg-[#E52421]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#F9BA15]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Bar of the Open Canvas */}
          <div className="relative z-10 px-6 pt-5 pb-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E52421] animate-pulse" />
              <span className="font-distressed-sub text-sm uppercase tracking-widest text-[#F9BA15] font-black">
                PIZZEATERIA BUENOS AIRES
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Content: Order Mode Selector & Editorial Typography Links */}
          <div className="relative z-10 px-6 py-6 space-y-6 flex-1 flex flex-col justify-center">
            
            {/* Minimalist iOS-style Order Mode Switcher */}
            <div className="bg-[#181614] p-1 rounded-full border border-white/10 grid grid-cols-3 gap-1 shadow-inner text-xs">
              <button
                type="button"
                onClick={() => setOrderMode('delivery')}
                className={`py-2 px-2 rounded-full font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  orderMode === 'delivery'
                    ? 'bg-[#E52421] text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>🛵 Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderMode('takeaway')}
                className={`py-2 px-2 rounded-full font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  orderMode === 'takeaway'
                    ? 'bg-[#E52421] text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>🛍️ Retiro</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderMode('salon')}
                className={`py-2 px-2 rounded-full font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  orderMode === 'salon'
                    ? 'bg-[#E52421] text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>🍽️ Salón</span>
              </button>
            </div>

            {/* Editorial Nav Links (Clean, Big, Architectural) */}
            <nav className="space-y-3 py-2">
              
              {/* 1. INICIO */}
              <button
                type="button"
                onClick={handleNavInicio}
                className="w-full text-left py-2.5 flex items-center justify-between group cursor-pointer border-b border-white/5"
              >
                <div>
                  <h3 className={`font-distressed-headline text-2xl tracking-wide uppercase transition-colors ${
                    isInicioActive ? 'text-[#F9BA15]' : 'text-white group-hover:text-[#F9BA15]'
                  }`}>
                    INICIO
                  </h3>
                  <p className="text-[11px] text-stone-400 font-sans uppercase tracking-wider mt-0.5">
                    Masa Madre & Horno a 485°C
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-[#F9BA15] group-hover:translate-x-1.5 transition-all" />
              </button>

              {/* 2. NUESTRO MENÚ */}
              <button
                type="button"
                onClick={handleNavMenu}
                className="w-full text-left py-2.5 flex items-center justify-between group cursor-pointer border-b border-white/5"
              >
                <div>
                  <h3 className={`font-distressed-headline text-2xl tracking-wide uppercase transition-colors ${
                    isMenuActive ? 'text-[#F9BA15]' : 'text-white group-hover:text-[#F9BA15]'
                  }`}>
                    NUESTRO MENÚ
                  </h3>
                  <p className="text-[11px] text-stone-400 font-sans uppercase tracking-wider mt-0.5">
                    Pizzas, Empanadas & Especialidades
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E52421] text-white text-[10px] font-black uppercase tracking-wider">
                  VER CARTA
                </span>
              </button>

              {/* 3. CONTACTO & MAPA */}
              <button
                type="button"
                onClick={handleNavContacto}
                className="w-full text-left py-2.5 flex items-center justify-between group cursor-pointer border-b border-white/5"
              >
                <div>
                  <h3 className={`font-distressed-headline text-2xl tracking-wide uppercase transition-colors ${
                    isContactoActive ? 'text-[#F9BA15]' : 'text-white group-hover:text-[#F9BA15]'
                  }`}>
                    CONTACTO & SUCURSALES
                  </h3>
                  <p className="text-[11px] text-stone-400 font-sans uppercase tracking-wider mt-0.5">
                    Getafe Centro • Madrid • Las Rozas
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-[#F9BA15] group-hover:translate-x-1.5 transition-all" />
              </button>

              {/* 4. RESERVAR MESA */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full text-left py-2.5 flex items-center justify-between group cursor-pointer border-b border-white/5"
              >
                <div>
                  <h3 className="font-distressed-headline text-2xl tracking-wide uppercase text-white group-hover:text-[#E52421] transition-colors">
                    RESERVAR MESA
                  </h3>
                  <p className="text-[11px] text-stone-400 font-sans uppercase tracking-wider mt-0.5">
                    Salón Climatizado & Terraza
                  </p>
                </div>
                <Calendar className="w-5 h-5 text-[#F9BA15]" />
              </button>

            </nav>

            {/* Direct Dial Call Button */}
            <div className="pt-2">
              <a
                href="tel:912772783"
                className="w-full py-4 rounded-2xl bg-[#E52421] hover:bg-[#C91E1B] active:scale-95 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl shadow-[#E52421]/30 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>PEDIR POR TELÉFONO: 912 77 27 83</span>
              </a>
            </div>

          </div>

          {/* Bottom Utility Bar: Search, Favorites, Profile & Schedule */}
          <div className="relative z-10 px-6 py-4 bg-black/50 border-t border-white/10 space-y-3">
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              >
                <Search className="w-3.5 h-3.5 text-[#F9BA15]" />
                <span>Buscar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsFavoritesModalOpen(true);
                }}
                className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              >
                <Heart className="w-3.5 h-3.5 text-[#E52421]" />
                <span>Favoritas ({favoritesCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsProfileModalOpen(true);
                }}
                className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              >
                <User className="w-3.5 h-3.5 text-stone-300" />
                <span>Mi Cuenta</span>
              </button>
            </div>

            <p className="text-[10px] text-stone-500 text-center tracking-wider uppercase font-mono">
              Martes a Domingo: 19:30 a 00:00 h • Getafe Centro
            </p>

          </div>

        </div>
      )}

      {/* === MODAL: SEARCH IN MENU === */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-[#1C1A18] border border-[#2D2A26] rounded-2xl w-full max-w-lg p-5 shadow-2xl text-[#EDE8E1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D2A26]">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#F9BA15]" />
                <h3 className="font-serif-title font-bold text-lg text-white">
                  Buscar en PIZZEATERIA
                </h3>
              </div>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#25221F] text-[#9E968B] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe el nombre de una pizza o ingrediente..."
                className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F9BA15]"
                autoFocus
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="text-neutral-400 py-1">Sugerencias:</span>
              {['Margherita', 'Pepperoni', 'Fugazzeta', 'Especial', 'Stracciatella'].map((sug) => (
                <button
                  key={sug}
                  onClick={() => {
                    setSearchQuery(sug);
                    setIsSearchModalOpen(false);
                    navigate(`/menu?search=${encodeURIComponent(sug)}`);
                  }}
                  className="bg-[#25221F] hover:bg-[#E52421] text-white px-3 py-1 rounded-lg border border-[#2D2A26] transition-colors cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => {
                  setIsSearchModalOpen(false);
                  navigate('/menu');
                }}
                className="bg-[#F9BA15] hover:bg-[#E5A80A] text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Ver Menú Completo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL: USER ACCOUNT === */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1A18] border border-[#2D2A26] rounded-2xl w-full max-w-sm p-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#F9BA15]/20 text-[#F9BA15] flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-lg text-white">
              Bienvenido a PIZZEATERIA
            </h3>
            <p className="text-xs text-[#9E968B] mt-1">
              Accedé a tus pedidos guardados y beneficios exclusivos.
            </p>

            <div className="mt-5 space-y-2">
              <a
                href="tel:912772783"
                className="w-full flex items-center justify-center gap-2 bg-[#E52421] hover:bg-[#C91E1B] text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Pedir por Teléfono: 912 77 27 83</span>
              </a>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-full bg-[#25221F] hover:bg-[#2D2A26] text-[#EDE8E1] font-medium py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Continuar navegando
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL: FAVORITES === */}
      {isFavoritesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1A18] border border-[#2D2A26] rounded-2xl w-full max-w-sm p-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#E52421]/20 text-[#E52421] flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 fill-[#E52421]" />
            </div>
            <h3 className="font-serif-title font-bold text-lg text-white">
              Tus Pizzas Favoritas
            </h3>
            <p className="text-xs text-[#9E968B] mt-1">
              {favoritesCount === 0
                ? 'Aún no guardaste pizzas en tus favoritas. ¡Explora el menú y haz click en el corazón!'
                : `Tienes ${favoritesCount} pizzas guardadas.`}
            </p>

            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  setIsFavoritesModalOpen(false);
                  onNavigateToSection('menu');
                }}
                className="w-full bg-[#F9BA15] hover:bg-[#E5A80A] text-black font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
              >
                Explorar Nuestro Menú
              </button>
              <button
                onClick={() => setIsFavoritesModalOpen(false)}
                className="w-full bg-[#25221F] hover:bg-[#2D2A26] text-[#EDE8E1] font-medium py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
