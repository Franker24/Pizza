import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, CreditCard, Banknote, Building2, MapPin, Phone, User, Flame } from 'lucide-react';
import { CartItem, OrderMode, PaymentMethod, OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderMode: OrderMode;
  onOrderConfirmed: (orderDetails: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderMode,
  onOrderConfirmed,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [pickupTime, setPickupTime] = useState('Lo antes posible (~25-30 min)');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mercadopago');
  const [cashAmountNeeded, setCashAmountNeeded] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [formError, setFormError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderMode === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const generateOrderCode = () => {
    return 'FO-' + Math.floor(1000 + Math.random() * 9000);
  };

  const createOrderObject = (): OrderDetails => {
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      code: generateOrderCode(),
      mode: orderMode,
      items,
      subtotal,
      deliveryFee,
      total,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: orderMode === 'delivery' ? address.trim() : undefined,
      tableNumber: orderMode === 'salon' ? tableNumber.trim() : undefined,
      pickupTime: orderMode === 'takeaway' ? pickupTime : undefined,
      paymentMethod,
      cashAmountNeeded: paymentMethod === 'efectivo' ? cashAmountNeeded : undefined,
      specialNotes: specialNotes.trim() || undefined,
      status: 'recibido',
      createdAt: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const validateForm = () => {
    if (!customerName.trim()) {
      setFormError('Por favor indicá tu nombre');
      return false;
    }
    if (!customerPhone.trim()) {
      setFormError('Por favor ingresá un teléfono o WhatsApp de contacto');
      return false;
    }
    if (orderMode === 'delivery' && !address.trim()) {
      setFormError('Por favor indicá la dirección exacta de entrega');
      return false;
    }
    if (orderMode === 'salon' && !tableNumber.trim()) {
      setFormError('Por favor indicá tu número de mesa en el salón');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleConfirmOnline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const order = createOrderObject();
    onOrderConfirmed(order);
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const order = createOrderObject();

    // Build WhatsApp message text
    let message = `🍕 *NUEVO PEDIDO FORNO* (${order.code})\n\n`;
    message += `👤 *Cliente:* ${order.customerName}\n`;
    message += `📱 *Teléfono:* ${order.customerPhone}\n`;
    message += `🛵 *Modalidad:* ${
      orderMode === 'salon'
        ? `Salón - Mesa ${order.tableNumber}`
        : orderMode === 'takeaway'
        ? `Take Away (Retiro: ${order.pickupTime})`
        : `Delivery a ${order.customerAddress}`
    }\n\n`;

    message += `📋 *DETALLE DEL PEDIDO:*\n`;
    order.items.forEach((item, index) => {
      message += `${index + 1}. ${item.quantity}x ${item.menuItem.name} ($${item.totalPrice.toLocaleString('es-AR')})\n`;
      if (item.selectedExtras.length > 0) {
        message += `   Extras: ${item.selectedExtras.map((e) => e.name).join(', ')}\n`;
      }
      if (item.notes) {
        message += `   Nota: "${item.notes}"\n`;
      }
    });

    message += `\n💵 *Subtotal:* $${order.subtotal.toLocaleString('es-AR')}\n`;
    if (orderMode === 'delivery') {
      message += `🛵 *Envío:* $${order.deliveryFee.toLocaleString('es-AR')}\n`;
    }
    message += `🔥 *TOTAL:* $${order.total.toLocaleString('es-AR')}\n`;
    message += `💳 *Método de Pago:* ${
      paymentMethod === 'efectivo'
        ? `Efectivo ${cashAmountNeeded ? `(Abona con $${cashAmountNeeded})` : '(Cambio justo)'}`
        : paymentMethod === 'mercadopago'
        ? 'Mercado Pago / Tarjeta'
        : 'Transferencia Bancaria'
    }\n`;

    if (order.specialNotes) {
      message += `\n📝 *Aclaraciones:* ${order.specialNotes}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Also record in app
    onOrderConfirmed(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#1C1A18] border border-[#2D2A26] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-[#2D2A26] flex items-center justify-between bg-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E05330]/20 text-[#E05330] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-[#EDE8E1]">
                Finalizar Pedido en FORNO
              </h3>
              <p className="text-xs text-[#9E968B]">
                Modalidad:{' '}
                <strong className="text-[#D9822B] uppercase">
                  {orderMode === 'salon' ? 'Salón en el Local' : orderMode === 'takeaway' ? 'Take Away (Retiro)' : 'Delivery a Domicilio'}
                </strong>
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

        {/* Body Form */}
        <form onSubmit={handleConfirmOnline} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs font-semibold">
              {formError}
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9822B] flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Tus Datos de Contacto</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej: Francisco Gómez"
                  className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5">
                  Teléfono / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#666056] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ej: 11 4892-7711"
                    className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Specific Modality Details */}
          <div className="space-y-4 pt-3 border-t border-[#2D2A26]">
            {orderMode === 'delivery' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9822B] flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Dirección de Entrega</span>
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5">
                    Calle, Número, Piso/Depto y Barrio *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej: Gorriti 4820, Piso 4 B, Palermo"
                    className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                  />
                  <p className="text-[11px] text-[#9E968B] mt-1">
                    Costo de entrega: ${deliveryFee.toLocaleString('es-AR')} (Cobertura Palermo, Recoleta, Belgrano, Colegiales).
                  </p>
                </div>
              </div>
            )}

            {orderMode === 'salon' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9822B] flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>Ubicación en el Salón</span>
                </h4>
                <div className="max-w-xs">
                  <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5">
                    Número de Mesa *
                  </label>
                  <input
                    type="text"
                    required
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Ej: Mesa 12 o Barra 4"
                    className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                  />
                  <p className="text-[11px] text-[#9E968B] mt-1">
                    Lo encontrás en el identificador de madera sobre tu mesa.
                  </p>
                </div>
              </div>
            )}

            {orderMode === 'takeaway' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9822B] flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Horario de Retiro en Local</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Lo antes posible (~25-30 min)', 'En 45 minutos', 'A las 21:30 hs'].map((timeOption) => (
                    <button
                      type="button"
                      key={timeOption}
                      onClick={() => setPickupTime(timeOption)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        pickupTime === timeOption
                          ? 'bg-[#E05330]/20 border-[#E05330] text-[#EDE8E1]'
                          : 'bg-[#121110] border-[#2D2A26] text-[#9E968B]'
                      }`}
                    >
                      {timeOption}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#9E968B]">
                  Punto de retiro: {RESTAURANT_INFO.address}.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-4 pt-3 border-t border-[#2D2A26]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9822B]">
              Forma de Pago
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                onClick={() => setPaymentMethod('mercadopago')}
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  paymentMethod === 'mercadopago'
                    ? 'bg-[#E05330]/15 border-[#E05330] text-[#EDE8E1]'
                    : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:border-[#3D3A36]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-5 h-5 text-[#D9822B]" />
                  <span className="w-3 h-3 rounded-full border border-[#D9822B] flex items-center justify-center">
                    {paymentMethod === 'mercadopago' && <span className="w-1.5 h-1.5 rounded-full bg-[#E05330]" />}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#EDE8E1]">Mercado Pago / Tarjeta</div>
                  <div className="text-[10px] text-[#9E968B]">QR o posnet inalámbrico</div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('efectivo')}
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  paymentMethod === 'efectivo'
                    ? 'bg-[#E05330]/15 border-[#E05330] text-[#EDE8E1]'
                    : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:border-[#3D3A36]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Banknote className="w-5 h-5 text-[#D9822B]" />
                  <span className="w-3 h-3 rounded-full border border-[#D9822B] flex items-center justify-center">
                    {paymentMethod === 'efectivo' && <span className="w-1.5 h-1.5 rounded-full bg-[#E05330]" />}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#EDE8E1]">Efectivo</div>
                  <div className="text-[10px] text-[#9E968B]">En mano al recibir</div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('transferencia')}
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  paymentMethod === 'transferencia'
                    ? 'bg-[#E05330]/15 border-[#E05330] text-[#EDE8E1]'
                    : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:border-[#3D3A36]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Building2 className="w-5 h-5 text-[#D9822B]" />
                  <span className="w-3 h-3 rounded-full border border-[#D9822B] flex items-center justify-center">
                    {paymentMethod === 'transferencia' && <span className="w-1.5 h-1.5 rounded-full bg-[#E05330]" />}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#EDE8E1]">Transferencia CBU</div>
                  <div className="text-[10px] text-[#9E968B]">Alias: FORNO.PIZZA.BA</div>
                </div>
              </label>
            </div>

            {paymentMethod === 'efectivo' && (
              <div className="p-3 bg-[#121110] border border-[#2D2A26] rounded-xl space-y-1.5">
                <label className="text-xs font-semibold text-[#EDE8E1]">
                  ¿Abonás con cambio justo o con cuánto vas a pagar?
                </label>
                <input
                  type="text"
                  value={cashAmountNeeded}
                  onChange={(e) => setCashAmountNeeded(e.target.value)}
                  placeholder="Ej: Pago con $30.000 para cambio"
                  className="w-full bg-[#1C1A18] border border-[#2D2A26] rounded-lg px-3 py-2 text-xs text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                />
              </div>
            )}
          </div>

          {/* Section 4: Special notes */}
          <div className="space-y-2 pt-2 border-t border-[#2D2A26]">
            <label className="block text-xs font-semibold text-[#EDE8E1]">
              Aclaraciones para entrega o cocina (Opcional):
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Ej: Timbre no anda, llamar al celular al llegar..."
              className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2.5 text-xs text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
            />
          </div>

          {/* Order Summary Recap */}
          <div className="bg-[#141312] p-4 rounded-xl border border-[#2D2A26] space-y-2 text-xs">
            <div className="font-bold text-[#EDE8E1] pb-1 border-b border-[#2D2A26] flex justify-between">
              <span>Resumen ({items.length} platos)</span>
              <span>Total: ${total.toLocaleString('es-AR')}</span>
            </div>
            {items.map((i) => (
              <div key={i.cartItemId} className="flex justify-between text-[#9E968B]">
                <span>{i.quantity}x {i.menuItem.name}</span>
                <span>${i.totalPrice.toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>

          {/* Dual Action Confirmation */}
          <div className="pt-2 space-y-3">
            {/* Action 1: WhatsApp Button */}
            <button
              type="button"
              onClick={handleSendViaWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-black py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Confirmar y Enviar Pedido por WhatsApp</span>
            </button>

            {/* Action 2: Direct In-App Confirmation */}
            <button
              type="submit"
              className="w-full bg-[#E05330] hover:bg-[#C94726] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-xl shadow-[#E05330]/25 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar en Línea (Seguimiento en Vivo)</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
