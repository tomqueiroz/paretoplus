import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  scrollToSection,
  WHATSAPP_URL,
  ROUTE_PATHS,
  CALENDLY_URL,
  PARTNER_BADGES,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from '@/lib/index';

// Nav links with correct hrefs/ids
const navLinks = [
  { label: 'O Problema',      action: 'scroll', id: 'problema' },
  { label: 'Soluções',        action: 'scroll', id: 'solucoes' },
  { label: 'Resultados',      action: 'scroll', id: 'resultados' },
  { label: 'Por que a Pareto',action: 'link',   href: '/por-que-pareto' },
  { label: 'Tess AI',         action: 'link',   href: '/tess-ai' },
  { label: 'Sobre',           action: 'link',   href: ROUTE_PATHS.SOBRE },
] as const;

type NavLink = typeof navLinks[number];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (link: NavLink) => {
    setMenuOpen(false);
    if (link.action === 'scroll' && isHome) {
      scrollToSection(link.id!);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(136,0,255,0.15)' : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-3">
            <img src="/images/logo_white.png" alt="Pareto" className="h-8 w-auto object-contain" />
            <span className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#CDFF00', letterSpacing: '0.2em' }}>Plus</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              link.action === 'link' ? (
                <Link
                  key={link.label}
                  to={'href' in link ? link.href : '#'}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">
                  {link.label}
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #8800FF 0%, #6600CC 100%)',
                color: '#fff',
                boxShadow: '0 0 24px rgba(136,0,255,0.35)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(136,0,255,0.6)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(136,0,255,0.35)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}>
              Falar com Especialista <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white/80 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(13,13,13,0.97)', borderTop: '1px solid rgba(136,0,255,0.15)' }}
            className="lg:hidden overflow-hidden">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.action === 'link' ? (
                  <Link
                    key={link.label}
                    to={'href' in link ? link.href : '#'}
                    onClick={() => setMenuOpen(false)}
                    className="text-left text-lg font-medium text-white/70 hover:text-white py-2 border-b border-white/5">
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link)}
                    className="text-left text-lg font-medium text-white/70 hover:text-white py-2 border-b border-white/5">
                    {link.label}
                  </button>
                )
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#8800FF,#6600CC)' }}>
                Falar com Especialista <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(136,0,255,0.15)', background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">

          {/* Column 1: Brand + badges */}
          <div>
            <img src="/images/logo_white.png" alt="Pareto" className="h-8 w-auto mb-4" />
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              Parceiro estratégico de implementação de IA para empresas brasileiras.<br />
              13+ anos construindo o futuro. #timeback
            </p>
            {/* 6 badge images — real partner logos */}
            <div className="flex flex-wrap gap-3 items-center">
              {PARTNER_BADGES.map((b) =>
                b.img ? (
                  <div
                    key={b.name}
                    title={b.name}
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      borderRadius: 32,
                      width: 52,
                      height: 52,
                      padding: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}>
                    <img src={b.img} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ) : (
                  <span
                    key={b.name}
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: 'rgba(136,0,255,0.1)', color: 'rgba(136,0,255,0.7)', border: '1px solid rgba(136,0,255,0.2)' }}>
                    {b.name}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Column 2: Navegação */}
          <div>
            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6">Navegação</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link to={ROUTE_PATHS.HOME} className="hover:text-white/70 transition-colors">Home</Link></li>
              <li><Link to="/por-que-pareto" className="hover:text-white/70 transition-colors">Por que a Pareto?</Link></li>
              <li><Link to="/tess-ai" className="hover:text-white/70 transition-colors">Tess AI</Link></li>
              <li><Link to={ROUTE_PATHS.SOBRE} className="hover:text-white/70 transition-colors">Sobre</Link></li>
              <li><Link to={ROUTE_PATHS.PRIVACIDADE} className="hover:text-white/70 transition-colors">Privacidade</Link></li>
            </ul>
          </div>

          {/* Column 3: Contato */}
          <div>
            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6">Contato</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#8800FF' }} />
                <span>{CONTACT_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#8800FF' }} />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#8800FF' }} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white/70 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #8800FF, #6600CC)', boxShadow: '0 0 20px rgba(136,0,255,0.3)' }}>
              <Calendar className="w-3 h-3" /> Diagnóstico gratuito
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(136,0,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Pareto Plus. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <Link to={ROUTE_PATHS.PRIVACIDADE} className="hover:text-white/50 transition-colors">
              Política de Privacidade · LGPD
            </Link>
            <span>Est. 2011 · São Paulo · Palo Alto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Default Layout wrapper ───────────────────────────────────────────────────
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen" style={{ background: '#1A1A1A' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
