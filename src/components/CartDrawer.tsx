import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike, Utensils, ShoppingCart } from 'lucide-react';
import { CartItem, OrderMode } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderMode: OrderMode;
  setOrderMode: (mode: OrderMode) => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  orderMode,
  setOrderMode,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreMenu,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderMode === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1C1A18] border-l border-[#2D2A26] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#2D2A26] flex items-center justify-between bg-[#171513]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E05330]/20 text-[#E05330] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#EDE8E1]">
                  Tu Pedido FORNO
                </h3>
                <span className="text-[11px] text-[#9E968B]">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#9E968B] hover:text-[#EDE8E1] hover:bg-[#25221F] transition-colors"
              id="btn-close-cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Selector in Cart */}
          <div className="p-4 bg-[#141312] border-b border-[#2D2A26]">
            <div className="text-[11px] font-semibold text-[#9E968B] uppercase tracking-wider mb-2">
              ¿Cómo querés recibirlo?
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#1C1A18] rounded-xl border border-[#2D2A26]">
              <button
                onClick={() => setOrderMode('salon')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  orderMode === 'salon'
                    ? 'bg-[#E05330] text-white'
                    : 'text-[#9E968B] hover:text-[#EDE8E1]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>En Salón</span>
              </button>
              <button
                onClick={() => setOrderMode('takeaway')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  orderMode === 'takeaway'
                    ? 'bg-[#E05330] text-white'
                    : 'text-[#9E968B] hover:text-[#EDE8E1]'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Take Away</span>
              </button>
              <button
                onClick={() => setOrderMode('delivery')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  orderMode === 'delivery'
                    ? 'bg-[#E05330] text-white'
                    : 'text-[#9E968B] hover:text-[#EDE8E1]'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery</span>
              </button>
            </div>
            
            <p className="text-[11px] text-[#9E968B] mt-2 text-center">
              {orderMode === 'salon' && 'Servicio a mesa · Te pediremos tu número de mesa'}
              {orderMode === 'takeaway' && 'Listo para retirar en aprox. 20-30 minutos en Honduras 5120'}
              {orderMode === 'delivery' && `Envío en moto especializada · Tarifa: $${RESTAURANT_INFO.deliveryFee.toLocaleString('es-AR')}`}
            </p>
          </div>

          {/* Items List or Empty state */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#25221F] flex items-center justify-center text-[#9E968B]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif-title text-base font-bold text-[#EDE8E1]">
                    Tu pedido está vacío
                  </h4>
                  <p className="text-xs text-[#9E968B] max-w-xs">
                    Descubrí nuestras pizzas de fermentación lenta, empanadas a cuchillo y coctelería.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreMenu();
                  }}
                  className="bg-[#E05330] hover:bg-[#C94726] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all"
                >
                  Ver la Carta
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="bg-[#141312] border border-[#2D2A26] rounded-xl p-3.5 space-y-2.5 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <img
                        src={cartItem.menuItem.image}
                        alt={cartItem.menuItem.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-0.5">
                        <h4 className="font-serif-title text-sm font-bold text-[#EDE8E1]">
                          {cartItem.menuItem.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#D9822B]">
                            ${cartItem.unitPriceWithExtras.toLocaleString('es-AR')}
                          </span>
                          {cartItem.selectedSize && (
                            <span className="text-[10px] uppercase font-bold text-[#F9BA15] bg-[#2A231C] px-1.5 py-0.5 rounded border border-[#F9BA15]/30">
                              {cartItem.selectedSize}
                            </span>
                          )}
                        </div>

                        {/* Selected Extras */}
                        {cartItem.selectedExtras.length > 0 && (
                          <div className="text-[10px] text-[#9E968B] space-y-0.5 pt-0.5">
                            {cartItem.selectedExtras.map((extra) => (
                              <div key={extra.id} className="flex items-center gap-1">
                                <span className="text-[#E05330] font-bold">+</span>
                                <span>{extra.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Notes */}
                        {cartItem.notes && (
                          <div className="text-[10px] text-[#D9822B] italic pt-0.5">
                            "{cartItem.notes}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(cartItem.cartItemId)}
                      className="p-1.5 text-[#9E968B] hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
                      title="Eliminar ítem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#2D2A26]/50">
                    <div className="flex items-center gap-2 bg-[#1C1A18] px-2 py-1 rounded-lg border border-[#2D2A26]">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        className="p-1 text-[#9E968B] hover:text-[#EDE8E1]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        className="p-1 text-[#9E968B] hover:text-[#EDE8E1]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-[#EDE8E1]">
                      Subtotal: ${cartItem.totalPrice.toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 bg-[#171513] border-t border-[#2D2A26] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#9E968B]">
                  <span>Subtotal productos</span>
                  <span>${subtotal.toLocaleString('es-AR')}</span>
                </div>
                {orderMode === 'delivery' && (
                  <div className="flex justify-between text-[#9E968B]">
                    <span>Costo de envío (Palermo/CABA)</span>
                    <span>${deliveryFee.toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#EDE8E1] pt-2 border-t border-[#2D2A26]">
                  <span>Total final</span>
                  <span className="text-[#D9822B]">${grandTotal.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#E05330] hover:bg-[#C94726] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-xl shadow-[#E05330]/25 flex items-center justify-center gap-2 transition-all"
                id="btn-cart-checkout"
              >
                <span>Continuar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
