import { useState, useEffect } from 'react';
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
  { label: 'O Problema',         action: 'scroll', id: 'problema' },
  { label: 'Soluções',           action: 'scroll', id: 'solucoes' },
  { label: 'Resultados',         action: 'scroll', id: 'resultados' },
  { label: 'Cases',              action: 'cases' },
  { label: 'Por que a Pareto?',  action: 'link',   href: ROUTE_PATHS.SOBRE },
];

const WA_LINK = 'https://api.whatsapp.com/send/?phone=5511915513210&text&type=phone_number&app_absent=0';

/* ─── HEADER ────────────────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(id), 80);
    }
  }, [isHome, location.hash]);

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
    else { navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 80); }
  };

  const handleNav = (link: typeof navLinks[number]) => {
    setMenuOpen(false);
    if (link.action === 'cases') {
      setCasesOpen(true);
    } else if (link.action === 'scroll') {
      if (isHome) scrollToSection(link.id!);
      else navigate(`/#${link.id}`);
    }
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: G400,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  return (
    <>
      <header
        className={`glass-nav ${scrolled ? 'scrolled' : ''}`}
        style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 32px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <button onClick={handleLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img src="/images/logo_white.png" alt="Pareto"
              style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'invert(1) brightness(0)' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 11,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: G400,
            }}>Plus</span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
            {navLinks.map((link) => (
              link.action === 'link' ? (
                <Link key={link.label}
                  to={link.href!}
                  onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0 }); }}
                  style={linkStyle}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = G900; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = G400; }}>
                  {link.label}
                </Link>
              ) : (
                <button key={link.label}
                  onClick={() => handleNav(link)}
                  style={{
                    ...linkStyle,
                    ...(link.action === 'cases' ? { color: G900, fontWeight: 600 } : {}),
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = G900; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = link.action === 'cases' ? G900 : G400; }}>
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
                color: LIME,
                background: G900,
                padding: '9px 20px',
                borderRadius: 3,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = G800; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = G900; }}>
              Diagnóstico Gratuito
              <span style={{ fontSize: 13 }}>→</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: G600, cursor: 'pointer', padding: 6 }}>
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
                background: 'rgba(248,246,243,0.98)',
                borderBottom: `1px solid ${G100}`,
                backdropFilter: 'blur(24px)',
                padding: '16px 24px 24px',
              }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navLinks.map((link) => (
                  link.action === 'link' ? (
                    <Link key={link.label}
                      to={link.href!}
                      onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0 }); }}
                      style={{
                        padding: '12px 0',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400, fontSize: 15,
                        color: G600, textDecoration: 'none',
                        borderBottom: `1px solid ${G100}`,
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
                        color: link.action === 'cases' ? G900 : G600,
                        background: 'none', border: 'none',
                        borderBottom: `1px solid ${G100}`,
                        cursor: 'pointer', textAlign: 'left',
                      }}>
                      {link.label}
                    </button>
                  )
                ))}
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  style={{
                    marginTop: 16, padding: '14px 24px',
                    borderRadius: 50, background: G900, color: LIME,
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
              onClick={(e) => e.stopPropagation()}
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

  const mutedLink: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, fontWeight: 300, color: 'rgba(138,130,120,0.8)',
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
            <img src="/images/logo_white.png" alt="Pareto"
              style={{ height: 26, width: 'auto', marginBottom: 16, objectFit: 'contain' }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300,
              lineHeight: 1.75, color: 'rgba(138,130,120,0.85)', maxWidth: 280, marginBottom: 24,
            }}>
              Parceiro estratégico de IA para empresas que já decidiram que o futuro começa agora.
              13 anos de operação. 300+ empresas.
            </p>

            {/* Partner badges */}
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(138,130,120,0.4)', marginBottom: 12,
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
                color: 'rgba(138,130,120,0.4)', marginBottom: 12,
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(138,130,120,0.7)"
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
              color: 'rgba(138,130,120,0.45)', marginBottom: 20,
            }}>Navegação</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home',            to: ROUTE_PATHS.HOME, internal: true },
                { label: 'Por que a Pareto?', to: ROUTE_PATHS.SOBRE, internal: true },
                { label: 'Privacidade',     to: ROUTE_PATHS.PRIVACIDADE, internal: true },
                { label: 'Tess AI',         href: 'https://tess.im', external: true },
                { label: 'pareto.io',       href: 'https://pareto.io', external: true },
                { label: 'AI for Business', href: 'https://pareto.io/ai-for-business', external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.internal ? (
                    <Link to={item.to!}
                      style={mutedLink}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(138,130,120,0.8)'; }}>
                      {item.label}
                    </Link>
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
              color: 'rgba(138,130,120,0.45)', marginBottom: 20,
            }}>Contato</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(138,130,120,0.55)' }}>
                Av. Paulista, 2.022 - 2º andar
              </li>
              <li style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(138,130,120,0.55)' }}>
                Consolação — São Paulo/SP
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
              fontSize: 13, fontWeight: 300, color: 'rgba(138,130,120,0.75)', margin: 0,
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
            fontSize: 12, fontWeight: 300, color: 'rgba(74,69,64,0.8)',
          }}>
            © 2026 Pareto Soluções em Tecnologia Ltda. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link to={ROUTE_PATHS.PRIVACIDADE}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(74,69,64,0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(138,130,120,0.8)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(74,69,64,0.8)'; }}>
              Política de Privacidade
            </Link>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(203,236,46,0.4)',
            }}>LGPD Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
