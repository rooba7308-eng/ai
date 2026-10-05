import React, { useState, useMemo } from 'react';
import { CakeItem, CakeCategory, CakeSize } from '../types';
import { Sparkles, Eye, Plus, Check, Filter } from 'lucide-react';

interface CakesCatalogProps {
  cakes: CakeItem[];
  onSelectQuickView: (cake: CakeItem) => void;
  onAddToCart: (cake: CakeItem, size: CakeSize, inscription?: string) => void;
}

export const CakesCatalog: React.FC<CakesCatalogProps> = ({
  cakes,
  onSelectQuickView,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CakeCategory>('All Creations');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [addedCakeId, setAddedCakeId] = useState<string | null>(null);

  // Categories list
  const categories: CakeCategory[] = [
    'All Creations',
    'Celebration & Birthday',
    'Botanical & Fruit',
    'Decadent Chocolate',
    'Petite & Tea Cakes',
    'Gluten-Friendly / Vegan',
  ];

  // Filter logic
  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      const matchCategory =
        selectedCategory === 'All Creations' || cake.category === selectedCategory;
      const matchDietary =
        selectedDietary === 'all' ||
        (selectedDietary === 'gluten-free' &&
          cake.dietaryTags.some((t) => t.toLowerCase().includes('gluten'))) ||
        (selectedDietary === 'nut-free' &&
          cake.dietaryTags.some((t) => t.toLowerCase().includes('nut-free')));

      return matchCategory && matchDietary;
    });
  }, [cakes, selectedCategory, selectedDietary]);

  const handleQuickAdd = (cake: CakeItem) => {
    // Default to classic 8" or first size
    const defaultSize = cake.sizes.find(s => s.label.includes('8"')) || cake.sizes[0];
    onAddToCart(cake, defaultSize.label);
    setAddedCakeId(cake.id);
    setTimeout(() => setAddedCakeId(null), 1500);
  };

  return (
    <section id="catalog" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200">
          <div>
            {/* Zero-Pill Unboxed Category Kicker */}
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
              01. The Signature Patisserie Collection
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Artisanal Celebration Cakes
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md mt-3 md:mt-0 leading-relaxed">
            Baked to order in small morning batches. Select any design for custom inscriptions, dietary accommodations, or special tier sizing.
          </p>
        </div>

        {/* Filter Controls (Allowed as interactive segmented controls) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Dietary Filter Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs text-stone-500 font-medium">Dietary:</span>
            <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-md">
              <button
                onClick={() => setSelectedDietary('all')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedDietary === 'all'
                    ? 'bg-white text-stone-900 shadow-xs font-medium'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDietary('nut-free')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedDietary === 'nut-free'
                    ? 'bg-white text-stone-900 shadow-xs font-medium'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Nut-Free Friendly
              </button>
              <button
                onClick={() => setSelectedDietary('gluten-free')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedDietary === 'gluten-free'
                    ? 'bg-white text-stone-900 shadow-xs font-medium'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Gluten-Friendly
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid: 3-column desktop, generous whitespace gap-8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCakes.map((cake) => {
            const isJustAdded = addedCakeId === cake.id;
            return (
              <div
                key={cake.id}
                className="group flex flex-col bg-[#FCFBF9] border border-stone-200/90 rounded-md overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-300"
              >
                {/* Product Image Frame (Takes ~65% of card height, uniform 4:3 aspect ratio) */}
                <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback styled background if asset fails
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Fallback styling placeholder if image hidden */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-stone-100 text-stone-400 font-serif text-sm p-4 text-center">
                    {cake.name}
                  </div>

                  {/* Subtle single text kicker for signature/popular (no pill clusters) */}
                  {cake.isSignature && (
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                      Signature Recipe
                    </div>
                  )}
                  {!cake.isSignature && cake.isPopular && (
                    <div className="absolute top-3 left-3 bg-amber-900/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                      Boutique Favorite
                    </div>
                  )}

                  {/* Quick Action Overlay on hover */}
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={() => onSelectQuickView(cake)}
                      className="px-3.5 py-2 text-xs font-medium text-stone-900 bg-white/95 hover:bg-white rounded shadow-sm flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-600" />
                      Tasting & Sizes
                    </button>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Unboxed Category and Notice */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                      <span className="uppercase tracking-wider font-medium text-amber-900/80">
                        {cake.category}
                      </span>
                      <span>{cake.leadTimeHours}h notice</span>
                    </div>

                    {/* Cake Title */}
                    <h3
                      onClick={() => onSelectQuickView(cake)}
                      className="text-lg font-serif font-bold text-stone-900 hover:text-amber-900 cursor-pointer transition-colors leading-snug"
                    >
                      {cake.name}
                    </h3>
                    
                    {/* French subtitle */}
                    <div className="text-xs italic text-stone-500 mb-2.5">
                      {cake.frenchSubtitle}
                    </div>

                    {/* Flavor Notes (Clean unboxed inline text) */}
                    <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {cake.flavorNotes.join(' · ')}
                    </div>
                  </div>

                  {/* Bottom Purchasing Area */}
                  <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-500 block">From</span>
                      <span className="text-base font-serif font-bold text-stone-900 tabular-nums">
                        ${cake.sizes[0].price}
                      </span>
                      <span className="text-[11px] text-stone-500 ml-1">
                        / {cake.sizes[0].label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectQuickView(cake)}
                        className="px-3 py-1.5 text-xs text-stone-700 hover:text-stone-950 font-medium transition-colors"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => handleQuickAdd(cake)}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                          isJustAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-900 text-white hover:bg-stone-800'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if filtering yields no results */}
        {filteredCakes.length === 0 && (
          <div className="text-center py-16 bg-stone-50 rounded-lg border border-dashed border-stone-300">
            <p className="text-base font-serif text-stone-700">No cakes found matching this dietary filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Creations');
                setSelectedDietary('all');
              }}
              className="mt-3 text-xs font-semibold text-amber-800 underline hover:text-amber-950"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
