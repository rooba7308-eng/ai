import React, { useState, useEffect } from 'react';
import { CAKE_ITEMS } from './data/cakes';
import { CakeItem, CakeSize, CartItem, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CakesCatalog } from './components/CakesCatalog';
import { CakeQuickViewModal } from './components/CakeQuickViewModal';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { AtelierPhilosophy } from './components/AtelierPhilosophy';
import { DeliverySchedulerBanner } from './components/DeliverySchedulerBanner';
import { Testimonials } from './components/Testimonials';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('letoile_cake_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quickViewCake, setQuickViewCake] = useState<CakeItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('letoile_cake_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [cart]);

  // Toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add standard signature cake to cart
  const handleAddToCart = (cake: CakeItem, size: CakeSize, inscription?: string) => {
    const sizeOption = cake.sizes.find((s) => s.label === size) || cake.sizes[0];
    const cartId = `${cake.id}-${size}-${inscription || 'none'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem: CartItem = {
        cartId,
        cakeId: cake.id,
        name: cake.name,
        size: `${sizeOption.label} (${sizeOption.servings})`,
        price: sizeOption.price,
        quantity: 1,
        image: cake.image,
        inscription,
      };
      return [...prev, newItem];
    });

    showToast(`Added "${cake.name}" to your order bag`);
  };

  // Add custom bespoke builder creation to cart
  const handleAddCustomToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Added your bespoke creation to your order bag`);
    setIsCartOpen(true);
  };

  // Cart item quantity update
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Cart item removal
  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Smooth scroll to custom builder
  const scrollToCustomBuilder = () => {
    const el = document.getElementById('custom-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll to catalog
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderCompleted = (order: OrderDetails) => {
    setCompletedOrder(order);
    setCart([]); // Clear cart
    setIsCheckoutOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-950">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-md shadow-xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 border border-stone-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract Compliant Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToBuilder={scrollToCustomBuilder}
      />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero
          onExploreCakes={scrollToCatalog}
          onOpenCustomStudio={scrollToCustomBuilder}
        />

        {/* Filterable Signature Cakes Catalog */}
        <CakesCatalog
          cakes={CAKE_ITEMS}
          onSelectQuickView={(cake) => setQuickViewCake(cake)}
          onAddToCart={handleAddToCart}
        />

        {/* Bespoke Custom Cake Studio Builder */}
        <CustomCakeBuilder onAddCustomToCart={handleAddCustomToCart} />

        {/* Origin Ingredients & Slicing Philosophy */}
        <AtelierPhilosophy />

        {/* Pickup & White-Glove Courier Logistics & Postal Checker */}
        <DeliverySchedulerBanner />

        {/* Testimonials & Editorial Features */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View & Sizing Modal */}
      <CakeQuickViewModal
        cake={quickViewCake}
        onClose={() => setQuickViewCake(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout & Scheduling Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={handleOrderCompleted}
      />

      {/* Post-order Confirmation Screen */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

    </div>
  );
}
