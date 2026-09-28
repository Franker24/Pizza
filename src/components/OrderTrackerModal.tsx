import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Flame, PackageCheck, Bike, Clock, Phone, MessageSquare } from 'lucide-react';
import { OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderTrackerModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  // Simulate progressive stages
  const [activeStep, setActiveStep] = useState(1); // 0: Recibido, 1: Horno, 2: Empaquetando, 3: Listo/En camino

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(1), 3000);
    const timer2 = setTimeout(() => setActiveStep(2), 9000);
    const timer3 = setTimeout(() => setActiveStep(3), 16000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    {
      id: 0,
      title: 'Pedido Recibido',
      desc: 'Comanda ingresada al sistema de cocina',
      icon: CheckCircle,
    },
    {
      id: 1,
      title: 'En el Horno a 450°C',
      desc: 'Masa madre al fuego vivo de quebracho blanco',
      icon: Flame,
    },
    {
      id: 2,
      title: 'Emplatado & Empaquetado',
      desc: 'Control de calidad y toques finales de albahaca y oliva',
      icon: PackageCheck,
    },
    {
      id: 3,
      title: order.mode === 'salon' ? 'Entregando en Mesa' : order.mode === 'takeaway' ? 'Listo para Retiro' : 'En Camino a tu Domicilio',
      desc: order.mode === 'salon' ? `Mesa ${order.tableNumber}` : order.mode === 'takeaway' ? 'Acercate al mostrador de Honduras 5120' : 'Repartidor en moto rumbo a tu dirección',
      icon: Bike,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#1C1A18] border border-[#2D2A26] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#2D2A26] flex items-center justify-between bg-[#171513]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E05330]">
              Seguimiento en Tiempo Real
            </span>
            <h3 className="font-serif-title text-xl font-bold text-[#EDE8E1] flex items-center gap-2">
              <span>Pedido #{order.code}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9E968B] hover:text-[#EDE8E1] hover:bg-[#25221F] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Tracker */}
        <div className="p-6 space-y-6">
          {/* Estimated Time Card */}
          <div className="bg-[#121110] border border-[#2D2A26] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9822B]/20 text-[#D9822B] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#9E968B]">Tiempo estimado</div>
                <div className="text-base font-bold text-[#EDE8E1]">
                  {activeStep === 3 ? '¡Listo ahora!' : '20 - 30 minutos'}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-[#9E968B]">Total abonado</div>
              <div className="text-sm font-bold text-[#D9822B]">
                ${order.total.toLocaleString('es-AR')}
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isCompleted = activeStep > step.id;
              const isCurrent = activeStep === step.id;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* Vertical connector line */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 w-0.5 h-10 -ml-[1px] transition-colors ${
                        isCompleted ? 'bg-[#E05330]' : 'bg-[#2D2A26]'
                      }`}
                    />
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isCompleted
                        ? 'bg-[#E05330] text-white shadow-md shadow-[#E05330]/20'
                        : isCurrent
                        ? 'bg-[#1C1A18] border-2 border-[#E05330] text-[#E05330] shadow-lg shadow-[#E05330]/30 animate-pulse'
                        : 'bg-[#121110] border border-[#2D2A26] text-[#666056]'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>

                  {/* Text details */}
                  <div className="space-y-0.5 pt-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isCurrent
                            ? 'text-white'
                            : isCompleted
                            ? 'text-[#EDE8E1]'
                            : 'text-[#666056]'
                        }`}
                      >
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold text-[#E05330] bg-[#E05330]/10 px-2 py-0.5 rounded-full border border-[#E05330]/30">
                          En progreso
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#9E968B]">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Destination / Details Recap */}
          <div className="bg-[#141312] p-3.5 rounded-xl border border-[#2D2A26] text-xs text-[#9E968B] space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-[#EDE8E1]">Destino:</span>
              <span className="text-right text-[#EDE8E1]">
                {order.mode === 'salon' && `Salón · Mesa ${order.tableNumber}`}
                {order.mode === 'takeaway' && `Retiro por mostrador (${order.pickupTime})`}
                {order.mode === 'delivery' && order.customerAddress}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cliente:</span>
              <span className="text-[#EDE8E1]">{order.customerName} ({order.customerPhone})</span>
            </div>
          </div>

          {/* Quick Help & Contact */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hola%20FORNO,%20consulto%20por%20mi%20pedido%20${order.code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#1C1A18] hover:bg-[#25221F] border border-[#2D2A26] text-xs font-semibold text-[#EDE8E1] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Local</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#1C1A18] hover:bg-[#25221F] border border-[#2D2A26] text-xs font-semibold text-[#EDE8E1] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#D9822B]" />
              <span>Llamar al Salón</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
