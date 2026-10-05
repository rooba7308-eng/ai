import React from 'react';
import { Heart, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1A17] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1 & 2: Brand & Atelier Summary */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif tracking-tight text-white block">
              L'Étoile Pâtisserie
            </span>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Artisanal couture celebration cakes, botanical layer confections, and bespoke dessert centerpieces baked fresh daily with pure French butter and whole vanilla pods.
            </p>
            <div className="text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>142 Boulevard Saint-Honoré, Atelier 4, 75008 Paris</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+33 (0)1 42 68 55 00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>bonjour@letoile-patisserie.fr</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
              The Collection
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Signature Celebration Cakes
                </a>
              </li>
              <li>
                <a href="#custom-builder" className="hover:text-white transition-colors">
                  Bespoke Studio Builder
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Botanical & Tea Cakes
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Gluten-Friendly Confections
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Hours */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
              Atelier Hours
            </div>
            <div className="text-xs text-stone-400 space-y-1.5 leading-relaxed">
              <p>Tuesday – Friday: 09:30 – 19:00</p>
              <p>Saturday: 09:00 – 19:30</p>
              <p>Sunday: 09:30 – 15:30</p>
              <p className="text-stone-500 pt-1">Monday: Studio Bake & Tasting Prep (Closed to Public)</p>
            </div>
          </div>

          {/* Col 5: Private Consultations */}
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
              Wedding Tastings
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Complimentary 4-flavor tasting boxes and tier sketching sessions for engaged couples and gala planners.
            </p>
            <a
              href="mailto:weddings@letoile-patisserie.fr"
              className="inline-block px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded transition-colors"
            >
              Inquire for Wedding Tasting
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Dietary Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} L'Étoile Pâtisserie Studio. Hand-crafted with French butter and seasonal botanicals.
          </div>
          <div className="flex items-center gap-6">
            <span>Allergen Notice: Kitchen handles dairy, wheat, tree nuts & eggs</span>
            <span aria-hidden="true">·</span>
            <span>Food Hygiene Rating 5/5</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
