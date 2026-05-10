import { useState } from 'react';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import FAB from '../components/FAB';
import Badge from '../components/Badge';
import Sheet from '../components/Sheet';
import { IconCheck, IconSearch, IconBell } from '../components/Icons';
import { useTasks } from '../context/TaskContext';
import { useFeedback } from '../hooks/useFeedback';
import { todayLocalISO, localISO } from '../lib/dates';
import NewTask from './NewTask';
import TaskDetail from './TaskDetail';

const todayStr = todayLocalISO();

function TimeCard({ task, onToggle, onClick }) {
  const { PRIORITY_LABELS, PRIORITY_BADGE_KIND, EFFORT_LABELS, EFFORT_BADGE_KIND } = useTasks();
  const isOverdue = task.date < todayStr && !task.done;

  return (
    <div
      className="card-out"
      onClick={onClick}
      style={{
        padding: "14px 14px",
        display: "flex", gap: 12, alignItems: "flex-start",
        opacity: task.done ? 0.55 : 1,
        borderLeft: isOverdue ? "3px solid var(--color-danger)" : "none",
        cursor: "pointer",
      }}
    >
      <div
        className={"t-check" + (task.done ? " done" : "")}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
      >
        {task.done && <IconCheck s={14} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="t-display" style={{
          fontSize: 15, lineHeight: 1.2,
          textDecoration: task.done ? "line-through" : "none",
        }}>{task.title}</div>
        {(task.time || task.allDay) && (
          <div className="t-small" style={{ marginTop: 3, fontFamily: "var(--font-display)", letterSpacing: 0.5 }}>
            {task.allDay ? "ALL DAY" : task.time}
          </div>
        )}
        <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
          {task.priority && <Badge kind={PRIORITY_BADGE_KIND[task.priority]} label={PRIORITY_LABELS[task.priority]} />}
          {task.effort && <Badge kind={EFFORT_BADGE_KIND[task.effort]} label={EFFORT_LABELS[task.effort]} />}
        </div>
      </div>
    </div>
  );
}

function buildSections(tasks) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = localISO(tomorrow);

  const dateMap = {};
  tasks.forEach(t => {
    if (!t.date) return;
    if (!dateMap[t.date]) dateMap[t.date] = [];
    dateMap[t.date].push(t);
  });

  const dates = Object.keys(dateMap).sort();
  return dates.map(date => {
    const d = new Date(date + 'T00:00:00');
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    let big, sub, knob, emphasize = false;
    if (date === todayStr) {
      big = "TODAY";
      sub = `${dateLabel} · ${dayLabel}`;
      knob = "primary";
      emphasize = true;
    } else if (date === tomorrowStr) {
      big = "TOMORROW";
      sub = `${dateLabel} · ${dayLabel}`;
      knob = "text";
    } else if (date < todayStr) {
      big = "OVERDUE";
      sub = `${dateLabel} · ${dayLabel}`;
      knob = "danger";
    } else {
      big = dateLabel.toUpperCase();
      sub = dayLabel;
      knob = "muted";
    }
    return { date, big, sub, knob, emphasize, items: dateMap[date] };
  });
}

