import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Flame, Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface PairingAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddComboToCart: (items: MenuItem[]) => void;
}

export const PairingAssistantModal: React.FC<PairingAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddComboToCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 'result'>(1);
  const [guests, setGuests] = useState('2');
  const [flavorProfile, setFlavorProfile] = useState('gourmet');
  const [drinkType, setDrinkType] = useState('vino');

  // Generate recommended combination based on answers
  const getRecommendedItems = (): MenuItem[] => {
    const list: MenuItem[] = [];

    // Main Pizza
    if (flavorProfile === 'gourmet') {
      const p = MENU_ITEMS.find((i) => i.id === 'pizza-de-temporada') || MENU_ITEMS[0];
      list.push(p);
    } else if (flavorProfile === 'intenso') {
      const p = MENU_ITEMS.find((i) => i.id === 'pepperoni-hot-honey') || MENU_ITEMS[1];
      list.push(p);
    } else if (flavorProfile === 'veggie') {
      const p = MENU_ITEMS.find((i) => i.id === 'cuatro-quesos') || MENU_ITEMS[2];
      list.push(p);
    } else {
      const p = MENU_ITEMS.find((i) => i.id === 'margherita-clasica') || MENU_ITEMS[2];
      list.push(p);
    }

    // Secondary item if 2 or more
    if (guests === '2' || guests === 'grupo') {
      if (flavorProfile === 'intenso') {
        const ent = MENU_ITEMS.find((i) => i.id === 'provoleta-chapa');
        if (ent) list.push(ent);
      } else {
        const ent = MENU_ITEMS.find((i) => i.id === 'burrata-artesanal');
        if (ent) list.push(ent);
      }
    }

    // Additional pizza if group
    if (guests === 'grupo') {
      const fug = MENU_ITEMS.find((i) => i.id === 'fugazzeta-rellena');
      if (fug) list.push(fug);
    }

    // Drink
    if (drinkType === 'vino') {
      const d = MENU_ITEMS.find((i) => i.id === 'vino-malbec');
      if (d) list.push(d);
    } else if (drinkType === 'cerveza') {
      const d = MENU_ITEMS.find((i) => i.id === 'cerveza-ipa');
      if (d) list.push(d);
    } else if (drinkType === 'coctel') {
      const d = MENU_ITEMS.find((i) => i.id === 'negroni-forno');
      if (d) list.push(d);
    } else {
      const d = MENU_ITEMS.find((i) => i.id === 'limonada-casera');
      if (d) list.push(d);
    }

    // Dessert
    const des = MENU_ITEMS.find((i) => i.id === 'tiramisu-tradicional');
    if (des && (guests === '2' || guests === 'grupo')) list.push(des);

    return list;
  };

  const recommendedItems = getRecommendedItems();
  const comboTotal = recommendedItems.reduce((acc, i) => acc + i.price, 0);

  const handleApplyCombo = () => {
    onAddComboToCart(recommendedItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#1C1A18] border border-[#2D2A26] rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-[#2D2A26] flex items-center justify-between bg-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D9822B] to-[#E05330] text-white flex items-center justify-center shadow-lg shadow-[#E05330]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-[#EDE8E1]">
                Sugerencia & Maridaje del Pizzero
              </h3>
              <p className="text-xs text-[#9E968B]">
                En 3 preguntas te armamos el banquete ideal para esta noche
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9E968B] hover:text-[#EDE8E1] hover:bg-[#25221F] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Comensales */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-[#D9822B] uppercase tracking-wider font-bold">Paso 1 de 3</span>
              <h4 className="font-serif-title text-2xl font-bold text-[#EDE8E1]">
                ¿Cuántos comensales son?
              </h4>
              <p className="text-xs text-[#9E968B]">
                Para dimensionar porciones y variedad justa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: '1', title: 'Solo yo', desc: '1 pizza individual + bebida' },
                { id: '2', title: 'En pareja (2)', desc: 'Entrada + Pizza + Postre + Brindis' },
                { id: 'grupo', title: 'Grupo (3 o más)', desc: 'Variedad de pizzas al centro para compartir' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGuests(opt.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    guests === opt.id
                      ? 'bg-[#E05330]/20 border-[#E05330] text-white'
                      : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:border-[#4A443E]'
                  }`}
                >
                  <div className="font-bold text-sm text-[#EDE8E1] mb-1">{opt.title}</div>
                  <div className="text-[11px] text-[#9E968B]">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setStep(2)}
                className="bg-[#E05330] hover:bg-[#C94726] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Perfil de Sabor */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-[#D9822B] uppercase tracking-wider font-bold">Paso 2 de 3</span>
              <h4 className="font-serif-title text-2xl font-bold text-[#EDE8E1]">
                ¿Qué perfil gastronómico tienen ganas de probar?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'gourmet',
                  title: 'Gourmet & De Autor',
                  desc: 'Higos asados, stracciatella fresca, jamón de Parma y trufa.',
                },
                {
                  id: 'intenso',
                  title: 'Intenso, Picante & Quesero',
                  desc: 'Pepperoni crocante con Hot Honey o Fugazzeta con provoleta.',
                },
                {
                  id: 'veggie',
                  title: 'Vegetariano & Quesos de Selección',
                  desc: 'Cuatro quesos, burrata fresca al pesto y masas livianas.',
                },
                {
                  id: 'clasico',
                  title: 'Clásico Napolitano',
                  desc: 'Pomodoro dulce, fior di latte, albahaca y ajo confitado.',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFlavorProfile(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    flavorProfile === opt.id
                      ? 'bg-[#E05330]/20 border-[#E05330] text-white'
                      : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:border-[#4A443E]'
                  }`}
                >
                  <div className="font-bold text-sm text-[#EDE8E1] mb-1">{opt.title}</div>
                  <div className="text-[11px] text-[#9E968B]">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#9E968B] hover:text-[#EDE8E1]"
              >
                Volver
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-[#E05330] hover:bg-[#C94726] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Bebida & Maridaje */}
        {step === 3 && (
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-[#D9822B] uppercase tracking-wider font-bold">Paso 3 de 3</span>
              <h4 className="font-serif-title text-2xl font-bold text-[#EDE8E1]">
                ¿Con qué prefieren brindar esta noche?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'vino', title: 'Vino Malbec de Guarda', desc: 'Valle de Uco. Redondo, sutil roble y frutos rojos maduros.' },
                { id: 'cerveza', title: 'Cerveza Tirada IPA', desc: 'Lupulada, aromática, fría de barril.' },
                { id: 'coctel', title: 'Coctel Negroni FORNO', desc: 'Campari, Gin London Dry, vermut en barrica y naranja al fuego.' },
                { id: 'natural', title: 'Limonada Casera Natural', desc: 'Con menta del huerto y jengibre fresco.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDrinkType(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    drinkType === opt.id
                      ? 'bg-[#E05330]/20 border-[#E05330] text-white'
                      : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:border-[#4A443E]'
                  }`}
                >
                  <div className="font-bold text-sm text-[#EDE8E1] mb-1">{opt.title}</div>
                  <div className="text-[11px] text-[#9E968B]">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-[#9E968B] hover:text-[#EDE8E1]"
              >
                Volver
              </button>
              <button
                onClick={() => setStep('result')}
                className="bg-[#E05330] hover:bg-[#C94726] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Mi Menú Curado</span>
              </button>
            </div>
          </div>
        )}

        {/* Result View */}
        {step === 'result' && (
          <div className="p-6 space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1 text-center">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E05330]/20 text-[#D9822B] border border-[#E05330]/30 inline-block">
                Maridaje Maestro Seleccionado
              </span>
              <h4 className="font-serif-title text-2xl font-bold text-[#EDE8E1]">
                Tu Experiencia FORNO Perfecta
              </h4>
              <p className="text-xs text-[#9E968B]">
                Equilibrio gastronómico testeado por nuestros pizzeros y sommeliers.
              </p>
            </div>

            {/* List of recommended items */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-[#121110] border border-[#2D2A26] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-serif-title text-sm font-bold text-[#EDE8E1]">
                        {item.name}
                      </h5>
                      <span className="text-[11px] text-[#9E968B] line-clamp-1">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#D9822B] whitespace-nowrap pl-2">
                    ${item.price.toLocaleString('es-AR')}
                  </span>
                </div>
              ))}
            </div>

            {/* Total and CTA */}
            <div className="p-4 bg-[#141312] rounded-xl border border-[#2D2A26] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#9E968B]">Total del Combo Recomendado</div>
                <div className="text-lg font-bold text-[#EDE8E1]">
                  ${comboTotal.toLocaleString('es-AR')}
                </div>
              </div>

              <button
                onClick={handleApplyCombo}
                className="bg-[#E05330] hover:bg-[#C94726] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xl shadow-[#E05330]/25 flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Todo al Pedido</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#9E968B] hover:text-[#EDE8E1] underline underline-offset-2"
              >
                Reiniciar preferencias
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
