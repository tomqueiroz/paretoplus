import { useState, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection, WHATSAPP_URL, CALENDLY_URL, ROUTE_PATHS, PARTNER_BADGES } from '@/lib/index';
import { useCalendly } from '@/components/CalendlyModal';

/* ─── Design tokens ─────────────────────────────────────────────────── */
const G900 = '#13100C';
const G800 = '#241F1A';
const G600 = '#4A4540';
const G400 = '#8A8278';
const G200 = '#BFB8AE';
const G100 = '#DDD7CF';
const OFF  = '#F8F6F3';
const WHITE = '#FFFFFF';
const LIME  = '#CBEC2E';

const navLinks = [
  { label: 'Home',              action: 'link',   href: ROUTE_PATHS.HOME },
  { label: 'Por que a Pareto?', action: 'submenu' },
  { label: 'IA para Negócios',  action: 'link',   href: ROUTE_PATHS.AI_APLICADA },
  { label: 'Treinamento em IA', action: 'link', href: ROUTE_PATHS.TREINAMENTO_IA },
  { label: 'PROMPTS ÚTEIS',     action: 'link',   href: ROUTE_PATHS.CONTEUDO_IA },
];

const whyParetoSubmenu = [
  { label: 'Soluções', action: 'scroll', id: 'solucoes' },
  { label: 'Resultados', action: 'scroll', id: 'resultados' },
  { label: 'Cases', action: 'cases' },
  { label: 'META DAY', action: 'link', href: ROUTE_PATHS.META_DAY },
];

const WA_LINK = 'https://api.whatsapp.com/send/?phone=5511915513210&text&type=phone_number&app_absent=0';

