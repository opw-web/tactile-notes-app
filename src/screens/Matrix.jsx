import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import FAB from '../components/FAB';
import TaskPill from '../components/TaskPill';
import { IconSearch, IconBell } from '../components/Icons';
import { useTasks } from '../context/TaskContext';
import NewTask from './NewTask';
import TaskDetail from './TaskDetail';

const COLS = ["quick-win", "steady", "heavy-lift"];
const COL_LABELS = ["Quick Win", "Steady Climb", "Heavy Lift"];
const ROWS = ["high", "medium", "low"];
const ROW_LABELS = ["High", "Medium", "Low"];
const ROW_COLORS = ["var(--color-primary)", "var(--color-brass)", "var(--color-teal)"];

export default function Matrix() {
  const { tasks, updateTask, PRIORITY_COLORS } = useTasks();
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null);

  const getCell = (priority, effort) =>
    tasks.filter(t => t.priority === priority && t.effort === effort);

  const unsorted = tasks.filter(t => !t.priority || !t.effort);

  const handleDragStart = (e, taskId) => {
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
      updateTask(taskId, { priority, effort });
    }
  };

  return (
    <div className="tactile" style={{ height: 844 }}>
      <StatusBar />
      <TopBar
        title="Matrix"
        sub="WED · OCT 24"
        right={<>
          <button className="icon-btn" style={{ border: "none", cursor: "pointer" }}><IconSearch /></button>
          <button className="icon-btn" style={{ border: "none", cursor: "pointer" }}><IconBell /></button>
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
                  style={{ minHeight: 138, padding: 7, display: "flex", flexDirection: "column", gap: 4 }}
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

      {/* Inbox / unbox tray */}
      <div style={{ padding: "10px 22px 0" }}>
        <div className="card-out" style={{
          padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ minWidth: 0 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, whiteSpace: "nowrap", letterSpacing: 1.5 }}>UNBOX TRAY</div>
            <div className="t-display" style={{ fontSize: 16, marginTop: 4 }}>{unsorted.length} unsorted</div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "var(--color-background)",
            boxShadow: "var(--shadow-in)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--color-muted)", fontSize: 18,
          }}>↑</div>
        </div>
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
