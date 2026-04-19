import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection, WHATSAPP_URL, CALENDLY_URL, ROUTE_PATHS, PARTNER_BADGES } from '@/lib/index';

const navLinks = [
  { label: 'O Problema',    action: 'scroll', id: 'problema' },
  { label: 'Soluções',      action: 'scroll', id: 'solucoes' },
  { label: 'Resultados',    action: 'scroll', id: 'resultados' },
  { label: 'Parceria',      action: 'scroll', id: 'parceria' },
  { label: 'Sobre a Pareto', action: 'link',  href: ROUTE_PATHS.SOBRE },
];

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

  const handleNav = (link: typeof navLinks[number]) => {
    setMenuOpen(false);
    if (link.action === 'scroll' && isHome) {
      scrollToSection(link.id!);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(20,20,20,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(136,0,255,0.12)' : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-3">
            <img src="/images/logo_white.png" alt="Pareto" className="h-8 w-auto object-contain" />
            <span className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#CDFF00', letterSpacing: '0.2em' }}>Plus</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              link.action === 'link' ? (
                <Link key={link.label} to={link.href!}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              ) : (
                <button key={link.label} onClick={() => handleNav(link)}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">
                  {link.label}
                </button>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #8800FF 0%, #6600CC 100%)', color: '#fff', boxShadow: '0 0 24px rgba(136,0,255,0.35)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 42px rgba(136,0,255,0.62)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(136,0,255,0.35)'; (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}>
              Falar com Especialista <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button className="lg:hidden text-white/80 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(20,20,20,0.97)', borderTop: '1px solid rgba(136,0,255,0.12)' }}
            className="lg:hidden overflow-hidden">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.action === 'link' ? (
                  <Link key={link.label} to={link.href!} onClick={() => setMenuOpen(false)}
                    className="text-left text-lg font-medium text-white/70 hover:text-white py-2 border-b border-white/5">
                    {link.label}
                  </Link>
                ) : (
                  <button key={link.label} onClick={() => handleNav(link)}
                    className="text-left text-lg font-medium text-white/70 hover:text-white py-2 border-b border-white/5">
                    {link.label}
                  </button>
                )
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
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
    <footer className="border-t" style={{ borderColor: 'rgba(136,0,255,0.12)', background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand col */}
          <div className="md:col-span-2">
            <img src="/images/logo_white.png" alt="Pareto" className="h-8 w-auto mb-4" />
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              Parceiro estratégico de implementação de IA para empresas brasileiras com faturamento R$1M+. 13 anos construindo o futuro. #timeback
            </p>

            {/* Partner badges — imagens reais */}
            <div className="mb-4">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Parceiro oficial
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {PARTNER_BADGES.map((b) =>
                  b.img ? (
                    <div key={b.name} title={b.name}
                      style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 32, width: 50, height: 50, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                      <img src={b.img} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* CTA */}
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2"
              style={{ padding: '10px 20px', borderRadius: 99, background: 'linear-gradient(135deg, #8800FF, #6600CC)', fontSize: 12, fontWeight: 700, color: '#fff', textDecoration: 'none', boxShadow: '0 0 22px rgba(136,0,255,0.3)' }}>
              <Calendar size={14} /> Diagnóstico gratuito
            </a>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Páginas</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li><Link to={ROUTE_PATHS.HOME} className="hover:text-white/70 transition-colors">Home</Link></li>
              <li><Link to={ROUTE_PATHS.SOBRE} className="hover:text-white/70 transition-colors">Sobre a Pareto</Link></li>
              <li>
                <button onClick={() => scrollToSection('solucoes')} className="hover:text-white/70 transition-colors text-left">
                  Soluções de IA
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('resultados')} className="hover:text-white/70 transition-colors text-left">
                  Resultados
                </button>
              </li>
              <li><Link to={ROUTE_PATHS.PRIVACIDADE} className="hover:text-white/70 transition-colors">Política de Privacidade</Link></li>
              <li><a href="https://tess.im" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Tess AI ↗</a></li>
              <li><a href="https://pareto.io" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">pareto.io ↗</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li>Rio de Janeiro · São Paulo</li>
              <li>Est. 2011 · Global</li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="hover:text-white/70 transition-colors">
                  WhatsApp: +55 21 99851-4094
                </a>
              </li>
              <li>
                <a href="mailto:privacidade@pareto.io" className="hover:text-white/70 transition-colors">
                  privacidade@pareto.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">© 2026 Pareto Soluções em Tecnologia Ltda. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-xs text-white/20">
            <Link to={ROUTE_PATHS.PRIVACIDADE} className="hover:text-white/40 transition-colors">
              Política de Privacidade
            </Link>
            <span>LGPD Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
