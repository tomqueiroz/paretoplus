import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection, WHATSAPP_URL, CALENDLY_URL, ROUTE_PATHS, PARTNER_BADGES } from '@/lib/index';

const navLinks = [
  { label: 'O Problema',  action: 'scroll', id: 'problema' },
  { label: 'Soluções',    action: 'scroll', id: 'solucoes' },
  { label: 'Resultados',  action: 'scroll', id: 'resultados' },
  { label: 'Parceria',    action: 'scroll', id: 'parceria' },
  { label: 'Sobre',       action: 'link',   href: ROUTE_PATHS.SOBRE },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (link: typeof navLinks[number]) => {
    setMenuOpen(false);
    if (link.action === 'scroll') {
      if (isHome) {
        scrollToSection(link.id!);
      } else {
        // Navigate to home with hash anchor
        window.location.href = `/#${link.id}`;
      }
    }
  };

  return (
    <header
      className={`glass-nav ${scrolled ? 'scrolled' : ''}`}
      style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to={ROUTE_PATHS.HOME} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/images/logo_white.png" alt="Pareto" style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6C63FF',
          }}>Plus</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {navLinks.map((link) => (
            link.action === 'link' ? (
              <Link key={link.label} to={link.href!} style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(136,146,164,1)',
                textDecoration: 'none', transition: 'color 0.25s ease',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#6C63FF'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(136,146,164,1)'; }}>
                {link.label}
              </Link>
            ) : (
              <button key={link.label} onClick={() => handleNav(link)} style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(136,146,164,1)',
                background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.25s ease',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#6C63FF'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(136,146,164,1)'; }}>
                {link.label}
              </button>
            )
          ))}
        </nav>

        {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="desktop-nav">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12,
                color: 'rgba(255,255,255,0.55)', padding: '7px 16px', borderRadius: 6,
                textDecoration: 'none', transition: 'all 0.2s ease',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.35)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}>
              WhatsApp
            </a>
            {/* Diagnóstico Gratuito — fim do nav conforme solicitado */}
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12,
                color: '#0B0D14', padding: '8px 20px', borderRadius: 6,
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)',
                textDecoration: 'none',
                boxShadow: '0 0 0 rgba(108,99,255,0)', transition: 'box-shadow 0.25s ease, transform 0.2s ease',
                display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(108,99,255,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 rgba(108,99,255,0)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
              Diagnóstico Gratuito <ArrowRight size={13} />
            </a>
          </div>

        {/* Mobile hamburger */}
        <button className="mobile-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 6 }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'absolute', top: 64, left: 0, right: 0, zIndex: 999,
              background: 'rgba(11,13,20,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(24px)',
              padding: '20px 24px 28px',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((link) => (
                link.action === 'link' ? (
                  <Link key={link.label} to={link.href!} onClick={() => setMenuOpen(false)}
                    style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 16, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {link.label}
                  </Link>
                ) : (
                  <button key={link.label} onClick={() => handleNav(link)}
                    style={{ padding: '12px 0', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 16, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left' }}>
                    {link.label}
                  </button>
                )
              ))}
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                style={{ marginTop: 16, padding: '13px 24px', borderRadius: 6, background: '#6C63FF', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center', boxShadow: '0 0 20px rgba(108,99,255,0.3)' }}>
                Diagnóstico Gratuito
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
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080A10' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 40px' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <img src="/images/logo_white.png" alt="Pareto" style={{ height: 28, width: 'auto', marginBottom: 16, objectFit: 'contain' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: 'rgba(136,146,164,0.8)', maxWidth: 280, marginBottom: 20 }}>
              Parceiro estratégico de IA para empresas que já decidiram que o futuro começa agora. 13 anos de operação. 300+ empresas transformadas.
            </p>
            {/* Partner badge images */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(136,146,164,0.45)', marginBottom: 12 }}>
                Parceiro oficial
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {PARTNER_BADGES.map((b) =>
                  b.img ? (
                    <div key={b.name} title={b.name}
                      style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 28, width: 44, height: 44, padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.5)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(108,99,255,0.3)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)'; }}>
                      <img src={b.img} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Social */}
            <div style={{ marginTop: 20 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(136,146,164,0.45)', marginBottom: 12 }}>
                Redes Sociais
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/pareto-io', svg: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>' },
                  { label: 'Instagram', href: 'https://www.instagram.com/pareto.io', svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
                  { label: 'YouTube',   href: 'https://www.youtube.com/@paretoio',          svg: '<path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>' },
                  { label: 'TikTok',    href: 'https://www.tiktok.com/@pareto.io',           svg: '<path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>' },
                  { label: 'X',         href: 'https://x.com/pareto_io',                     svg: '<path d="M4 4l16 16M20 4L4 20"/>' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,241,53,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,241,53,0.3)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(136,146,164,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.svg }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(136,146,164,0.55)', marginBottom: 16 }}>
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home',              to: ROUTE_PATHS.HOME, internal: true },
                { label: 'Sobre a Pareto',    to: ROUTE_PATHS.SOBRE, internal: true },
                { label: 'Privacidade',       to: ROUTE_PATHS.PRIVACIDADE, internal: true },
                { label: 'Tess AI',           href: 'https://tess.im', external: true },
                { label: 'pareto.io',         href: 'https://pareto.io', external: true },
                { label: 'AI for Business',   href: 'https://pareto.io/ai-for-business', external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.internal ? (
                    <Link to={item.to!}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(136,146,164,0.7)'; }}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(136,146,164,0.7)'; }}>
                      {item.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(136,146,164,0.55)', marginBottom: 16 }}>
              Contato
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
  <li style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.55)' }}>
                Av. Paulista, 2.022 - 2º andar
              </li>
              <li style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.55)' }}>
                Consolação - São Paulo/SP
              </li>
              <li>
                <a href="https://wa.me/5511915513210?text=Ol%C3%A1%21+Vim+pelo+site+Pareto+Plus+e+gostaria+de+falar+com+um+especialista." target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.7)', textDecoration: 'none', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: 6 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C8F135'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(136,146,164,0.7)'; }}>
                  <span style={{ fontSize: 15 }}>💬</span> +55 11 91551-3210
                </a>
              </li>
              <li>
                <a href="mailto:tom.queiroz@pareto.plus"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(136,146,164,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#6C63FF'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(136,146,164,0.7)'; }}>
                  tom.queiroz@pareto.plus
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(74,85,104,0.9)' }}>
            © 2026 Pareto Soluções em Tecnologia Ltda. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link to={ROUTE_PATHS.PRIVACIDADE}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(74,85,104,0.9)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(136,146,164,0.8)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(74,85,104,0.9)'; }}>
              Política de Privacidade
            </Link>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(108,99,255,0.5)' }}>LGPD Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
