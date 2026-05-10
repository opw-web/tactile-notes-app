import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import PillSwitch from '../components/PillSwitch';
import Toggle from '../components/Toggle';
import { useTasks } from '../context/TaskContext';

export default function Settings() {
  const { auth, logout, hapticEnabled, soundEnabled, setHapticEnabled, setSoundEnabled } = useTasks();
  const navigate = useNavigate();
  const [themeIdx, setThemeIdx] = useState(0);

  const user = auth.user || { name: "User", email: "", initials: "U" };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="tactile">
      <TopBar title="Settings" sub="CONTROL PANEL" />
      <div style={{ padding: "0 24px", overflowY: "auto", height: "calc(100dvh - 160px)" }}>
        {/* profile block */}
        <div className="card-out" style={{
          padding: 18, display: "flex", gap: 14, alignItems: "center",
        }}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt=""
              style={{
                width: 56, height: 56, borderRadius: 14,
                boxShadow: "var(--shadow-out-sm)",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: "var(--color-surface)", boxShadow: "var(--shadow-out-sm)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
              color: "var(--color-primary)",
            }}>{user.initials}</div>
          )}
          <div style={{ flex: 1 }}>
            <div className="t-display" style={{ fontSize: 17 }}>{user.name}</div>
            <div className="t-small">{user.email}</div>
            <div className="t-eyebrow" style={{ fontSize: 9, color: "var(--color-teal)", marginTop: 4 }}>● SYNCED</div>
          </div>
        </div>

        {/* preferences */}
        <div className="t-eyebrow" style={{ marginTop: 18, marginBottom: 8 }}>PREFERENCES</div>
        <div className="card-out" style={{
          padding: "14px 18px", marginBottom: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>Haptic feedback</span>
          <Toggle on={hapticEnabled} onToggle={() => setHapticEnabled(!hapticEnabled)} />
        </div>
        <div className="card-out" style={{
          padding: "14px 18px", marginBottom: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>Mechanical sounds</span>
          <Toggle on={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />
        </div>

        {/* appearance */}
        <div className="t-eyebrow" style={{ marginTop: 14, marginBottom: 8 }}>APPEARANCE</div>
        <div className="card-out" style={{
          padding: "14px 18px", marginBottom: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>Default view</span>
          <span className="t-small" style={{ fontFamily: "var(--font-display)", letterSpacing: 1, textTransform: "uppercase" }}>Matrix ›</span>
        </div>
        <PillSwitch
          items={[
            { label: "Light" }, { label: "Dark" }, { label: "Auto" },
          ]}
          active={themeIdx}
          onChange={setThemeIdx}
        />

        {/* data */}
        <div className="t-eyebrow" style={{ marginTop: 14, marginBottom: 8 }}>DATA</div>
        <div className="card-out" style={{ padding: "14px 18px", marginBottom: 8, display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>Export CSV</span>
          <span className="t-small">›</span>
        </div>
        <div className="card-out" style={{ padding: "14px 18px", marginBottom: 8, display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14, color: "var(--color-danger)" }}>Clear completed</span>
          <span className="t-small">›</span>
        </div>

        {/* sign out */}
        <button
          onClick={handleLogout}
          className="card-out"
          style={{
            padding: "14px 18px", marginTop: 4,
            display: "flex", justifyContent: "center", alignItems: "center",
            width: "100%", border: "none", cursor: "pointer",
            background: "var(--color-surface)",
          }}
        >
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14, color: "var(--color-danger)" }}>Sign out</span>
        </button>
        <div style={{ height: 100 }}></div>
      </div>
      <BottomNav />
    </div>
  );
}
