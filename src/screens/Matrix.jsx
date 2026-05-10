import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import FAB from '../components/FAB';
import TaskPill from '../components/TaskPill';
import Sheet from '../components/Sheet';
import { IconSearch, IconBell } from '../components/Icons';
import { useTasks } from '../context/TaskContext';
import { useFeedback } from '../hooks/useFeedback';
import { todayLocalISO } from '../lib/dates';
import NewTask from './NewTask';
import TaskDetail from './TaskDetail';

const COLS = ["quick-win", "steady", "heavy-lift"];
const COL_LABELS = ["Quick Win", "Steady Climb", "Heavy Lift"];
const ROWS = ["high", "medium", "low"];
const ROW_LABELS = ["High", "Medium", "Low"];
const ROW_COLORS = ["var(--color-primary)", "var(--color-brass)", "var(--color-teal)"];

export default function Matrix() {
  const { tasks, updateTask, PRIORITY_COLORS } = useTasks();
  const { tick, snap } = useFeedback();
  const navigate = useNavigate();
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const todayStr = todayLocalISO();
  const overdue = tasks.filter(t => t.date && t.date < todayStr && !t.done);
  const dueToday = tasks.filter(t => t.date === todayStr && !t.done);

  // Find the next upcoming day that has tasks (used when there's nothing today)
  const upcomingByDate = tasks
    .filter(t => t.date && t.date > todayStr && !t.done)
    .reduce((acc, t) => { (acc[t.date] = acc[t.date] || []).push(t); return acc; }, {});
  const nextUpcomingDate = Object.keys(upcomingByDate).sort()[0];
  const nextUpcomingCount = nextUpcomingDate ? upcomingByDate[nextUpcomingDate].length : 0;

  let upcomingLabel, upcomingCount, upcomingSubLabel;
  if (dueToday.length > 0) {
    upcomingLabel = "TODAY";
    upcomingCount = dueToday.length;
    upcomingSubLabel = `task${dueToday.length === 1 ? '' : 's'}`;
  } else if (nextUpcomingDate) {
    const d = new Date(nextUpcomingDate + 'T00:00:00');
    upcomingLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
    upcomingCount = nextUpcomingCount;
    upcomingSubLabel = `task${nextUpcomingCount === 1 ? '' : 's'}`;
  } else {
    upcomingLabel = "NOTHING SCHEDULED";
    upcomingCount = 0;
    upcomingSubLabel = "all clear";
  }

  const matchedTasks = searchQ.trim()
    ? tasks.filter(t =>
        t.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        (t.description || '').toLowerCase().includes(searchQ.toLowerCase()))
    : [];

  const getCell = (priority, effort) =>
    tasks.filter(t => t.priority === priority && t.effort === effort);

  const handleDragStart = (e, taskId) => {
    tick();
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (e, ri, ci) => {
    e.preventDefault();
    setDragOverCell(`${ri}-${ci}`);
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e, priority, effort) => {
    e.preventDefault();
    setDragOverCell(null);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      snap();
      updateTask(taskId, { priority, effort });
    }
  };

  const openTaskFromSearch = (id) => {
    setSearchOpen(false);
    setSearchQ('');
    setSelectedTaskId(id);
  };

  return (
    <div className="tactile">
      <TopBar
        title="Matrix"
        sub={new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
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
            onClick={() => { tick(); navigate('/timeline'); }}
            aria-label="Notifications"
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

      {/* X axis label row */}
      <div style={{ padding: "0 22px 8px", display: "grid", gridTemplateColumns: "28px repeat(3, minmax(0, 1fr))", gap: 8, alignItems: "end" }}>
        <span></span>
        {COL_LABELS.map((c, i) => (
          <div key={i} className="t-eyebrow" style={{ textAlign: "center", fontSize: 9 }}>{c}</div>
        ))}
      </div>

      {/* 3x3 grid */}
      <div style={{ padding: "0 22px" }}>
        {ROWS.map((priority, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: "28px repeat(3, minmax(0, 1fr))", gap: 8, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="t-eyebrow" style={{
                writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 9,
                color: ROW_COLORS[ri],
              }}>{ROW_LABELS[ri]}</span>
            </div>
            {COLS.map((effort, ci) => {
              const cellTasks = getCell(priority, effort);
              const isOver = dragOverCell === `${ri}-${ci}`;
              return (
                <div
                  key={ci}
                  className={"well" + (isOver ? " drag-over" : "")}
                  style={{ minHeight: 110, padding: 7, display: "flex", flexDirection: "column", gap: 4 }}
                  onDragOver={(e) => handleDragOver(e, ri, ci)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, priority, effort)}
                >
                  {cellTasks.map(t => (
                    <TaskPill
                      key={t.id}
                      title={t.title}
                      prio={PRIORITY_COLORS[t.priority]}
                      mini
                      draggable
                      onDragStart={(e) => handleDragStart(e, t.id)}
                      onClick={() => setSelectedTaskId(t.id)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Upcoming tasks indicator — taps through to Timeline */}
      <div style={{ padding: "10px 22px 0" }}>
        <button
          onClick={() => { tick(); navigate('/timeline'); }}
          className="card-out"
          style={{
            padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
            width: "100%", border: "none", cursor: "pointer", background: "var(--color-surface)",
          }}
        >
          <div style={{ minWidth: 0, textAlign: "left" }}>
            <div className="t-eyebrow" style={{
              fontSize: 9, whiteSpace: "nowrap", letterSpacing: 1.5,
              color: dueToday.length > 0 ? "var(--color-primary)" : "var(--color-muted)",
            }}>{upcomingLabel}</div>
            <div className="t-display" style={{ fontSize: 16, marginTop: 4 }}>
              {upcomingCount > 0 ? `${upcomingCount} ${upcomingSubLabel}` : upcomingSubLabel}
            </div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "var(--color-background)",
            boxShadow: "var(--shadow-in)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--color-muted)", fontSize: 16,
          }}>›</div>
        </button>
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
              Search across all your tasks by title or description.
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
              onClick={() => openTaskFromSearch(t.id)}
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

    </div>
  );
}
