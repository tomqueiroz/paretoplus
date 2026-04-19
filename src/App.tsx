import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Header, Footer } from '@/components/Layout';
import Home from '@/pages/Home';
import Sobre from '@/pages/Sobre';
import Privacidade from '@/pages/Privacidade';
import PorQuePareto from '@/pages/PorQuePareto';
import TessAI from '@/pages/TessAI';
import { ROUTE_PATHS } from '@/lib/index';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <div className="min-h-screen" style={{ background: '#080808' }}>
          <Header />
          <div className="pt-[68px]">
            <Routes>
              <Route path={ROUTE_PATHS.HOME}          element={<Home />} />
              <Route path={ROUTE_PATHS.SOBRE}         element={<Sobre />} />
              <Route path={ROUTE_PATHS.PRIVACIDADE}   element={<Privacidade />} />
              <Route path="/por-que-pareto"           element={<PorQuePareto />} />
              <Route path="/tess-ai"                  element={<TessAI />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
