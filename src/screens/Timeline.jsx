import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import FAB from '../components/FAB';
import Badge from '../components/Badge';
import { IconSearch, IconBell, IconCheck } from '../components/Icons';
import { useTasks } from '../context/TaskContext';
import NewTask from './NewTask';
import TaskDetail from './TaskDetail';

function TimeCard({ task, onToggle, onClick }) {
  const { PRIORITY_LABELS, PRIORITY_BADGE_KIND, EFFORT_LABELS, EFFORT_BADGE_KIND } = useTasks();
  const isOverdue = task.date < "2024-10-24" && !task.done;

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

const DATE_SECTIONS = [
  { date: "2024-10-22", big: "OVERDUE", sub: "Oct 22 · Mon", knob: "danger" },
  { date: "2024-10-24", big: "TODAY", sub: "Oct 24 · Wed", knob: "primary", emphasize: true },
  { date: "2024-10-25", big: "TOMORROW", sub: "Oct 25 · Thu", knob: "text" },
  { date: "2024-10-28", big: "OCT 28", sub: "Tue", knob: "muted" },
];

export default function Timeline() {
  const { tasks, toggleDone } = useTasks();
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const sections = DATE_SECTIONS.map(sec => ({
    ...sec,
    items: tasks.filter(t => t.date === sec.date),
  })).filter(sec => sec.items.length > 0);

  return (
    <div className="tactile" style={{ height: 844 }}>
      <StatusBar />
      <TopBar
        title="Timeline"
        sub="UPCOMING OPS"
        right={<>
          <button className="icon-btn" style={{ border: "none", cursor: "pointer" }}><IconSearch /></button>
          <button className="icon-btn" style={{ border: "none", cursor: "pointer" }}><IconBell /></button>
        </>}
      />
      <div style={{ padding: "0 24px", position: "relative", overflowY: "auto", height: 650, paddingBottom: 100 }}>
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
                    onToggle={() => toggleDone(t.id)}
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

      {showNewTask && <NewTask onClose={() => setShowNewTask(false)} />}
      {selectedTaskId && (
        <TaskDetail
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
