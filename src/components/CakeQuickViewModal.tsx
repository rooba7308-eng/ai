import React, { useState } from 'react';
import { CakeItem, CakeSize } from '../types';
import { X, Check, Clock, AlertCircle, Sparkles, ChefHat } from 'lucide-react';

interface CakeQuickViewModalProps {
  cake: CakeItem | null;
  onClose: () => void;
  onAddToCart: (cake: CakeItem, size: CakeSize, inscription?: string) => void;
}

export const CakeQuickViewModal: React.FC<CakeQuickViewModalProps> = ({
  cake,
  onClose,
  onAddToCart,
}) => {
  if (!cake) return null;

  const [selectedSize, setSelectedSize] = useState<CakeSize>(cake.sizes[0].label);
  const [inscription, setInscription] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'slicing' | 'allergens'>('details');
  const [isAdded, setIsAdded] = useState(false);

  const currentSizeObj = cake.sizes.find((s) => s.label === selectedSize) || cake.sizes[0];

  const handleAdd = () => {
    onAddToCart(cake, selectedSize, inscription.trim() ? inscription.trim() : undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-lg border border-stone-200 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image & Highlights */}
          <div className="md:col-span-6 bg-stone-100 flex flex-col">
            <div className="relative aspect-[4/3] md:aspect-square w-full">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                Baked in small morning batches
              </div>
            </div>

            {/* Flavor Profile Palette */}
            <div className="p-6 bg-[#F4F1EA] flex-1">
              <div className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-2">
                Flavor Architecture
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {cake.flavorNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/80 text-stone-800 px-2.5 py-1 rounded border border-stone-200"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Requires at least {cake.leadTimeHours} hours preparation lead time</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Add to Bag */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Title */}
              <div className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-1">
                {cake.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {cake.name}
              </h2>
              <p className="text-xs italic text-stone-500 mb-4">{cake.frenchSubtitle}</p>

              {/* Tabs for details / allergens / slicing */}
              <div className="flex items-center gap-2 border-b border-stone-200 mb-4 pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`text-xs font-semibold pb-1 transition-colors ${
                    activeTab === 'details'
                      ? 'text-stone-900 border-b-2 border-stone-900'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('slicing')}
                  className={`text-xs font-semibold pb-1 transition-colors ${
                    activeTab === 'slicing'
                      ? 'text-stone-900 border-b-2 border-stone-900'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Serving & Temperature
                </button>
                <button
                  onClick={() => setActiveTab('allergens')}
                  className={`text-xs font-semibold pb-1 transition-colors ${
                    activeTab === 'allergens'
                      ? 'text-stone-900 border-b-2 border-stone-900'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Allergens & Origin
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 min-h-[75px]">
                {activeTab === 'details' && <p>{cake.description}</p>}
                {activeTab === 'slicing' && (
                  <div>
                    <p className="mb-2">{cake.storageServingGuide}</p>
                    <p className="text-stone-500 text-xs">
                      Pro Tip: Use a tall chef's knife dipped in hot water and wiped dry between cuts for immaculate cross-sections.
                    </p>
                  </div>
                )}
                {activeTab === 'allergens' && (
                  <div>
                    <div className="font-medium text-stone-900 mb-1">Contains:</div>
                    <div className="text-xs text-stone-600 mb-2">{cake.allergens.join(', ')}</div>
                    <div className="text-[11px] text-stone-500">
                      Crafted in our boutique studio that also handles wheat, tree nuts, and dairy.
                    </div>
                  </div>
                )}
              </div>

              {/* Sizing & Tier Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
                  Select Size & Guest Servings
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cake.sizes.map((size) => {
                    const isSelected = selectedSize === size.label;
                    return (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSelectedSize(size.label)}
                        className={`text-left p-3 rounded-md border transition-all ${
                          isSelected
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs">{size.label}</span>
                          <span className="font-serif font-bold text-xs tabular-nums">
                            ${size.price}
                          </span>
                        </div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            isSelected ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          {size.servings}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Custom Inscription */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Custom Inscription Plaque (Complimentary)</span>
                  <span className="text-[11px] font-normal text-stone-500 tabular-nums">
                    {inscription.length}/35 chars
                  </span>
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Camille"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Hand-piped in dark Belgian chocolate on a white fondant or chocolate plaque.
                </p>
              </div>
            </div>

            {/* Bottom Add to Bag Bar */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 block">Total</span>
                <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                  ${currentSizeObj.price}
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={isAdded}
                className={`flex-1 py-3 px-6 rounded-md font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Add to Order Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
