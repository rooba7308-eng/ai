import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { X, Check, Store, Truck, Calendar, Clock, CreditCard, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Date calculation: minimum tomorrow (+1 day for 24h notice)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2); // 48h safe lead time
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(defaultDateStr);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM – 1:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = fulfillment === 'delivery' ? (subtotal >= 120 ? 0 : 18) : 0;
  const tax = Math.round(subtotal * 0.08); // 8% sales tax
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    if (fulfillment === 'delivery' && !address) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `ETOILE-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        fulfillmentType: fulfillment,
        deliveryAddress: fulfillment === 'delivery' ? `${address}, ${postalCode}` : undefined,
        deliveryDate: selectedDate,
        deliveryTimeSlot: selectedTimeSlot,
        giftNote: giftNote.trim() || undefined,
        specialInstructions: specialInstructions.trim() || undefined,
        items,
        subtotal,
        deliveryFee,
        tax,
        total,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card'
            : paymentMethod === 'applepay'
            ? 'Apple Pay'
            : 'Payment on Handover',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-lg border border-stone-200 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-0.5">
              Secure Commission
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Celebration Checkout & Schedule
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Fulfillment Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              1. Fulfillment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setFulfillment('pickup')}
                className={`p-4 rounded-md border cursor-pointer transition-all flex items-start justify-between ${
                  fulfillment === 'pickup'
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Store className="w-5 h-5 text-stone-800 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-sm text-stone-900">
                      Boutique Studio Pickup
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      142 Blvd Saint-Honoré, Atelier 4
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium mt-1">
                      Complimentary (Free)
                    </div>
                  </div>
                </div>
                {fulfillment === 'pickup' && <Check className="w-4 h-4 text-stone-900" />}
              </div>

              <div
                onClick={() => setFulfillment('delivery')}
                className={`p-4 rounded-md border cursor-pointer transition-all flex items-start justify-between ${
                  fulfillment === 'delivery'
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-stone-800 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-sm text-stone-900">
                      White-Glove Courier
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Refrigerated level transport to venue
                    </div>
                    <div className="text-[11px] font-medium mt-1">
                      {subtotal >= 120 ? (
                        <span className="text-emerald-700 font-semibold">Complimentary (Over $120)</span>
                      ) : (
                        <span className="text-stone-700 font-semibold">$18 Flat Delivery</span>
                      )}
                    </div>
                  </div>
                </div>
                {fulfillment === 'delivery' && <Check className="w-4 h-4 text-stone-900" />}
              </div>
            </div>
          </div>

          {/* Section 2: Date & Arrival Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-800" />
                <span>Celebration / Handover Date</span>
              </label>
              <input
                type="date"
                min={defaultDateStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Minimum 24–48 hours notice required for freshness.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-800" />
                <span>Preferred Handover Window</span>
              </label>
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
              >
                <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM (Morning Setup)</option>
                <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM (Luncheon)</option>
                <option value="2:00 PM – 4:30 PM">2:00 PM – 4:30 PM (Afternoon Tea)</option>
                <option value="4:30 PM – 6:30 PM">4:30 PM – 6:30 PM (Dinner & Reception)</option>
              </select>
            </div>
          </div>

          {/* Section 3: Contact & Address */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              2. Host & Contact Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address (for confirmation) *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <input
                  type="tel"
                  placeholder="Mobile Phone (for delivery SMS) *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
              {fulfillment === 'delivery' && (
                <div>
                  <input
                    type="text"
                    placeholder="Postal / ZIP Code *"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              )}
            </div>

            {fulfillment === 'delivery' && (
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Street Address, Suite, or Venue Name *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Complimentary Handwritten Gift Card Note"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Special Delivery Instructions (e.g. gate code)"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Payment Method Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              3. Payment Selection
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-md border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-3 rounded-md border text-center transition-all ${
                  paymentMethod === 'applepay'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="font-serif font-bold text-xs mb-1"> Pay</div>
                <span className="text-xs">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-md border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <Store className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">Pay on Handover</span>
              </button>
            </div>
          </div>

          {/* Order Summary Receipt Box */}
          <div className="p-4 bg-[#F5F2EA] rounded-md border border-stone-200 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-medium text-stone-900 tabular-nums">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Fulfillment ({fulfillment === 'pickup' ? 'Atelier Pickup' : 'Courier'})</span>
              <span className="font-medium text-stone-900 tabular-nums">
                {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-medium text-stone-900 tabular-nums">${tax}</span>
            </div>
            <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline text-sm font-serif font-bold text-stone-900">
              <span>Final Total</span>
              <span className="text-lg tabular-nums">${total}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-semibold text-xs uppercase tracking-widest rounded-md transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Securing Atelier Commission...</span>
                </div>
              ) : (
                <span>Confirm & Place Order (${total})</span>
              )}
            </button>
            <div className="mt-2 text-center flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>Complimentary cancellation or date adjustments up to 24 hours prior.</span>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
