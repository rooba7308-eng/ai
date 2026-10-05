import React from 'react';
import { OrderDetails } from '../types';
import { CheckCircle2, Calendar, Clock, MapPin, Printer, Sparkles, X, Heart } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-lg border border-stone-200 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Success Banner */}
          <div className="text-center pb-6 border-b border-stone-200">
            <div className="w-14 h-14 bg-amber-100/80 text-amber-900 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-amber-900" />
            </div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1">
              Order Confirmed & Queued in Atelier
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Merci, {order.customerName}!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
              Our head pastry chef has logged your commissioning. A confirmation receipt has been sent to <strong>{order.customerEmail}</strong>.
            </p>

            <div className="mt-4 inline-block px-3 py-1 bg-stone-100 rounded text-xs font-mono font-semibold text-stone-800 tabular-nums">
              Commission Reference: {order.orderId}
            </div>
          </div>

          {/* Fulfillment Schedule Card */}
          <div className="my-6 p-4 sm:p-5 bg-white border border-stone-200/90 rounded-md">
            <h3 className="font-serif font-bold text-sm text-stone-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Handover Schedule & Instructions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-400 block">Date</span>
                  <span className="font-semibold text-stone-900">{order.deliveryDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-400 block">Window</span>
                  <span className="font-semibold text-stone-900">{order.deliveryTimeSlot}</span>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-stone-100">
                <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-400 block">
                    {order.fulfillmentType === 'pickup' ? 'Atelier Pickup Bay' : 'Courier Destination'}
                  </span>
                  <span className="font-semibold text-stone-900">
                    {order.fulfillmentType === 'pickup'
                      ? "L'Étoile Atelier — 142 Boulevard Saint-Honoré, Atelier 4, 75008 Paris"
                      : order.deliveryAddress}
                  </span>
                </div>
              </div>
            </div>

            {order.giftNote && (
              <div className="mt-3 pt-3 border-t border-stone-100 text-xs">
                <span className="text-stone-400">Handwritten Gift Card:</span>
                <span className="font-serif italic text-stone-800 ml-1.5">"{order.giftNote}"</span>
              </div>
            )}
          </div>

          {/* Itemized Review */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Commissioned Confections
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-stone-700 py-1 border-b border-stone-100"
                >
                  <div>
                    <span className="font-medium text-stone-900">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="text-stone-500 ml-2">({item.size})</span>
                    {item.inscription && (
                      <span className="block text-[11px] text-amber-900 italic">
                        Plaque: "{item.inscription}"
                      </span>
                    )}
                  </div>
                  <span className="font-serif font-bold text-stone-900 tabular-nums">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs space-y-1 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">${order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment Fee</span>
                <span className="tabular-nums">
                  {order.deliveryFee === 0 ? 'Complimentary' : `$${order.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="tabular-nums">${order.tax}</span>
              </div>
              <div className="flex justify-between font-serif font-bold text-sm text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Paid ({order.paymentMethod})</span>
                <span className="tabular-nums">${order.total}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-1/2 py-2.5 px-4 border border-stone-300 hover:bg-stone-100 rounded text-xs font-semibold text-stone-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Done & Return Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
