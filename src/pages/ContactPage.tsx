import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Utensils,
  Calendar,
  Sparkles,
  ExternalLink,
  Navigation,
  Send,
} from 'lucide-react';
import { Footer } from '../components/Footer';

interface ContactPageProps {
  onOpenReservation?: () => void;
  onOpenCart?: () => void;
}

interface Branch {
  id: string;
  name: string;
  badge: string;
  address: string;
  city: string;
  phone: string;
  scheduleSalon: string;
  scheduleDelivery: string;
  mapsQuery: string;
  embedUrl: string;
}

const BRANCHES: Branch[] = [
  {
    id: 'getafe',
    name: 'Getafe Centro',
    badge: 'Local Principal & Salón',
    address: 'Calle Madrid 42',
    city: 'Getafe Centro, Madrid',
    phone: '912 77 27 83',
    scheduleSalon: 'Mar a Dom: 19:30 a 00:00 h',
    scheduleDelivery: 'Mar a Dom: 19:30 a 23:45 h',
    mapsQuery: 'Calle Madrid 42, Getafe, Madrid, España',
    embedUrl: 'https://maps.google.com/maps?q=Calle+Madrid+42+Getafe+Madrid&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  {
    id: 'madrid',
    name: 'Madrid Centro',
    badge: 'Salón & Terraza',
    address: 'Paseo de la Castellana 112',
    city: 'Chamberí / Centro, Madrid',
    phone: '914 55 18 20',
    scheduleSalon: 'Mar a Dom: 19:30 a 00:00 h',
    scheduleDelivery: 'Mar a Dom: 19:30 a 23:45 h',
    mapsQuery: 'Paseo de la Castellana 112, Madrid, España',
    embedUrl: 'https://maps.google.com/maps?q=Paseo+de+la+Castellana+112+Madrid&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  {
    id: 'las-rozas',
    name: 'Las Rozas',
    badge: 'Delivery Express & Salón',
    address: 'Calle Real 28',
    city: 'Las Rozas de Madrid',
    phone: '916 33 45 10',
    scheduleSalon: 'Mar a Dom: 19:30 a 00:00 h',
    scheduleDelivery: 'Mar a Dom: 19:30 a 23:45 h',
    mapsQuery: 'Calle Real 28, Las Rozas, Madrid, España',
    embedUrl: 'https://maps.google.com/maps?q=Calle+Real+28+Las+Rozas+Madrid&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenReservation,
  onOpenCart,
}) => {
  const navigate = useNavigate();

  // Trigger smooth entrance animation on page load
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Active branch for full-width map
  const [activeBranchId, setActiveBranchId] = useState<string>('getafe');
  const [isMapChanging, setIsMapChanging] = useState<boolean>(false);
  const activeBranch = BRANCHES.find((b) => b.id === activeBranchId) || BRANCHES[0];

  const handleBranchChange = (branchId: string) => {
    if (branchId === activeBranchId) return;
    setIsMapChanging(true);
    setActiveBranchId(branchId);
    setTimeout(() => {
      setIsMapChanging(false);
    }, 280);
  };

  // Contact form state
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    branch: 'getafe',
    subject: 'general',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#EDE8E1] flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC HEADER WITH SLATE PIZZA BACKDROP & DISTRESSED TITLE */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-center select-none">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=2400&auto=format&fit=crop"
            alt="Pizzería Artesanal"
            className={`w-full h-full object-cover object-center filter brightness-75 contrast-125 transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-105 opacity-40' : 'scale-100 opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-black/70 to-black/85" />
        </div>

        {/* Ambient ember glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#BA0C0C]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#F9BA15]/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.2s' }} />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F9BA15] text-xs font-bold uppercase tracking-widest transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E52421] animate-pulse" />
            <span>ESTAMOS PARA ATENDERTE</span>
          </div>

          <div
            className={`transition-all duration-700 delay-100 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <h1 className="font-distressed-headline text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-wide leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              CONTACTO & RESERVAS
            </h1>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="font-distressed-sub text-sm sm:text-lg text-stone-300 uppercase tracking-widest max-w-2xl mx-auto drop-shadow-md">
              VISITANOS EN NUESTRAS 3 SUCURSALES • ESCRIBINOS
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT BOX (FORM & INFORMATION) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left Column: Contact Form with Uiverse.io Input Groups (7 cols) */}
          <div
            className={`lg:col-span-7 bg-[#181614] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl transition-all duration-700 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="space-y-1.5 mb-6 sm:mb-8">
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#F9BA15] tracking-widest uppercase">
                FORMULARIO DE CONTACTO
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                Envianos tu consulta o sugerencia
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-light">
                Completá tus datos y te responderemos a la brevedad.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 duration-500">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg sm:text-xl font-bold text-white">¡Mensaje Recibido con Éxito!</h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                  Muchas gracias por comunicarte con nosotros. Nos pondremos en contacto contigo a través de {formState.phone} o {formState.email}.
                </p>
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: '',
                        phone: '',
                        email: '',
                        branch: 'getafe',
                        subject: 'general',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/menu')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#BA0C0C] hover:bg-[#D41010] text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-[#BA0C0C]/40"
                  >
                    Ver la Carta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                
                {/* Row 1: Nombre y Teléfono (Uiverse.io by Maximinodotpy) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Name Input */}
                  <div className="inputGroup">
                    <input
                      type="text"
                      id="name"
                      required
                      autoComplete="off"
                      placeholder=" "
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                    <label htmlFor="name">Nombre y Apellido *</label>
                  </div>

                  {/* Phone Input */}
                  <div className="inputGroup">
                    <input
                      type="tel"
                      id="phone"
                      required
                      autoComplete="off"
                      placeholder=" "
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                    <label htmlFor="phone">Teléfono / WhatsApp *</label>
                  </div>
                </div>

                {/* Row 2: Email y Sucursal (Uiverse.io by Maximinodotpy) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Email Input */}
                  <div className="inputGroup">
                    <input
                      type="email"
                      id="email"
                      autoComplete="off"
                      placeholder=" "
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                    <label htmlFor="email">Correo Electrónico</label>
                  </div>

                  {/* Branch Select */}
                  <div className="inputGroup">
                    <select
                      id="branch"
                      required
                      value={formState.branch}
                      onChange={(e) => {
                        setFormState({ ...formState, branch: e.target.value });
                        handleBranchChange(e.target.value);
                      }}
                    >
                      {BRANCHES.map((b) => (
                        <option key={b.id} value={b.id} className="bg-[#201D1A] text-white">
                          {b.name} ({b.city})
                        </option>
                      ))}
                    </select>
                    <label htmlFor="branch">Sucursal</label>
                  </div>
                </div>

                {/* Row 3: Motivo */}
                <div className="inputGroup">
                  <select
                    id="subject"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  >
                    <option value="general" className="bg-[#201D1A] text-white">Consulta General</option>
                    <option value="reserva" className="bg-[#201D1A] text-white">Reserva Especial o Eventos</option>
                    <option value="alergenos" className="bg-[#201D1A] text-white">Consulta de Alérgenos / Sin TACC</option>
                    <option value="pedido" className="bg-[#201D1A] text-white">Dudas sobre un Pedido</option>
                    <option value="empleo" className="bg-[#201D1A] text-white">Trabajar con nosotros</option>
                    <option value="sugerencia" className="bg-[#201D1A] text-white">Sugerencia o Felicitación</option>
                  </select>
                  <label htmlFor="subject">Motivo del Contacto</label>
                </div>

                {/* Row 4: Mensaje Textarea */}
                <div className="inputGroup">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder=" "
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="resize-none"
                  />
                  <label htmlFor="message">Tu Mensaje o Detalle *</label>
                </div>

                {/* SUBMIT BUTTON (From Uiverse.io by nathAd17) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex justify-center gap-2 items-center mx-auto shadow-2xl text-sm sm:text-base md:text-lg bg-[#201D1A] text-white backdrop-blur-md font-bold isolation-auto border-white/20 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#BA0C0C] hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 sm:px-8 py-3.5 overflow-hidden border-2 rounded-full group cursor-pointer active:scale-95 transition-all w-full sm:w-auto"
                  >
                    <span>{isSending ? 'Enviando Mensaje...' : 'Enviar Mensaje'}</span>
                    
                    {/* SVG Arrow from Uiverse.io by nathAd17 */}
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 justify-end group-hover:rotate-90 group-hover:bg-white text-white group-hover:text-black ease-linear duration-300 rounded-full border border-white/30 group-hover:border-none p-1.5 rotate-45 transition-all flex-shrink-0"
                      viewBox="0 0 16 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        className="fill-current"
                      />
                    </svg>
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Horarios Generales, Reserva & Menú con animaciones escalonadas (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: Horarios */}
            <div
              className={`bg-[#181614] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl hover:-translate-y-1 hover:border-white/25 transition-all duration-500 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3 text-[#F9BA15]">
                <Clock className="w-6 h-6 animate-pulse" />
                <h3 className="font-bold text-lg text-white">Horarios de Atención</h3>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-stone-300">Salón & Take Away</span>
                  <span className="font-bold text-white">Mar a Dom: 19:30 a 00:00 h</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-stone-300">Reparto a Domicilio</span>
                  <span className="font-bold text-white">Mar a Dom: 19:30 a 23:45 h</span>
                </div>
                <div className="flex justify-between items-center py-2 text-[#E52421]">
                  <span>Lunes</span>
                  <span className="font-bold">Cerrado por descanso</span>
                </div>
              </div>
            </div>

            {/* Card 2: Reserva */}
            <div
              className={`bg-[#181614] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl hover:-translate-y-1 hover:border-white/25 transition-all duration-500 delay-400 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3 text-[#E52421]">
                <Calendar className="w-6 h-6" />
                <h3 className="font-bold text-lg text-white">¿Querés asegurar tu mesa?</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Reservá de forma online o comunicate con la sucursal de tu preferencia para eventos grupales o mesas grandes.
              </p>
              {onOpenReservation && (
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#F9BA15]" />
                  <span>Reservar Mesa Online</span>
                </button>
              )}
            </div>

            {/* Card 3: Carta y Pedido */}
            <div
              className={`bg-gradient-to-br from-[#BA0C0C]/25 to-[#E52421]/10 border border-[#E52421]/30 rounded-3xl p-6 text-center space-y-3 shadow-xl hover:-translate-y-1 transition-all duration-500 delay-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h4 className="font-bold text-base text-white">Hacé tu pedido ahora</h4>
              <p className="text-xs text-stone-300">
                Mirá nuestra carta con fotos de cada pizza y lista de precios oficial.
              </p>
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#BA0C0C] hover:bg-[#D41010] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Explorar la Carta</span>
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. FULL-WIDTH MAP SECTION WITH 3 BRANCH OPTIONS (BELOW CONTACT BOX)       */}
      {/* ========================================================================= */}
      <section
        className={`w-full bg-[#0E0C0B] border-t border-white/10 py-14 sm:py-20 transition-all duration-700 delay-400 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F9BA15] text-xs font-mono font-bold tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#E52421] animate-bounce" />
            <span>NUESTRAS 3 SUCURSALES</span>
          </div>

          <h2 className="font-distressed-headline text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-wide">
            ENCONTRANOS EN TU SUCURSAL MÁS CERCANA
          </h2>

          <p className="text-stone-400 text-xs sm:text-sm font-light max-w-2xl mx-auto">
            Seleccioná una de nuestras 3 sucursales para ver su ubicación en tiempo real en el mapa, teléfonos directos y cómo llegar.
          </p>

          {/* 3 Branch Selector Tabs with Micro-interaction */}
          <div className="pt-4 grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            {BRANCHES.map((branch) => {
              const isSelected = branch.id === activeBranchId;
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => handleBranchChange(branch.id)}
                  className={`relative flex items-center justify-center gap-2.5 px-5 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 w-full sm:w-auto ${
                    isSelected
                      ? 'bg-[#BA0C0C] text-white shadow-[#BA0C0C]/50 scale-[1.02] sm:scale-105 ring-2 ring-white/40'
                      : 'bg-[#1C1A18] text-stone-300 hover:text-white hover:bg-neutral-800 border border-white/10'
                  }`}
                >
                  <MapPin className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'text-[#F9BA15] scale-110' : 'text-stone-400'}`} />
                  <span>{branch.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#F9BA15] animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Branch Info Ribbon (Card above the map) */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-6">
          <div className="bg-[#1C1A18] border border-white/10 rounded-2xl p-4 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 shadow-2xl transition-all duration-300 hover:border-white/20">
            
            <div className="space-y-1.5 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E52421]/20 border border-[#E52421]/30 text-[#E52421] text-[10px] font-black uppercase tracking-wider">
                  {activeBranch.badge}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-400 font-mono">• {activeBranch.city}</span>
              </div>
              
              <h3 className="text-lg sm:text-2xl font-bold text-white">
                {activeBranch.name}: {activeBranch.address}
              </h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-stone-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F9BA15] flex-shrink-0" />
                  <span>{activeBranch.scheduleSalon}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E52421] flex-shrink-0" />
                  <span>Tel: <strong>{activeBranch.phone}</strong></span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
              <a
                href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-[#F9BA15]" />
                <span>Llamar al local</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeBranch.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#BA0C0C] hover:bg-[#D41010] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[#BA0C0C]/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Cómo Llegar (GPS)</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            </div>

          </div>
        </div>

        {/* FULL-WIDTH INTERACTIVE GOOGLE MAP */}
        <div className="w-full relative overflow-hidden bg-neutral-900 shadow-2xl border-y border-white/10">
          {/* Mobile tip */}
          <div className="sm:hidden text-center py-1.5 px-3 bg-black/70 text-[10px] text-stone-400 border-b border-white/10 flex items-center justify-center gap-1.5">
            <span>💡</span>
            <span>Usá dos dedos para desplazarte por el mapa</span>
          </div>

          <div className="w-full h-[320px] sm:h-[460px] md:h-[580px]">
            <iframe
              key={activeBranch.id}
              src={activeBranch.embedUrl}
              title={`Mapa de ubicación ${activeBranch.name}`}
              className={`w-full h-full border-0 filter contrast-105 transition-opacity duration-300 ${
                isMapChanging ? 'opacity-30' : 'opacity-100'
              }`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <Footer
        onOpenReservation={onOpenReservation}
        onExploreMenu={() => navigate('/menu')}
        onOpenCart={onOpenCart}
      />

    </div>
  );
};

export default ContactPage;
