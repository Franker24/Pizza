import React from 'react';

interface PizzeateriaLogoProps {
  className?: string;
  onClick?: () => void;
}

export const PizzeateriaLogo: React.FC<PizzeateriaLogoProps> = ({
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-[1.02] ${className}`}
      title="Pizzeateria - Inicio"
    >
      <svg
        viewBox="0 0 380 90"
        className="h-8 sm:h-11 md:h-14 w-auto overflow-visible max-w-[190px] sm:max-w-none transition-all"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === CUTE GARLIC CHARACTER (Top Left) === */}
        <g transform="translate(130, 4) scale(0.75)">
          {/* Garlic body */}
          <path
            d="M16 2 C16 2 24 10 24 18 C24 25 18 29 13 29 C8 29 2 25 2 18 C2 10 10 2 10 2 Z"
            fill="#F3F4F6"
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          {/* Garlic segments lines */}
          <path
            d="M13 2 C13 8 13 22 13 29"
            stroke="#D1D5DB"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M10 5 C7 10 5 18 7 26"
            stroke="#D1D5DB"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M16 5 C19 10 21 18 19 26"
            stroke="#D1D5DB"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Garlic root tip */}
          <path
            d="M11 29 L13 32 L15 29"
            stroke="#9CA3AF"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Eyes */}
          <circle cx="9.5" cy="16" r="1.5" fill="#1F2937" />
          <circle cx="16.5" cy="16" r="1.5" fill="#1F2937" />
          <circle cx="9" cy="15.5" r="0.5" fill="#FFFFFF" />
          <circle cx="16" cy="15.5" r="0.5" fill="#FFFFFF" />
          {/* Smile */}
          <path
            d="M10 20 Q13 23 16 20"
            stroke="#1F2937"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cheeks */}
          <circle cx="7" cy="18" r="1.2" fill="#FCA5A5" opacity="0.8" />
          <circle cx="19" cy="18" r="1.2" fill="#FCA5A5" opacity="0.8" />
        </g>

        {/* === CUTE TOMATO CHARACTER (Top Right) === */}
        <g transform="translate(216, 2) scale(0.85)">
          {/* Tomato arms waving */}
          <path
            d="M4 18 C0 14 -1 10 2 8"
            stroke="#991B1B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M24 18 C28 14 29 10 26 8"
            stroke="#991B1B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Little feet */}
          <path
            d="M9 27 L7 31"
            stroke="#991B1B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19 27 L21 31"
            stroke="#991B1B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Tomato Body */}
          <circle
            cx="14"
            cy="18"
            r="11"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="1.5"
          />
          {/* Tomato Green Stem */}
          <path
            d="M14 7 L14 3 M14 7 L10 5 M14 7 L18 5 M14 7 L12 9 M14 7 L16 9"
            stroke="#16A34A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Eyes */}
          <circle cx="10.5" cy="16" r="1.6" fill="#111827" />
          <circle cx="17.5" cy="16" r="1.6" fill="#111827" />
          <circle cx="10" cy="15.5" r="0.6" fill="#FFFFFF" />
          <circle cx="17" cy="15.5" r="0.6" fill="#FFFFFF" />
          {/* Smile */}
          <path
            d="M11 21 Q14 24 17 21"
            stroke="#111827"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cheeks */}
          <circle cx="8" cy="19" r="1.5" fill="#F87171" />
          <circle cx="20" cy="19" r="1.5" fill="#F87171" />
        </g>

        {/* === "PIZZ" TEXT IN RED === */}
        <text
          x="15"
          y="62"
          fill="#E52421"
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="0.04em"
        >
          PIZZ
        </text>

        {/* === PIZZA CHARACTER (Acting as Center Mascot / 'O' / 'A') === */}
        <g transform="translate(178, 48)">
          {/* Little legs */}
          <path
            d="M-8 24 L-11 34 M8 24 L11 34"
            stroke="#854D0E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Shoes */}
          <ellipse cx="-13" cy="34" rx="4" ry="2.2" fill="#854D0E" />
          <ellipse cx="13" cy="34" rx="4" ry="2.2" fill="#854D0E" />

          {/* Open arms */}
          <path
            d="M-22 0 C-30 -8 -34 2 -27 8"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M22 0 C30 -8 34 2 27 8"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Pizza Crust (outer circle) */}
          <circle
            cx="0"
            cy="0"
            r="26"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="3.5"
          />

          {/* Inner Cheese Base */}
          <circle
            cx="0"
            cy="0"
            r="21.5"
            fill="#FDE047"
          />

          {/* Pepperoni Slices */}
          <circle cx="-10" cy="-12" r="4.2" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
          <circle cx="11" cy="-10" r="3.8" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
          <circle cx="-12" cy="10" r="4" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
          <circle cx="12" cy="11" r="4.2" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />
          <circle cx="0" cy="14" r="3.2" fill="#DC2626" stroke="#B91C1C" strokeWidth="1" />

          {/* Cheerful Cartoon Eyes */}
          {/* Left Eye: Winking or big cartoon eye */}
          <ellipse cx="-6" cy="-2" rx="3.5" ry="4.5" fill="#1E293B" />
          <circle cx="-7.5" cy="-3.5" r="1.3" fill="#FFFFFF" />

          {/* Right Eye: Big open cartoon eye */}
          <ellipse cx="6" cy="-2" rx="3.5" ry="4.5" fill="#1E293B" />
          <circle cx="4.5" cy="-3.5" r="1.3" fill="#FFFFFF" />

          {/* Eyebrows */}
          <path
            d="M-10 -8 Q-6 -11 -2 -8"
            stroke="#92400E"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M2 -8 Q6 -11 10 -8"
            stroke="#92400E"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Big Cheerful Smile with Tongue */}
          <path
            d="M-8 4 Q0 15 8 4 Z"
            fill="#991B1B"
            stroke="#7F1D1D"
            strokeWidth="1.2"
          />
          {/* Tongue */}
          <path
            d="M-4 8 Q0 13 4 8 Q0 6 -4 8 Z"
            fill="#F87171"
          />

          {/* Pink Cheeks */}
          <ellipse cx="-13" cy="2" rx="3" ry="2" fill="#F87171" opacity="0.6" />
          <ellipse cx="13" cy="2" rx="3" ry="2" fill="#F87171" opacity="0.6" />
        </g>

        {/* === "EAT" TEXT IN CYAN / ELECTRIC BLUE === */}
        <text
          x="215"
          y="62"
          fill="#00A3E0"
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="0.04em"
        >
          EAT
        </text>

        {/* === "ERIA" TEXT IN RED === */}
        <text
          x="298"
          y="62"
          fill="#E52421"
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="0.04em"
        >
          ERIA
        </text>
      </svg>
    </div>
  );
};
