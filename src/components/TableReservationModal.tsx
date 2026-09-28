import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MessageSquare, Flame } from 'lucide-react';
import { TableReservation } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('21:00');
  const [seatingArea, setSeatingArea] = useState<'salon-interior' | 'patio-fuego' | 'barra-horno'>('salon-interior');
  const [notes, setNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  const availableTimeSlots = [
    '19:30', '20:15', '21:00', '21:45', '22:30', '23:15'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const reservation: TableReservation = {
      id: Date.now().toString(),
      code: 'RES-' + Math.floor(1000 + Math.random() * 9000),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      guests,
      date,
      time,
      seatingArea,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    setConfirmedReservation(reservation);
  };

  const handleShareWhatsApp = () => {
    if (!confirmedReservation) return;
    const msg = `🍕 *RESERVA DE MESA FORNO* (${confirmedReservation.code})\n\n` +
      `👤 *A nombre de:* ${confirmedReservation.name}\n` +
      `👥 *Comensales:* ${confirmedReservation.guests} personas\n` +
      `📅 *Fecha:* ${confirmedReservation.date}\n` +
      `⏰ *Horario:* ${confirmedReservation.time} hs\n` +
      `📍 *Sector:* ${
        confirmedReservation.seatingArea === 'salon-interior'
          ? 'Salón Principal'
          : confirmedReservation.seatingArea === 'patio-fuego'
          ? 'Patio & Fuego'
          : 'Barra del Maestro'
      }\n` +
      (confirmedReservation.notes ? `📝 *Notas:* ${confirmedReservation.notes}\n` : '') +
      `\n¡Nos vemos en Honduras 5120!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#1C1A18] border border-[#2D2A26] rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-[#2D2A26] flex items-center justify-between bg-[#171513]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9822B]/20 text-[#D9822B] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-[#EDE8E1]">
                Reservar Mesa en Salón
              </h3>
              <p className="text-xs text-[#9E968B]">
                {RESTAURANT_INFO.name} · {RESTAURANT_INFO.address}
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

        {confirmedReservation ? (
          /* Confirmation Screen */
          <div className="p-6 space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif-title text-2xl font-bold text-[#EDE8E1]">
                ¡Mesa Reservada!
              </h4>
              <p className="text-xs text-[#9E968B]">
                Código de reserva:{' '}
                <strong className="text-[#D9822B] text-sm">
                  {confirmedReservation.code}
                </strong>
              </p>
            </div>

            <div className="bg-[#121110] p-4 rounded-xl border border-[#2D2A26] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#9E968B]">
                <span>Titular:</span>
                <span className="font-bold text-[#EDE8E1]">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between text-[#9E968B]">
                <span>Personas:</span>
                <span className="font-bold text-[#EDE8E1]">{confirmedReservation.guests} comensales</span>
              </div>
              <div className="flex justify-between text-[#9E968B]">
                <span>Fecha y Hora:</span>
                <span className="font-bold text-[#D9822B]">{confirmedReservation.date} a las {confirmedReservation.time} hs</span>
              </div>
              <div className="flex justify-between text-[#9E968B]">
                <span>Sector:</span>
                <span className="capitalize text-[#EDE8E1]">{confirmedReservation.seatingArea.replace('-', ' ')}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#9E968B]">
              Guardamos la mesa hasta 15 minutos pasados el horario de reserva. Ante cualquier cambio, avisanos por WhatsApp.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleShareWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-black py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Confirmar por WhatsApp con el Salón</span>
              </button>

              <button
                onClick={onClose}
                className="w-full bg-[#1C1A18] hover:bg-[#25221F] text-[#EDE8E1] py-2.5 rounded-xl font-semibold text-xs border border-[#2D2A26] transition-all"
              >
                Cerrar y Volver a la Carta
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Comensales & Fecha */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D9822B]" />
                  <span>Comensales</span>
                </label>
                <div className="flex items-center bg-[#121110] border border-[#2D2A26] rounded-xl p-1 justify-between">
                  {[2, 4, 6, 8].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setGuests(num)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        guests === num
                          ? 'bg-[#E05330] text-white'
                          : 'text-[#9E968B] hover:text-[#EDE8E1]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D9822B]" />
                  <span>Fecha</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3 py-2 text-xs text-[#EDE8E1] focus:outline-none focus:border-[#E05330]"
                />
              </div>
            </div>

            {/* Horario */}
            <div>
              <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D9822B]" />
                <span>Turno / Horario</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      time === slot
                        ? 'bg-[#E05330] border-[#E05330] text-white shadow-sm'
                        : 'bg-[#121110] border-[#2D2A26] text-[#9E968B] hover:text-[#EDE8E1]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector */}
            <div>
              <label className="block text-xs font-semibold text-[#EDE8E1] mb-1.5 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#E05330]" />
                <span>Sector de Preferencia</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'salon-interior', label: 'Salón Principal', desc: 'Climatizado' },
                  { id: 'patio-fuego', label: 'Patio & Fuego', desc: 'Terraza calefaccionada' },
                  { id: 'barra-horno', label: 'Barra del Maestro', desc: 'Vista directa al horno' },
                ].map((sec) => (
                  <button
                    type="button"
                    key={sec.id}
                    onClick={() => setSeatingArea(sec.id as any)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      seatingArea === sec.id
                        ? 'bg-[#E05330]/20 border-[#E05330] text-[#EDE8E1]'
                        : 'bg-[#121110] border-[#2D2A26] text-[#9E968B]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#EDE8E1] block">{sec.label}</span>
                    <span className="text-[10px] text-[#9E968B] block mt-0.5">{sec.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-2 border-t border-[#2D2A26]">
              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Sofía Martínez"
                  className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2 text-xs text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 11 5521-8899"
                    className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2 text-xs text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">
                    Email de confirmación
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sofia@ejemplo.com"
                    className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2 text-xs text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#EDE8E1] mb-1">
                  Motivo especial o comentarios (Opcional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Festejo de cumpleaños, preferencia mesa esquinada..."
                  className="w-full bg-[#121110] border border-[#2D2A26] rounded-xl px-3.5 py-2 text-xs text-[#EDE8E1] placeholder-[#666056] focus:outline-none focus:border-[#E05330]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E05330] hover:bg-[#C94726] text-white py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-[#E05330]/25 transition-all mt-4"
            >
              Confirmar Reserva de Mesa
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
