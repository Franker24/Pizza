import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { X } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '34912772783',
  defaultMessage = '¡Hola! Me gustaría hacer un pedido o una consulta en La Pizzeatería.',
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end select-none">
      
      {/* Speech Bubble / Tooltip */}
      {showTooltip && (
        <div className="mb-2 hidden sm:flex items-center gap-2 bg-[#1C1A18] text-white text-xs font-semibold px-3.5 py-2 rounded-2xl border border-white/15 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>¿Tenés dudas o querés pedir? <strong>¡Escribinos!</strong></span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-white p-0.5 ml-1 cursor-pointer transition-colors"
            title="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Circular WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20BA59] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Contactar por WhatsApp"
        title="Contactar directamente por WhatsApp"
      >
        {/* Radar Ring Glow Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:rotate-6" />

        {/* Active badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E52421] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-black">
          1
        </span>
      </a>

    </div>
  );
};

export default FloatingWhatsApp;
