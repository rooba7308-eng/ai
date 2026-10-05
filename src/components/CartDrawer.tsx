import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 120;
  const awayFromFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif font-bold text-lg text-stone-900">Your Order Bag</h2>
              <span className="text-xs text-stone-500 font-sans tabular-nums">
                ({items.reduce((s, i) => s + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Delivery Progress */}
          <div className="px-6 py-3 bg-[#F4F1EA] border-b border-stone-200 text-xs">
            {awayFromFreeDelivery > 0 ? (
              <div>
                <span className="text-stone-700">
                  Add <strong className="tabular-nums font-serif text-stone-900">${awayFromFreeDelivery}</strong> more for complimentary courier delivery.
                </span>
                <div className="w-full bg-stone-300 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-amber-800 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>You unlocked complimentary white-glove courier delivery!</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                  <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover our signature cakes or design your bespoke centerpiece in our custom atelier.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="p-4 bg-white border border-stone-200/90 rounded-md flex gap-4 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-stone-400 hover:text-rose-700 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-500 mt-0.5">{item.size}</div>

                      {/* Inscription Note if present */}
                      {item.inscription && (
                        <div className="text-[11px] text-amber-900 bg-amber-50/80 px-2 py-0.5 rounded mt-1.5 border border-amber-200/60 inline-block">
                          Plaque: "{item.inscription}"
                        </div>
                      )}

                      {/* Custom details if bespoke */}
                      {item.customDetails && (
                        <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                          <div>Sponge: {item.customDetails.sponge}</div>
                          <div>Filling: {item.customDetails.filling}</div>
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                      <div className="flex items-center border border-stone-200 rounded">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          disabled={item.quantity <= 1}
                          className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:hover:text-stone-500"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-sm text-stone-900 tabular-nums">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900 tabular-nums">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Courier Delivery</span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    {subtotal >= freeDeliveryThreshold ? (
                      <span className="text-emerald-700">Complimentary</span>
                    ) : (
                      '$18 (or Free Pickup)'
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                <span className="font-serif font-bold text-base text-stone-900">Total</span>
                <span className="font-serif font-bold text-xl text-stone-900 tabular-nums">
                  ${subtotal}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-400">
                Select pickup or delivery date & time in the next step.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
