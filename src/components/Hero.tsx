import React, { useState } from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Heart } from 'lucide-react';
import heroCakeImg from '../assets/images/hero_artisan_celebration_cake_1791181882966.jpg';

interface HeroProps {
  onExploreCakes: () => void;
  onOpenCustomStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCakes,
  onOpenCustomStudio,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Zero-Pill Unboxed Editorial Metadata */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-4">
              <span>Haute Pâtisserie</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>Fresh Daily Small Batches</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>Charentes-Poitou Butter</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.12] tracking-tight mb-6 max-w-xl text-balance">
              Couture Cakes for Life’s Most Radiant Celebrations
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-lg">
              Hand-crafted botanical sponge layers, single-origin Valrhona chocolate, and silky Swiss meringue buttercream. Baked fresh each morning in our French atelier for weddings, birthdays, and unforgettable dinner tables.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreCakes}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-sm whitespace-nowrap"
              >
                <span>View Signature Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomStudio}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-[#EFECE6] hover:bg-[#E5E1D8] border border-stone-300 rounded-md transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Bespoke Cake Studio</span>
              </button>
            </div>

            {/* Editorial trust markers - unboxed */}
            <div className="pt-6 border-t border-stone-200/90 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-lg font-serif font-bold text-stone-900 tabular-nums">24–48h</div>
                <div className="text-xs text-stone-500 mt-0.5">Notice for pickup or courier delivery</div>
              </div>
              <div>
                <div className="text-lg font-serif font-bold text-stone-900 tabular-nums">100%</div>
                <div className="text-xs text-stone-500 mt-0.5">Real French butter & Madagascar vanilla</div>
              </div>
              <div>
                <div className="text-lg font-serif font-bold text-stone-900 tabular-nums">4.9 ★</div>
                <div className="text-xs text-stone-500 mt-0.5">Over 1,200 celebration centerpieces</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Feature */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Image Frame with soft shadow and delicate border */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden border border-stone-200/80 shadow-md bg-stone-100">
                {!imageError ? (
                  <img
                    src={heroCakeImg}
                    alt="Artisanal multi-tiered luxury celebration cake with gold leaf and fresh garden florals"
                    className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-8 text-center">
                    <Sparkles className="w-12 h-12 text-amber-600 mb-3" />
                    <span className="font-serif text-2xl text-stone-900">L'Impératrice Grand Tier</span>
                    <span className="text-sm text-stone-500 mt-1">Artisan celebration cake</span>
                  </div>
                )}

                {/* Subtle scrim for editorial label */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent pointer-events-none" />

                {/* Overlay Caption: clean unboxed styling */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <div className="text-xs tracking-wider uppercase text-amber-200 font-medium">Bespoke Centerpiece</div>
                    <div className="text-lg font-serif font-medium">L'Impératrice Grand Tier & Gold Leaf</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-stone-300">Starting from</div>
                    <div className="text-base font-serif font-bold text-amber-200 tabular-nums">$120</div>
                  </div>
                </div>
              </div>

              {/* Floating Chef's guarantee card - subtle, single elevation */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-4 bg-[#FAF8F5] border border-stone-200/90 shadow-md rounded-md p-3.5 text-xs text-stone-700 max-w-xs">
                <div className="p-2 bg-amber-50 text-amber-800 rounded">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-stone-900">White-Glove Temperature Courier</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Delivered upright in insulated presentation crates</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
