import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider, useTasks } from './context/TaskContext';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import Matrix from './screens/Matrix';
import Timeline from './screens/Timeline';
import Settings from './screens/Settings';

function AddToHomeScreenBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isStandalone = window.navigator.standalone === true ||
      window.matchMedia?.('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('tactile-a2hs-dismissed') === 'true';
    if (isIOS && !isStandalone && !dismissed) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const dismiss = () => {
    localStorage.setItem('tactile-a2hs-dismissed', 'true');
    setShow(false);
  };

  return (
    <div className="a2hs-banner">
      <div className="text">
        Tap <strong>Share</strong> ↑ then <strong>Add to Home Screen</strong> for full-screen mode.
      </div>
      <button className="close" onClick={dismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}

function AuthGate({ children }) {
  const { auth, loading } = useTasks();
  if (loading) return <LoadingScreen />;
  if (!auth.isLoggedIn) return <Navigate to="/login" replace />;
  if (!auth.hasOnboarded) return <Navigate to="/onboarding" replace />;
  return children;
}

function LoginGate() {
  const { auth, loading, defaultView } = useTasks();
  if (loading) return <LoadingScreen />;
  if (auth.isLoggedIn && auth.hasOnboarded) return <Navigate to={`/${defaultView}`} replace />;
  if (auth.isLoggedIn && !auth.hasOnboarded) return <Navigate to="/onboarding" replace />;
  return <Login />;
}

function OnboardingGate() {
  const { auth, loading, defaultView } = useTasks();
  if (loading) return <LoadingScreen />;
  if (!auth.isLoggedIn) return <Navigate to="/login" replace />;
  if (auth.hasOnboarded) return <Navigate to={`/${defaultView}`} replace />;
  return <Onboarding />;
}

function RootRedirect() {
  const { defaultView } = useTasks();
  return <Navigate to={`/${defaultView}`} replace />;
}

function LoadingScreen() {
  return (
    <div className="tactile" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          padding: 14, borderRadius: 16,
          background: "var(--color-surface)", boxShadow: "var(--shadow-out)",
          display: "inline-block",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 18px)", gap: 4 }}>
            {Array.from({ length: 9 }).map((_, i) => {
              const colors = ["primary","brass","muted","primary","brass","muted","primary","brass","muted"];
              return (
                <div key={i} style={{
                  width: 18, height: 18, borderRadius: 3,
                  background: `var(--color-${colors[i]})`,
                  boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.18), inset -1px -1px 2px rgba(255,255,255,0.4)",
                  opacity: 0.6,
                }}></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/login" element={<LoginGate />} />
          <Route path="/onboarding" element={<OnboardingGate />} />
          <Route path="/matrix" element={<AuthGate><Matrix /></AuthGate>} />
          <Route path="/timeline" element={<AuthGate><Timeline /></AuthGate>} />
          <Route path="/settings" element={<AuthGate><Settings /></AuthGate>} />
          <Route path="*" element={<AuthGate><RootRedirect /></AuthGate>} />
        </Routes>
        <AddToHomeScreenBanner />
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
