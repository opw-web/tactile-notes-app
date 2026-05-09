import { GoogleG } from '../components/Icons';
import { useTasks } from '../context/TaskContext';

export default function Login() {
  const { login } = useTasks();

  return (
    <div className="tactile">
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "60px 32px 0", height: "100%",
      }}>
        {/* logo mark — extruded mini matrix */}
        <div style={{
          padding: 14, borderRadius: 16,
          background: "var(--color-surface)", boxShadow: "var(--shadow-out)",
          marginTop: 60,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 18px)", gap: 4 }}>
            {Array.from({ length: 9 }).map((_, i) => {
              const colors = ["primary","brass","muted","primary","brass","muted","primary","brass","muted"];
              return (
                <div key={i} style={{
                  width: 18, height: 18, borderRadius: 3,
                  background: `var(--color-${colors[i]})`,
                  boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.18), inset -1px -1px 2px rgba(255,255,255,0.4)",
                }}></div>
              );
            })}
          </div>
        </div>

        <div className="t-display" style={{ fontSize: 36, marginTop: 28 }}>Tactile Studio</div>
        <div className="t-body" style={{ fontSize: 14, color: "var(--color-muted)", marginTop: 6, textAlign: "center" }}>
          Organize by what matters<br />and what it takes.
        </div>

        <div style={{ flex: 1 }}></div>

        <button
          className="card-out"
          onClick={login}
          style={{
            marginBottom: 18, padding: "16px 22px", borderRadius: 12,
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", justifyContent: "center",
            border: "none", cursor: "pointer",
            background: "var(--color-surface)",
          }}
        >
          <GoogleG />
          <span className="t-btn">Sign in with Google</span>
        </button>
        <div className="t-small" style={{ marginBottom: 40, fontSize: 10, opacity: 0.6 }}>
          Terms · Privacy
        </div>
      </div>
    </div>
  );
}
