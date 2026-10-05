import React from 'react';
import { REVIEWS } from '../data/cakes';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2">
            05. Celebrated Celebrations
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
            Words from Hosts & Brides
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Each bespoke cake is commissioned for a once-in-a-lifetime gathering.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-stone-200/90 rounded-md p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-stone-300 transition-colors"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-700">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-700" />
                  ))}
                </div>

                {/* Review Prose */}
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-6 font-serif">
                  "{rev.content}"
                </p>
              </div>

              {/* Author & Centerpiece metadata */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-stone-900">{rev.author}</div>
                  <div className="text-[11px] text-stone-500">{rev.role}</div>
                </div>
                <div className="text-[11px] font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                  {rev.cakeName}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Mentions - Subtle editorial quote banner */}
        <div className="mt-14 pt-8 border-t border-stone-200 text-center">
          <span className="text-xs uppercase tracking-widest text-stone-400 block mb-4">
            Featured In
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-stone-400 font-serif text-base sm:text-lg">
            <span className="hover:text-stone-700 transition-colors">Vogue Entertaining</span>
            <span className="hover:text-stone-700 transition-colors">ELLE À Table</span>
            <span className="hover:text-stone-700 transition-colors">Architectural Digest Living</span>
            <span className="hover:text-stone-700 transition-colors">Gastronomie Moderne</span>
          </div>
        </div>

      </div>
    </section>
  );
};
