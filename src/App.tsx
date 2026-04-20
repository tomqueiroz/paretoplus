import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/Layout';
import Home from '@/pages/Home';
import Sobre from '@/pages/Sobre';
import Privacidade from '@/pages/Privacidade';
import { ROUTE_PATHS } from '@/lib/index';

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: 32, right: 28, zIndex: 9999,
        width: 46, height: 46, borderRadius: '50%',
        background: '#C8F135', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,241,53,0.4)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        animation: 'fadeInUp 0.3s ease',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.08)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(200,241,53,0.6)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(200,241,53,0.4)'; }}
      aria-label="Voltar ao topo"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0D14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <div className="min-h-screen" style={{ background: '#0D0D0D' }}>
          <Header />
          <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            <Route path={ROUTE_PATHS.SOBRE} element={<Sobre />} />
            <Route path={ROUTE_PATHS.PRIVACIDADE} element={<Privacidade />} />
          </Routes>
          <Footer />
          <BackToTop />
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
