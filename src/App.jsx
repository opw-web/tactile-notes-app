import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider, useTasks } from './context/TaskContext';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import Matrix from './screens/Matrix';
import Timeline from './screens/Timeline';
import Settings from './screens/Settings';

function AuthGate({ children }) {
  const { auth, loading } = useTasks();
  if (loading) return <LoadingScreen />;
  if (!auth.isLoggedIn) return <Navigate to="/login" replace />;
  if (!auth.hasOnboarded) return <Navigate to="/onboarding" replace />;
  return children;
}

function LoginGate() {
  const { auth, loading } = useTasks();
  if (loading) return <LoadingScreen />;
  if (auth.isLoggedIn && auth.hasOnboarded) return <Navigate to="/matrix" replace />;
  if (auth.isLoggedIn && !auth.hasOnboarded) return <Navigate to="/onboarding" replace />;
  return <Login />;
}

function OnboardingGate() {
  const { auth, loading } = useTasks();
  if (loading) return <LoadingScreen />;
  if (!auth.isLoggedIn) return <Navigate to="/login" replace />;
  if (auth.hasOnboarded) return <Navigate to="/matrix" replace />;
  return <Onboarding />;
}

function LoadingScreen() {
  return (
    <div className="tactile" style={{ height: 844, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          <Route path="*" element={<Navigate to="/matrix" replace />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
