import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Header, Footer } from '@/components/Layout';
import Home from '@/pages/Home';
import Sobre from '@/pages/Sobre';
import Privacidade from '@/pages/Privacidade';
import { ROUTE_PATHS } from '@/lib/index';

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
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
