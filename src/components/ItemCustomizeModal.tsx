import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { MenuItem, ExtraOption } from '../types';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, selectedExtras: ExtraOption[], notes: string) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [notes, setNotes] = useState('');

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = item.price + extrasTotal;
  const grandTotal = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(item, quantity, selectedExtras, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#1C1A18] border border-[#2D2A26] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-[#EDE8E1] hover:bg-black hover:text-white transition-colors"
          id="close-customize-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Item Header Image */}
        <div className="relative h-48 sm:h-56 w-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18] via-transparent to-black/30"></div>
          
          {item.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#E05330] text-white">
              {item.badge}
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-serif-title text-2xl font-bold text-[#EDE8E1]">
              {item.name}
            </h3>
            <p className="text-sm font-semibold text-[#D9822B]">
              Base: ${item.price.toLocaleString('es-AR')}
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <p className="text-sm text-[#9E968B] leading-relaxed">
            {item.description}
          </p>

          {/* Extras / Personalización */}
          {item.availableExtras && item.availableExtras.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#2D2A26]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#EDE8E1] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#E05330]" />
                  <span>Toppings & Extras del Maestro</span>
                </h4>
                <span className="text-[11px] text-[#9E968B]">Opcional</span>
              </div>

              <div className="space-y-2">
                {item.availableExtras.map((extra) => {
                  const isChecked = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <label
                      key={extra.id}
                      onClick={() => toggleExtra(extra)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#E05330]/10 border-[#E05330] text-[#EDE8E1]'
                          : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:border-[#3D3A36]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-[#E05330] border-[#E05330] text-white'
                              : 'border-[#4A443E] bg-[#1C1A18]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#EDE8E1]">
                          {extra.name}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#D9822B]">
                        +${extra.price.toLocaleString('es-AR')}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special notes for kitchen */}
          <div className="space-y-2 pt-2 border-t border-[#2D2A26]">
            <label className="text-xs font-bold text-[#EDE8E1] block">
              Notas para la cocina (Opcional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: bien tostada, sin orégano, cortar en 8 porciones..."
              className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2.5 text-xs text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
              id="input-customize-notes"
            />
          </div>

          {/* Quantity selector */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2D2A26]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E968B]">
              Cantidad:
            </span>
            <div className="flex items-center gap-3 bg-[#121110] px-3 py-1.5 rounded-xl border border-[#2D2A26]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-[#1C1A18] text-[#EDE8E1] flex items-center justify-center hover:bg-[#25221F] disabled:opacity-30"
                disabled={quantity <= 1}
                id="btn-qty-minus"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-white w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-[#1C1A18] text-[#EDE8E1] flex items-center justify-center hover:bg-[#25221F]"
                id="btn-qty-plus"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add to Order button */}
        <div className="p-4 bg-[#171513] border-t border-[#2D2A26] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#9E968B] uppercase tracking-wider">
              Total ({quantity} {quantity === 1 ? 'unidad' : 'unidades'})
            </div>
            <div className="text-lg font-bold text-[#EDE8E1]">
              ${grandTotal.toLocaleString('es-AR')}
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 max-w-xs bg-[#E05330] hover:bg-[#C94726] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-[#E05330]/25 transition-all text-center"
            id="btn-confirm-customize"
          >
            Agregar al Pedido
          </button>
        </div>

      </div>
    </div>
  );
};
