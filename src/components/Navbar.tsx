import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateToBuilder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#"
            className="text-2xl sm:text-3xl font-serif tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap"
          >
            L'Étoile Pâtisserie
          </a>

          {/* Zone 2: 4-6 Clean text navigation links with subtle underline */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <a
              href="#catalog"
              className="hover:text-stone-950 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-stone-800 after:transition-all whitespace-nowrap"
            >
              Signature Cakes
            </a>
            <a
              href="#custom-builder"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToBuilder();
              }}
              className="hover:text-stone-950 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-stone-800 after:transition-all whitespace-nowrap"
            >
              Bespoke Studio
            </a>
            <a
              href="#philosophy"
              className="hover:text-stone-950 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-stone-800 after:transition-all whitespace-nowrap"
            >
              The Atelier
            </a>
            <a
              href="#delivery-info"
              className="hover:text-stone-950 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-stone-800 after:transition-all whitespace-nowrap"
            >
              Pickup & Courier
            </a>
            <a
              href="#testimonials"
              className="hover:text-stone-950 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-stone-800 after:transition-all whitespace-nowrap"
            >
              Client Notes
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToBuilder}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Build Bespoke Cake
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Open shopping bag"
              className="relative p-2.5 text-stone-800 hover:text-stone-950 rounded-md hover:bg-stone-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-stone-900 rounded-full tabular-nums shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 space-y-3">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-stone-800 hover:bg-stone-100 rounded-md"
            >
              Signature Cakes
            </a>
            <a
              href="#custom-builder"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToBuilder();
              }}
              className="block px-3 py-2 text-base font-medium text-stone-800 hover:bg-stone-100 rounded-md"
            >
              Bespoke Studio
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-stone-800 hover:bg-stone-100 rounded-md"
            >
              The Atelier & Ingredients
            </a>
            <a
              href="#delivery-info"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-stone-800 hover:bg-stone-100 rounded-md"
            >
              Pickup & Courier Delivery
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-stone-800 hover:bg-stone-100 rounded-md"
            >
              Client Notes
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToBuilder();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-200 rounded-md"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                Build Bespoke Cake
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
