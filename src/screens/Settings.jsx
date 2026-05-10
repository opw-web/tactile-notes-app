import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import PillSwitch from '../components/PillSwitch';
import Toggle from '../components/Toggle';
import { useTasks } from '../context/TaskContext';
import { useFeedback } from '../hooks/useFeedback';

const THEMES = ['light', 'dark', 'auto'];
const VIEWS = ['matrix', 'timeline'];

function escapeCsv(val) {
  if (val == null) return "";
  const s = String(val);
  if (s.includes('"') || s.includes(',') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export default function Settings() {
  const {
    auth, logout, tasks, deleteTask,
    hapticEnabled, soundEnabled, setHapticEnabled, setSoundEnabled,
    theme, setTheme, defaultView, setDefaultView,
  } = useTasks();
  const { snap, heavy } = useFeedback();
  const navigate = useNavigate();

  const user = auth.user || { name: "User", email: "", initials: "U" };
  const themeIdx = Math.max(0, THEMES.indexOf(theme));
  const viewIdx = Math.max(0, VIEWS.indexOf(defaultView));

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleExportCsv = () => {
    snap();
    const headers = ['title', 'description', 'priority', 'effort', 'date', 'time', 'all_day', 'done', 'created_at'];
    const rows = tasks.map(t => [
      t.title, t.description, t.priority, t.effort, t.date, t.time || '', t.allDay, t.done, t.createdAt
    ]);
    const csv = [headers, ...rows].map(r => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tactile-tasks-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearCompleted = async () => {
    const completed = tasks.filter(t => t.done);
    if (completed.length === 0) return;
    if (!window.confirm(`Delete ${completed.length} completed task${completed.length === 1 ? '' : 's'}?`)) return;
    heavy();
    for (const t of completed) {
      await deleteTask(t.id);
    }
  };

  return (
    <div className="tactile">
      <TopBar title="Settings" sub="CONTROL PANEL" />
      <div style={{ padding: "0 24px", overflowY: "auto", height: "calc(100dvh - 160px)" }}>
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

        <div className="t-eyebrow" style={{ marginTop: 14, marginBottom: 8 }}>APPEARANCE</div>
        <div className="card-out" style={{ padding: "12px 14px", marginBottom: 8 }}>
          <div className="t-small" style={{ marginBottom: 8, fontWeight: 600 }}>Default view</div>
          <PillSwitch
            items={[{ label: "Matrix" }, { label: "Timeline" }]}
            active={viewIdx}
            onChange={(i) => setDefaultView(VIEWS[i])}
          />
        </div>
        <div className="card-out" style={{ padding: "12px 14px", marginBottom: 8 }}>
          <div className="t-small" style={{ marginBottom: 8, fontWeight: 600 }}>Theme</div>
          <PillSwitch
            items={[{ label: "Light" }, { label: "Dark" }, { label: "Auto" }]}
            active={themeIdx}
            onChange={(i) => setTheme(THEMES[i])}
          />
        </div>

        <div className="t-eyebrow" style={{ marginTop: 14, marginBottom: 8 }}>DATA</div>
        <button
          onClick={handleExportCsv}
          className="card-out"
          style={{
            padding: "14px 18px", marginBottom: 8,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            width: "100%", border: "none", cursor: "pointer",
            background: "var(--color-surface)",
          }}
        >
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>Export CSV</span>
          <span className="t-small">{tasks.length} task{tasks.length === 1 ? '' : 's'} ›</span>
        </button>
        <button
          onClick={handleClearCompleted}
          className="card-out"
          style={{
            padding: "14px 18px", marginBottom: 8,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            width: "100%", border: "none", cursor: "pointer",
            background: "var(--color-surface)",
          }}
        >
          <span className="t-body" style={{ fontWeight: 600, fontSize: 14, color: "var(--color-danger)" }}>Clear completed</span>
          <span className="t-small">{tasks.filter(t => t.done).length} done ›</span>
        </button>

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
