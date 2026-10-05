import React from 'react';
import { Sparkles, Flower2, Heart, Award, Thermometer, ShieldCheck } from 'lucide-react';

export const AtelierPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2">
            03. Origin Ingredients & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight leading-tight">
            Purity of Crumb, Sculptural Buttercream
          </h2>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            We reject pre-mixes, artificial flavor essences, and palm oils. Every creation emerges from real whole foods, European dairy traditions, and botanicals steeped in small copper pans.
          </p>
        </div>

        {/* 4 Architectural Columns of Craft */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-6 bg-white border border-stone-200/90 rounded-md">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-900 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">
              AOP French Butter
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Cultured Charentes-Poitou butter with 84% butterfat. Gives our Swiss meringue buttercream its signature gossamer lightness that melts cleanly on the palate.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/90 rounded-md">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-900 flex items-center justify-center mb-4">
              <Flower2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">
              Tahitian & Bourbon Vanilla
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Whole cured vanilla bean pods with fragrant floral caviar scraped directly into our pastry creams and genoise batons. Never imitation extract.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/90 rounded-md">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-900 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">
              Valrhona Grand Cru
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Single-origin Guanaja 70% and Caraïbe 66% chocolate from France. Exceptional balance of roasted cocoa bitterness, fruit notes, and rounded acidity.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/90 rounded-md">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-900 flex items-center justify-center mb-4">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">
              The 20°C Serving Ritual
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pure butter cakes should never be eaten fridge-cold. Always rest your cake at ambient room temperature for 1–2 hours so the crumb relaxes into silky perfection.
            </p>
          </div>

        </div>

        {/* Editorial Slicing & Storage Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F4F0E8] border border-stone-300 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif font-bold text-lg text-stone-900 mb-1">
              Host Guide: Precision Grid Slicing for Tall Cakes
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Because our signature 4-layer and tiered cakes stand over 5 inches tall, cutting in traditional pie wedges often yields unwieldy portions. We recommend the Caterer's Grid Method: cut straight 1-inch slabs across the diameter, then divide into neat 2"x1" finger portions.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-stone-500 block">Complimentary with every order</span>
              <span className="text-xs font-semibold text-stone-800">Printed Chef's Slicing Chart</span>
            </div>
            <div className="p-3 bg-white rounded border border-stone-300 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-stone-800" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
