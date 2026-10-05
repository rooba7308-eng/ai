import React, { useState } from 'react';
import { CUSTOM_BUILDER_OPTIONS } from '../data/cakes';
import { CartItem } from '../types';
import { Sparkles, Check, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import heroCakeImg from '../assets/images/hero_artisan_celebration_cake_1791181882966.jpg';

interface CustomCakeBuilderProps {
  onAddCustomToCart: (item: CartItem) => void;
}

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({
  onAddCustomToCart,
}) => {
  const [selectedTier, setSelectedTier] = useState(CUSTOM_BUILDER_OPTIONS.tiers[1]);
  const [selectedSponge, setSelectedSponge] = useState(CUSTOM_BUILDER_OPTIONS.sponges[0]);
  const [selectedFilling, setSelectedFilling] = useState(CUSTOM_BUILDER_OPTIONS.fillings[0]);
  const [selectedFinish, setSelectedFinish] = useState(CUSTOM_BUILDER_OPTIONS.finishes[0]);
  const [selectedAccents, setSelectedAccents] = useState<string[]>(['gold-leaf']);
  const [selectedCandles, setSelectedCandles] = useState(CUSTOM_BUILDER_OPTIONS.candleSets[0]);
  const [customMessage, setCustomMessage] = useState('');
  const [activeStepTab, setActiveStepTab] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [justAdded, setJustAdded] = useState(false);

  // Accent toggle
  const toggleAccent = (id: string) => {
    setSelectedAccents((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Calculate total price
  const accentsCost = selectedAccents.reduce((acc, currId) => {
    const item = CUSTOM_BUILDER_OPTIONS.accents.find((a) => a.id === currId);
    return acc + (item ? item.price : 0);
  }, 0);

  const totalPrice =
    selectedTier.basePrice +
    selectedSponge.extra +
    selectedFilling.extra +
    selectedFinish.extra +
    accentsCost +
    selectedCandles.price;

  const handleAddToCart = () => {
    const accentsNames = selectedAccents
      .map((id) => CUSTOM_BUILDER_OPTIONS.accents.find((a) => a.id === id)?.name || id)
      .join(', ');

    const customCartItem: CartItem = {
      cartId: `custom-${Date.now()}`,
      name: `Bespoke ${selectedTier.name}`,
      size: selectedTier.servings,
      price: totalPrice,
      quantity: 1,
      image: heroCakeImg,
      inscription: customMessage.trim() || undefined,
      customDetails: {
        tier: selectedTier.name,
        sponge: selectedSponge.name,
        filling: selectedFilling.name,
        finish: selectedFinish.name,
        accents: selectedAccents.map(
          (id) => CUSTOM_BUILDER_OPTIONS.accents.find((a) => a.id === id)?.name || ''
        ),
        candles: selectedCandles.name,
      },
    };

    onAddCustomToCart(customCartItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section id="custom-builder" className="py-16 lg:py-24 bg-[#F5F2EB] border-y border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2">
            02. The Atelier Custom Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
            Design Your Bespoke Celebration Centerpiece
          </h2>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Select each tier, botanical crumb, filling reduction, and hand-gilded finish. Every bespoke commission is crafted with personalized chef oversight.
          </p>
        </div>

        {/* Builder Studio Grid: Left Visualizer + Right Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Cake Model & Real-time Bill of Materials */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-300 rounded-lg p-6 shadow-sm sticky top-24">
            
            <div className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-3">
              Live Atelier Blueprint
            </div>

            {/* Stylized Visual Tier Mockup */}
            <div className="h-64 sm:h-72 w-full bg-[#EFECE5] rounded-md border border-stone-200/90 relative flex flex-col items-center justify-center p-6 overflow-hidden">
              
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-radial from-white/70 via-transparent to-transparent pointer-events-none" />

              {/* Dynamic Tier Stack Visualization */}
              <div className="flex flex-col items-center justify-center gap-1.5 z-10 w-full max-w-[280px]">
                
                {/* Top tier (for 2-tier or 3-tier) */}
                {selectedTier.id.includes('tier') && (
                  <div
                    className={`rounded-t-sm border border-stone-400/80 flex items-center justify-center transition-all duration-300 shadow-sm ${
                      selectedFinish.id === 'slate-concrete'
                        ? 'bg-stone-700 text-stone-200'
                        : selectedFinish.id === 'vintage-lambeth'
                        ? 'bg-[#FDFCF7] border-dashed border-stone-400'
                        : selectedFinish.id === 'semi-naked'
                        ? 'bg-[#EBDDC8] border-amber-800/40'
                        : 'bg-[#FDFBF7]'
                    }`}
                    style={{
                      width: selectedTier.id === 'tier-3tier' ? '90px' : selectedTier.id === 'tier-2tier' ? '120px' : '0px',
                      height: selectedTier.id.includes('tier-2') || selectedTier.id.includes('tier-3') ? '36px' : '0px',
                      display: selectedTier.id.includes('tier-2') || selectedTier.id.includes('tier-3') ? 'flex' : 'none',
                    }}
                  >
                    <span className="text-[10px] font-serif uppercase tracking-widest opacity-70">
                      Tier 1
                    </span>
                  </div>
                )}

                {/* Middle tier (for 3-tier) */}
                {selectedTier.id === 'tier-3tier' && (
                  <div
                    className="w-36 h-9 rounded-sm border border-stone-400/80 bg-[#FAF7F0] flex items-center justify-center shadow-sm"
                  >
                    <span className="text-[10px] font-serif uppercase tracking-widest opacity-70">
                      Tier 2
                    </span>
                  </div>
                )}

                {/* Main Base Tier */}
                <div
                  className={`rounded-sm border border-stone-400/80 flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                    selectedFinish.id === 'slate-concrete'
                      ? 'bg-stone-800 text-stone-200'
                      : selectedFinish.id === 'vintage-lambeth'
                      ? 'bg-[#FFFDF9] border-dashed border-stone-400'
                      : selectedFinish.id === 'semi-naked'
                      ? 'bg-[#EBDDC8] border-amber-900/30'
                      : 'bg-[#FAF8F5]'
                  }`}
                  style={{
                    width: selectedTier.id === 'tier-6' ? '140px' : selectedTier.id === 'tier-8' ? '180px' : '220px',
                    height: '68px',
                  }}
                >
                  <span className="text-xs font-serif font-bold text-stone-800">
                    {selectedTier.name}
                  </span>
                  <span className="text-[10px] text-stone-500 font-sans">
                    {selectedTier.servings}
                  </span>
                </div>

                {/* Cake Stand Pedestal */}
                <div className="w-48 h-3 bg-stone-300 rounded-sm shadow-xs mt-1" />
                <div className="w-16 h-4 bg-stone-400 rounded-b-md shadow-xs" />
              </div>

              {/* Accent badging */}
              {selectedAccents.includes('gold-leaf') && (
                <div className="absolute top-3 right-3 text-[10px] font-semibold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
                  ✨ 24k Gold Gilded
                </div>
              )}
            </div>

            {/* Live Recipe Spec Summary */}
            <div className="mt-5 space-y-2 text-xs border-b border-stone-200 pb-4">
              <div className="flex justify-between text-stone-700">
                <span className="text-stone-500">Foundation:</span>
                <span className="font-medium text-right">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span className="text-stone-500">Sponge:</span>
                <span className="font-medium text-right">{selectedSponge.name}</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span className="text-stone-500">Core Filling:</span>
                <span className="font-medium text-right">{selectedFilling.name}</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span className="text-stone-500">Finish:</span>
                <span className="font-medium text-right">{selectedFinish.name}</span>
              </div>
              {selectedAccents.length > 0 && (
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">Accents:</span>
                  <span className="font-medium text-right truncate max-w-[190px]">
                    {selectedAccents.length} selected
                  </span>
                </div>
              )}
              {customMessage && (
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">Plaque:</span>
                  <span className="font-medium italic text-right truncate max-w-[190px]">
                    "{customMessage}"
                  </span>
                </div>
              )}
            </div>

            {/* Price & Checkout CTA */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Total Investment</span>
                <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                  ${totalPrice}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`py-3 px-6 rounded-md font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Commission Cake</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Step-by-Step Interactive Studio */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-300 rounded-lg p-6 sm:p-8 shadow-sm">
            
            {/* Step Navigation Tabs */}
            <div className="grid grid-cols-5 gap-1.5 p-1 bg-stone-100 rounded-lg mb-8 text-center">
              {[
                { step: 1, label: '1. Tier & Size' },
                { step: 2, label: '2. Sponge' },
                { step: 3, label: '3. Filling' },
                { step: 4, label: '4. Exterior' },
                { step: 5, label: '5. Accents' },
              ].map((tab) => (
                <button
                  key={tab.step}
                  onClick={() => setActiveStepTab(tab.step as any)}
                  className={`py-2 px-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeStepTab === tab.step
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* STEP 1: Tier & Size */}
            {activeStepTab === 1 && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Step 1: Choose Tier Architecture & Scale
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Select your cake scale based on guest count. All tiers include 4 internal cake layers.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {CUSTOM_BUILDER_OPTIONS.tiers.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-4 rounded-md border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-stone-900">
                              {tier.name}
                            </span>
                            <span className="text-xs text-stone-500">({tier.height})</span>
                          </div>
                          <div className="text-xs text-stone-600 mt-0.5">
                            Recommended for {tier.servings}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif font-bold text-sm text-stone-900 tabular-nums">
                            ${tier.basePrice}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                              isSelected
                                ? 'bg-stone-900 border-stone-900 text-white'
                                : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveStepTab(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800 transition-colors"
                  >
                    <span>Next: Select Sponge Base</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Sponge Flavor */}
            {activeStepTab === 2 && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Step 2: Artisan Sponge Crumb
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Every sponge is baked fresh using stone-ground flour and organic farm eggs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOM_BUILDER_OPTIONS.sponges.map((sponge) => {
                    const isSelected = selectedSponge.id === sponge.id;
                    return (
                      <div
                        key={sponge.id}
                        onClick={() => setSelectedSponge(sponge)}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-sm text-stone-900">
                              {sponge.name}
                            </span>
                            {sponge.extra > 0 && (
                              <span className="text-[11px] text-amber-800 font-semibold tabular-nums">
                                +${sponge.extra}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                            {sponge.note}
                          </p>
                        </div>

                        <div className="mt-3 flex justify-end">
                          <span
                            className={`text-[11px] font-medium ${
                              isSelected ? 'text-stone-900 font-bold' : 'text-stone-400'
                            }`}
                          >
                            {isSelected ? '✓ Selected' : 'Choose'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setActiveStepTab(1)}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Back to Tier
                  </button>
                  <button
                    onClick={() => setActiveStepTab(3)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800 transition-colors"
                  >
                    <span>Next: Select Core Filling</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Core Filling */}
            {activeStepTab === 3 && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Step 3: Signature Filling & Curd Layer
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Silky house-made fruit curds, infused creams, or caramelized textures between sponge tiers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOM_BUILDER_OPTIONS.fillings.map((fill) => {
                    const isSelected = selectedFilling.id === fill.id;
                    return (
                      <div
                        key={fill.id}
                        onClick={() => setSelectedFilling(fill)}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-sm text-stone-900">
                              {fill.name}
                            </span>
                            {fill.extra > 0 && (
                              <span className="text-[11px] text-amber-800 font-semibold tabular-nums">
                                +${fill.extra}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                            {fill.note}
                          </p>
                        </div>

                        <div className="mt-3 flex justify-end">
                          <span
                            className={`text-[11px] font-medium ${
                              isSelected ? 'text-stone-900 font-bold' : 'text-stone-400'
                            }`}
                          >
                            {isSelected ? '✓ Selected' : 'Choose'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setActiveStepTab(2)}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Back to Sponge
                  </button>
                  <button
                    onClick={() => setActiveStepTab(4)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800 transition-colors"
                  >
                    <span>Next: Buttercream Exterior</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Exterior Buttercream Texture */}
            {activeStepTab === 4 && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Step 4: Exterior Finish & Piping Style
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Silky Swiss meringue buttercream hand-crafted with European Charentes butter.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {CUSTOM_BUILDER_OPTIONS.finishes.map((finish) => {
                    const isSelected = selectedFinish.id === finish.id;
                    return (
                      <div
                        key={finish.id}
                        onClick={() => setSelectedFinish(finish)}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-stone-900">
                            {finish.name}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">{finish.note}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          {finish.extra > 0 ? (
                            <span className="text-xs text-amber-800 font-semibold tabular-nums">
                              +${finish.extra}
                            </span>
                          ) : (
                            <span className="text-xs text-stone-400">Included</span>
                          )}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                              isSelected
                                ? 'bg-stone-900 border-stone-900 text-white'
                                : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setActiveStepTab(3)}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Back to Filling
                  </button>
                  <button
                    onClick={() => setActiveStepTab(5)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white rounded hover:bg-stone-800 transition-colors"
                  >
                    <span>Next: Accents & Inscription</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Accents, Candles & Inscription */}
            {activeStepTab === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Step 5: Hand-Gilded Accents & Personalization
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Select multiple botanical or confectionery accents to crown your creation.
                  </p>
                </div>

                {/* Accents Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Gilded Accents & Florals (Multi-select)
                  </label>
                  <div className="space-y-2">
                    {CUSTOM_BUILDER_OPTIONS.accents.map((accent) => {
                      const isChecked = selectedAccents.includes(accent.id);
                      return (
                        <div
                          key={accent.id}
                          onClick={() => toggleAccent(accent.id)}
                          className={`p-3 rounded-md border cursor-pointer transition-all flex items-center justify-between ${
                            isChecked
                              ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                              : 'border-stone-200 bg-white hover:border-stone-300'
                          }`}
                        >
                          <span className="text-xs font-medium text-stone-900">
                            {accent.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-amber-800 font-semibold tabular-nums">
                              +${accent.price}
                            </span>
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isChecked
                                  ? 'bg-stone-900 border-stone-900 text-white'
                                  : 'border-stone-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Candles Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Artisan Celebration Candles
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CUSTOM_BUILDER_OPTIONS.candleSets.map((candle) => {
                      const isSelected = selectedCandles.id === candle.id;
                      return (
                        <div
                          key={candle.id}
                          onClick={() => setSelectedCandles(candle)}
                          className={`p-2.5 rounded-md border cursor-pointer text-xs transition-all ${
                            isSelected
                              ? 'border-stone-900 bg-stone-50 font-medium ring-1 ring-stone-900'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate pr-1">{candle.name}</span>
                            <span className="font-bold text-amber-900 tabular-nums shrink-0">
                              {candle.price > 0 ? `+$${candle.price}` : 'Free'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Message Plaque */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Complimentary Hand-Piped Plaque Message</span>
                    <span className="text-[11px] font-normal text-stone-500 tabular-nums">
                      {customMessage.length}/35 chars
                    </span>
                  </label>
                  <input
                    type="text"
                    maxLength={35}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. Happy 30th Birthday Madeleine!"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    onClick={() => setActiveStepTab(4)}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Back to Exterior
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                  >
                    Add Custom Cake to Bag (${totalPrice})
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