export default function Timeline() {
  const { tasks, toggleDone } = useTasks();
  const { tick, heavy } = useFeedback();
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [overdueOpen, setOverdueOpen] = useState(false);

  const filteredTasks = searchQ.trim()
    ? tasks.filter(t =>
        t.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        (t.description || '').toLowerCase().includes(searchQ.toLowerCase()))
    : tasks;
  const sections = buildSections(filteredTasks);
  const overdue = tasks.filter(t => t.date && t.date < todayStr && !t.done);
  const matchedTasks = searchQ.trim() ? filteredTasks : [];

  return (
    <div className="tactile">
      <TopBar
        title="Timeline"
        sub="UPCOMING OPS"
        right={<>
          <button
            className="icon-btn"
            style={{ border: "none", cursor: "pointer" }}
            onClick={() => { tick(); setSearchOpen(true); }}
            aria-label="Search"
          ><IconSearch /></button>
          <button
            className="icon-btn"
            style={{ border: "none", cursor: "pointer", position: "relative" }}
            onClick={() => { tick(); setOverdueOpen(true); }}
            aria-label="Overdue"
          >
            <IconBell />
            {overdue.length > 0 && (
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--color-danger)",
              }}></span>
            )}
          </button>
        </>}
      />
      <div style={{ padding: "0 24px", position: "relative", overflowY: "auto", height: "calc(100dvh - 180px)", paddingBottom: 100 }}>
        {/* spine */}
        <div style={{
          position: "absolute", left: 13, top: 12, bottom: 100, width: 2,
          background: "var(--color-muted)", opacity: 0.35,
        }}></div>

        {sections.map((s, i) => {
          const knobBg = s.knob === "danger" ? "var(--color-danger)" :
                        s.knob === "primary" ? "var(--color-primary)" :
                        s.knob === "muted" ? "var(--color-muted)" : "var(--color-text)";
          const titleColor = s.knob === "danger" ? "var(--color-danger)" :
                            s.knob === "primary" ? "var(--color-primary)" :
                            s.knob === "muted" ? "var(--color-muted)" : "var(--color-text)";
          return (
            <div key={i} style={{ marginBottom: 18, position: "relative", paddingLeft: 42 }}>
              {/* knob */}
              <div style={{
                position: "absolute", left: 2, top: 4,
                width: 22, height: 22, borderRadius: 6,
                background: "var(--color-surface)",
                boxShadow: "var(--shadow-out-sm)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: knobBg,
                }}></div>
              </div>

              {/* date header */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                <span className="t-display" style={{
                  fontSize: s.emphasize ? 22 : 18,
                  color: titleColor,
                  letterSpacing: -0.5,
                }}>{s.big}</span>
                <span className="t-eyebrow" style={{ fontSize: 9 }}>{s.sub}</span>
              </div>

              {/* cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.items.map(t => (
                  <TimeCard
                    key={t.id}
                    task={t}
                    onToggle={() => { heavy(); toggleDone(t.id); }}
                    onClick={() => setSelectedTaskId(t.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
        <div style={{ height: 80 }}></div>
      </div>

      <FAB onClick={() => setShowNewTask(true)} />
      <BottomNav />

      <NewTask open={showNewTask} onClose={() => setShowNewTask(false)} />
      {selectedTaskId && (
        <TaskDetail
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}

      {/* Search sheet */}
      <Sheet open={searchOpen} onClose={() => { setSearchOpen(false); setSearchQ(''); }} height={560}>
        <div className="t-eyebrow" style={{ fontSize: 10 }}>SEARCH TASKS</div>
        <input
          type="text"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Type to search..."
          autoFocus
          style={{
            marginTop: 12, width: "100%",
            background: "var(--color-background)",
            boxShadow: "var(--shadow-in)",
            borderRadius: 12, border: "none", outline: "none",
            padding: "14px 16px",
            fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16,
            color: "var(--color-text)",
          }}
        />
        <div style={{ marginTop: 14, maxHeight: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {searchQ.trim() === '' && (
            <div className="t-small" style={{ textAlign: "center", padding: 20, color: "var(--color-muted)" }}>
              Search across all your tasks.
            </div>
          )}
          {searchQ.trim() !== '' && matchedTasks.length === 0 && (
            <div className="t-small" style={{ textAlign: "center", padding: 20, color: "var(--color-muted)" }}>
              No matches for "{searchQ}".
            </div>
          )}
          {matchedTasks.map(t => (
            <button
              key={t.id}
              onClick={() => { setSearchOpen(false); setSearchQ(''); setSelectedTaskId(t.id); }}
              className="card-out"
              style={{
                padding: "12px 14px", border: "none", cursor: "pointer",
                background: "var(--color-surface)",
                textAlign: "left", display: "flex", flexDirection: "column", gap: 4,
              }}
            >
              <div className="t-display" style={{ fontSize: 14 }}>{t.title}</div>
              <div className="t-small" style={{ fontSize: 10 }}>
                {t.priority || 'unsorted'} · {t.effort || 'unsorted'} · {t.date}
              </div>
            </button>
          ))}
        </div>
      </Sheet>

      {/* Overdue sheet */}
      <Sheet open={overdueOpen} onClose={() => setOverdueOpen(false)} height={560}>
        <div className="t-eyebrow" style={{ fontSize: 10, color: overdue.length > 0 ? "var(--color-danger)" : "var(--color-muted)" }}>
          {overdue.length > 0 ? `${overdue.length} OVERDUE` : 'NO OVERDUE TASKS'}
        </div>
        <div className="t-small" style={{ marginTop: 6, color: "var(--color-muted)" }}>
          Tasks past their due date that haven't been completed.
        </div>
        <div style={{ marginTop: 14, maxHeight: 480, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {overdue.length === 0 && (
            <div className="t-small" style={{ textAlign: "center", padding: 20, color: "var(--color-muted)" }}>
              You're all caught up.
            </div>
          )}
          {overdue.map(t => (
            <button
              key={t.id}
              onClick={() => { setOverdueOpen(false); setSelectedTaskId(t.id); }}
              className="card-out"
              style={{
                padding: "12px 14px", border: "none", cursor: "pointer",
                background: "var(--color-surface)",
                textAlign: "left", display: "flex", flexDirection: "column", gap: 4,
                borderLeft: "3px solid var(--color-danger)",
              }}
            >
              <div className="t-display" style={{ fontSize: 14 }}>{t.title}</div>
              <div className="t-small" style={{ fontSize: 10 }}>
                Due {t.date} · {t.priority || 'unsorted'}
              </div>
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