/* ─── HEADER ────────────────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(id), 80);
    }
  }, [isHome, location.hash]);

  useEffect(() => {
    setMenuOpen(false);
    setWhyOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogoClick = () => {
    setMenuOpen(false);
    setWhyOpen(false);
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
    else { navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 80); }
  };

  const goToHomeSection = (id: string) => {
    if (isHome) {
      scrollToSection(id);
    } else {
      navigate('/');
      window.setTimeout(() => scrollToSection(id), 120);
    }
  };

  const handleNav = (link: typeof navLinks[number]) => {
    setMenuOpen(false);
    setWhyOpen(false);
    if (link.action === 'scroll' && 'id' in link && typeof link.id === 'string') {
      goToHomeSection(link.id);
    }
  };

  const handleWhySubmenu = (item: typeof whyParetoSubmenu[number]) => {
    setMenuOpen(false);
    setWhyOpen(false);
    if (item.action === 'cases') {
      setCasesOpen(true);
    } else if (item.action === 'scroll') {
      goToHomeSection(item.id!);
    }
  };

  const navColor = 'rgba(255,255,255,0.72)';
  const navHover = WHITE;
  const linkStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: navColor,
    textDecoration: 'none',
    transition: 'color 0.25s ease',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  return (
    <>
      <header
        className={`glass-nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: scrolled ? 'rgba(19,16,12,0.97)' : 'rgba(19,16,12,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 32px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo branco oficial no menu superior */}
          <button onClick={handleLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img
              data-image-slot="brand.pareto.logo.light"
              src="/images/brand/pareto-logo-light.png"
              alt="Pareto Plus"
              style={{
                height: 52,
                width: 'auto',
                objectFit: 'contain',
                transition: 'opacity 0.3s ease',
              }} />
          </button>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
            {navLinks.map((link) => (
              link.action === 'submenu' ? (
                <div key={link.label} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={whyOpen}
                    onClick={() => setWhyOpen((open) => !open)}
                    style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: 5 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = navHover; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = navColor; }}>
                    {link.label}
                    <span aria-hidden="true" style={{ fontSize: 12, lineHeight: 1, transform: whyOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>⌄</span>
                  </button>
                  <AnimatePresence>
                    {whyOpen && (
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 18px)',
                          left: -14,
                          minWidth: 188,
                          padding: '8px 0',
                          background: 'rgba(19,16,12,0.98)',
                          border: '1px solid rgba(255,255,255,0.14)',
                          borderRadius: 10,
                          boxShadow: '0 18px 44px rgba(0,0,0,0.35)',
                          backdropFilter: 'blur(20px)',
                        }}>
                        {whyParetoSubmenu.map((item) => (
                          item.action === 'link' ? (
                            <Link
                              key={item.label}
                              role="menuitem"
                              to={item.href!}
                              onClick={() => { setWhyOpen(false); window.scrollTo({ top: 0 }); }}
                              style={{
                                display: 'block',
                                padding: '10px 16px',
                                color: 'rgba(255,255,255,0.82)',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 11,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                              }}>
                              {item.label}
                            </Link>
                          ) : (
                            <button
                              key={item.label}
                              type="button"
                              role="menuitem"
                              onClick={() => handleWhySubmenu(item)}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px 16px',
                                color: item.action === 'cases' ? LIME : 'rgba(255,255,255,0.82)',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 11,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}>
                              {item.label}
                            </button>
                          )
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : link.action === 'link' ? (
                <Link key={link.label}
                  to={link.href!}
                  onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0 }); }}
                  style={{ ...linkStyle }}
                  onMouseEnter={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.color = navHover; }}
                  onMouseLeave={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.color = navColor; }}>
                  {link.label}
                </Link>
              ) : (
                <button key={link.label}
                  onClick={() => handleNav(link)}
                  style={{ ...linkStyle }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = navHover; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = navColor; }}>
                  {link.label}
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="desktop-nav">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: G900,
                background: LIME,
                padding: '9px 20px',
                borderRadius: 3,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#D9F65A'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = LIME; }}>
              Diagnóstico Gratuito
              <span style={{ fontSize: 13 }}>→</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: WHITE, cursor: 'pointer', padding: 6 }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              style={{
                position: 'absolute', top: 64, left: 0, right: 0, zIndex: 999,
                background: 'rgba(19,16,12,0.98)',
                borderBottom: `1px solid ${G800}`,
                backdropFilter: 'blur(24px)',
                padding: '16px 24px 24px',
              }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navLinks.map((link) => (
                  link.action === 'submenu' ? (
                    <div key={link.label} style={{ borderBottom: `1px solid ${G800}` }}>
                      <button
                        type="button"
                        aria-expanded={whyOpen}
                        onClick={() => setWhyOpen((open) => !open)}
                        style={{
                          width: '100%',
                          padding: '12px 0',
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 15,
                          color: 'rgba(255,255,255,0.78)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        {link.label}
                        <span aria-hidden="true" style={{ color: LIME, fontSize: 18, transform: whyOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>⌄</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {whyOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', paddingBottom: 6 }}>
                            {whyParetoSubmenu.map((item) => (
                              item.action === 'link' ? (
                                <Link
                                  key={item.label}
                                  to={item.href!}
                                  onClick={() => { setMenuOpen(false); setWhyOpen(false); window.scrollTo({ top: 0 }); }}
                                  style={{
                                    display: 'block',
                                    padding: '9px 0 9px 16px',
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 13,
                                    color: 'rgba(255,255,255,0.62)',
                                    textDecoration: 'none',
                                  }}>
                                  {item.label}
                                </Link>
                              ) : (
                                <button
                                  key={item.label}
                                  type="button"
                                  onClick={() => handleWhySubmenu(item)}
                                  style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '9px 0 9px 16px',
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 13,
                                    color: item.action === 'cases' ? LIME : 'rgba(255,255,255,0.62)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                  }}>
                                  {item.label}
                                </button>
                              )
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.action === 'link' ? (
                    <Link key={link.label}
                      to={link.href!}
                      onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0 }); }}
                      style={{
                        padding: '12px 0',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 15,
                        color: 'rgba(255,255,255,0.78)',
                        textDecoration: 'none',
                        borderBottom: `1px solid ${G800}`,
                      }}>
                      {link.label}
                    </Link>
                  ) : (
                    <button key={link.label}
                      onClick={() => handleNav(link)}
                      style={{
                        padding: '12px 0',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400, fontSize: 15,
                        color: link.action === 'cases' ? LIME : 'rgba(255,255,255,0.78)',
                        background: 'none', border: 'none',
                        borderBottom: `1px solid ${G800}`,
                        cursor: 'pointer', textAlign: 'left',
                      }}>
                      {link.label}
                    </button>
                  )
                ))}
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  style={{
                    marginTop: 16, padding: '14px 24px',
                    borderRadius: 50, background: LIME, color: G900,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                    fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase',
                    textDecoration: 'none', textAlign: 'center',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                  Diagnóstico Gratuito →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cases popup */}
      <AnimatePresence>
        {casesOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(19,16,12,0.85)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
            }}
            onClick={() => setCasesOpen(false)}>
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              onClick={(e: ReactMouseEvent<HTMLDivElement>) => e.stopPropagation()}
              style={{
                position: 'relative', width: '100%', maxWidth: 1100,
                height: '85vh', borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${G200}`,
                boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
              }}>
              <button onClick={() => setCasesOpen(false)}
                style={{
                  position: 'absolute', top: 14, right: 14, zIndex: 10,
                  background: 'rgba(248,246,243,0.95)', border: `1px solid ${G200}`,
                  borderRadius: 8, color: G900, cursor: 'pointer',
                  padding: '6px 14px', fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                <X size={15} /> Fechar
              </button>
              <iframe
                src="https://cases.pareto.io/"
                title="Pareto AI Cases"
                style={{ width: '100%', height: '100%', border: 'none', background: WHITE }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────── */
export function Footer() {
  const { open: openCalendly } = useCalendly();
  const location = useLocation();
  const navigate = useNavigate();

  const goToHomeSection = (id: string) => {
    if (location.pathname === '/') {
      scrollToSection(id);
    } else {
      navigate('/');
      window.setTimeout(() => scrollToSection(id), 120);
    }
  };

  const mutedLink: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, fontWeight: 300, color: WHITE,
    textDecoration: 'none', transition: 'color 0.2s ease',
  };

  return (
    <footer style={{ background: G900, borderTop: `1px solid ${G800}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 40px' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40, marginBottom: 48,
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <img
              data-image-slot="brand.pareto.logo.light"
              src="/images/brand/pareto-logo-light.png"
              alt="Pareto Plus"
              style={{
                height: 50,
                width: 'auto',
                marginBottom: 16,
                objectFit: 'contain',
              }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300,
              lineHeight: 1.75, color: WHITE, maxWidth: 280, marginBottom: 24,
            }}>
              Parceiro estratégico de IA para empresas que já decidiram que o futuro começa agora.
              13 anos de operação. 300+ empresas.
            </p>

            {/* Partner badges */}
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: WHITE, marginBottom: 12,
              }}>Parceiro oficial</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {PARTNER_BADGES.map((b) =>
                  b.img ? (
                    <div key={b.name} title={b.name}
                      style={{
                        background: 'rgba(255,255,255,0.9)', borderRadius: 28,
                        width: 42, height: 42, padding: 5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 16px rgba(203,236,46,0.25)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)'; }}>
                      <img src={b.img} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Social */}
            <div style={{ marginTop: 20 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: WHITE, marginBottom: 12,
              }}>Redes Sociais</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/pareto-io', svg: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>' },
                  { label: 'Instagram', href: 'https://www.instagram.com/pareto.io', svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
                  { label: 'YouTube',   href: 'https://www.youtube.com/@paretoio',          svg: '<path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>' },
                  { label: 'X',         href: 'https://x.com/pareto_io',                     svg: '<path d="M4 4l16 16M20 4L4 20"/>' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(203,236,46,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(203,236,46,0.3)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: s.svg }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: WHITE, marginBottom: 20,
            }}>Navegação</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', to: ROUTE_PATHS.HOME, internal: true },
                { label: 'Por que a Pareto?', to: ROUTE_PATHS.SOBRE, internal: true, group: true },
                { label: 'O Problema', section: 'problema', group: true },
                { label: 'Soluções', section: 'solucoes', group: true },
                { label: 'Resultados', section: 'resultados', group: true },
                { label: 'Cases', href: 'https://cases.pareto.io/', external: true, group: true },
                { label: 'META DAY', to: ROUTE_PATHS.META_DAY, internal: true, group: true },
                { label: 'PROMPTS ÚTEIS', to: ROUTE_PATHS.CONTEUDO_IA, internal: true },
                { label: 'IA para Negócios', to: ROUTE_PATHS.AI_APLICADA, internal: true },
                { label: 'Treinamento em IA', to: ROUTE_PATHS.TREINAMENTO_IA, internal: true },
                { label: 'Quem Somos — IA',  to: ROUTE_PATHS.AI_QUEM_SOMOS, internal: true },
                { label: 'Empresas',          to: ROUTE_PATHS.AI_EMPRESAS, internal: true },
                { label: 'Executivos',        to: ROUTE_PATHS.AI_EXECUTIVOS, internal: true },
                { label: 'Formação & Upskilling', to: ROUTE_PATHS.AI_MENTORIA, internal: true },
                { label: 'AI.M + Pareto Plus', to: ROUTE_PATHS.AI_PARETO, internal: true },
                { label: 'Radar AI',           to: ROUTE_PATHS.AI_BLOG, internal: true },
                { label: 'Privacidade & Termos', to: ROUTE_PATHS.PRIVACIDADE, internal: true, scrollTop: true },
                { label: 'Tess AI',         href: 'https://tess.im', external: true },
                { label: 'pareto.io',       href: 'https://pareto.io', external: true },
                { label: 'AI for Business', href: 'https://pareto.io/ai-for-business', external: true },
              ].map((item) => (
                <li key={item.label} style={item.group && item.label !== 'Por que a Pareto?' ? { paddingLeft: 14, borderLeft: `1px solid ${G800}` } : undefined}>
                  {item.internal ? (
                    <Link to={item.to!}
                      onClick={() => { window.scrollTo({ top: 0 }); }}
                      style={mutedLink}
                      onMouseEnter={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.color = 'rgba(138,130,120,0.8)'; }}>
                      {item.label}
                    </Link>
                  ) : item.section ? (
                    <button
                      type="button"
                      onClick={() => goToHomeSection(item.section!)}
                      style={{
                        ...mutedLink,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                      }}>
                      {item.label}
                    </button>
                  ) : (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={mutedLink}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(138,130,120,0.8)'; }}>
                      {item.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: WHITE, marginBottom: 20,
            }}>Contato</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: WHITE }}>
                Pareto Plus&nbsp; |&nbsp; IA Multimodal
              </li>
              <li style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: WHITE }}>
                Av. Paulista, 2022 — Consolação — São Paulo/SP
              </li>
              <li>
                <a href="https://wa.me/5511915513210?text=Ol%C3%A1%21+Vim+pelo+site+Pareto+Plus."
                  target="_blank" rel="noopener noreferrer"
                  style={{ ...mutedLink, display: 'flex', alignItems: 'center', gap: 6 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LIME; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(138,130,120,0.8)'; }}>
                  +55 11 91551-3210
                </a>
              </li>
              <li>
                <a href="mailto:tom.queiroz@pareto.plus"
                  style={mutedLink}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(138,130,120,0.8)'; }}>
                  tom.queiroz@pareto.plus
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA strip */}
        <div style={{
          marginBottom: 32, padding: '32px 0',
          borderTop: `1px solid ${G800}`, borderBottom: `1px solid ${G800}`,
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700, fontSize: 20, color: WHITE,
              margin: '0 0 6px', letterSpacing: '-0.5px',
            }}>
              Pronto para transformar sua operação com IA?
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 300, color: WHITE, margin: 0,
            }}>
              Diagnóstico gratuito de 30 min com um especialista Pareto.
            </p>
          </div>
          <button onClick={openCalendly}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 50,
              background: LIME, color: G900,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase',
              whiteSpace: 'nowrap', border: 'none', cursor: 'pointer',
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(203,236,46,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
            Agendar com Especialista →
          </button>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 300, color: WHITE,
          }}>
            © 2026 Pareto Plus Ltda. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link to={ROUTE_PATHS.PRIVACIDADE}
              onClick={() => window.scrollTo({ top: 0 })}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: WHITE, textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.color = LIME; }}
              onMouseLeave={(e: ReactMouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.color = WHITE; }}>
              Privacidade & Termos de Uso
            </Link>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: WHITE,
            }}>LGPD Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
