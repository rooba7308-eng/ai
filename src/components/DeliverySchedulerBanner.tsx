import React, { useState } from 'react';
import { Truck, Store, Calendar, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';

export const DeliverySchedulerBanner: React.FC = () => {
  const [postalInput, setPostalInput] = useState('');
  const [postalStatus, setPostalStatus] = useState<'idle' | 'eligible' | 'ineligible'>('idle');

  const checkPostal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalInput.trim()) return;
    // Simulate smart zone lookup
    const clean = postalInput.trim().toUpperCase();
    if (clean.length >= 3) {
      setPostalStatus('eligible');
    } else {
      setPostalStatus('ineligible');
    }
  };

  return (
    <section id="delivery-info" className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Delivery logistics & Postal Checker */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2">
                04. Logistics & Preservation
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight leading-tight">
                White-Glove Courier or Boutique Atelier Pickup
              </h2>
              <p className="text-sm text-stone-600 mt-2.5 leading-relaxed">
                We safeguard delicate buttercream, wafer-thin sugar flowers, and tall cake tiers in dedicated refrigerated transport crates.
              </p>
            </div>

            {/* Comparison Cards: Pickup vs Courier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-stone-200/90 rounded-md">
                <div className="flex items-center gap-2.5 text-stone-900 font-serif font-bold text-base mb-2">
                  <Store className="w-5 h-5 text-amber-800" />
                  <span>Atelier Studio Pickup</span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <p>• Complimentary with all orders</p>
                  <p>• Reserved curb collection bay</p>
                  <p>• Hand-inspected and boxed by chef</p>
                  <p className="text-stone-400 text-[11px] pt-1">Tue – Sun: 10:00 AM – 6:30 PM</p>
                </div>
              </div>

              <div className="p-5 bg-white border border-stone-200/90 rounded-md">
                <div className="flex items-center gap-2.5 text-stone-900 font-serif font-bold text-base mb-2">
                  <Truck className="w-5 h-5 text-amber-800" />
                  <span>White-Glove Courier</span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <p>• Climate-controlled level transport</p>
                  <p>• Guaranteed 3-hour arrival window</p>
                  <p>• Direct handover to venue or host</p>
                  <p className="text-stone-400 text-[11px] pt-1">Flat $18 / Free on orders over $120</p>
                </div>
              </div>
            </div>

            {/* Interactive Postal Eligibility Checker */}
            <div className="p-4 bg-stone-100 rounded-md border border-stone-200">
              <form onSubmit={checkPostal} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={postalInput}
                    onChange={(e) => {
                      setPostalInput(e.target.value);
                      setPostalStatus('idle');
                    }}
                    placeholder="Enter delivery ZIP / Postal code"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  Verify Delivery Zone
                </button>
              </form>

              {postalStatus === 'eligible' && (
                <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-800 font-medium animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zone Verified! White-glove refrigerated courier available for {postalInput.toUpperCase()}.</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Atelier Address & Packaging Guarantee */}
          <div className="lg:col-span-5 bg-[#F4F1EA] border border-stone-300 rounded-lg p-6 sm:p-7">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
              Our Flagship Atelier
            </h3>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Drop by to sample seasonal macarons, discuss wedding tier sketches, or pick up pre-ordered confections.
            </p>

            <div className="space-y-3 text-xs text-stone-700 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">L'Étoile Pâtisserie Studio</div>
                  <div>142 Boulevard Saint-Honoré, Atelier 4</div>
                  <div className="text-stone-500">75008 Paris / Metropolitan Delivery District</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-900 shrink-0" />
                <div>
                  <span className="font-semibold text-stone-900">Boutique Doors: </span>
                  <span>Tuesday through Sunday · 09:30 – 19:00</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-900 shrink-0" />
                <div>
                  <span className="font-semibold text-stone-900">Advance Notice: </span>
                  <span>Minimum 24h for Signature, 48h for Bespoke Tiers</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded border border-stone-200 text-[11px] text-stone-600 leading-normal">
              <strong>Atelier Car Transit Advice:</strong> When picking up personally, keep your vehicle air-conditioned and place the cake box flat on the front passenger floorboard, never tilted on a slanted car seat.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
