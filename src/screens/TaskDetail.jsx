import { useMemo } from 'react';
import PillSwitch from '../components/PillSwitch';
import Toggle from '../components/Toggle';
import Wheel from '../components/Wheel';
import Sheet from '../components/Sheet';
import { useTasks } from '../context/TaskContext';
import { generateDateRange } from '../lib/dates';

const PRIORITIES = ["high", "medium", "low"];
const EFFORTS = ["quick-win", "steady", "heavy-lift"];
const HOURS = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const MINUTES = ["00","15","30","45"];
const AMPM = ["AM","PM"];

function parseTime(timeStr) {
  if (!timeStr) return { hourIdx: 0, minuteIdx: 0, ampmIdx: 0 };
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return { hourIdx: 0, minuteIdx: 0, ampmIdx: 0 };
  const hour = parseInt(match[1]);
  const min = parseInt(match[2]);
  const ap = match[3].toUpperCase();
  return {
    hourIdx: Math.max(0, hour - 1),
    minuteIdx: MINUTES.indexOf(String(min).padStart(2, '0')),
    ampmIdx: ap === 'PM' ? 1 : 0,
  };
}

export default function TaskDetail({ taskId, onClose }) {
  const { tasks, updateTask, deleteTask } = useTasks();
  const task = tasks.find(t => t.id === taskId);

  const dateRange = useMemo(() => generateDateRange(15), []);

  if (!task) return null;

  const priorityIdx = PRIORITIES.indexOf(task.priority);
  const effortIdx = EFFORTS.indexOf(task.effort);
  const dateIdx = dateRange.values.indexOf(task.date);
  const activeDateIdx = dateIdx >= 0 ? dateIdx : dateRange.todayIndex;
  const time = parseTime(task.time);

  const handleDelete = () => {
    deleteTask(taskId);
    onClose();
  };

  const handleDateChange = (idx) => {
    if (dateRange.values[idx]) updateTask(taskId, { date: dateRange.values[idx] });
  };

  const handleTimeChange = (hourIdx, minIdx, ampmIdx) => {
    const timeStr = `${HOURS[hourIdx]}:${MINUTES[minIdx]} ${AMPM[ampmIdx]}`;
    updateTask(taskId, { time: timeStr });
  };

  return (
    <Sheet open={!!task} onClose={onClose} height="calc(100dvh - 40px)">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="t-eyebrow" style={{ fontSize: 10 }}>OPERATION</div>
          <button
            onClick={onClose}
            style={{
              width: 30, height: 30, borderRadius: 8, fontSize: 14, color: "var(--color-muted)",
              background: "var(--color-background)", boxShadow: "var(--shadow-in)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "none", cursor: "pointer",
            }}
          >✕</button>
        </div>

        <input
          type="text"
          value={task.title}
          onChange={(e) => updateTask(taskId, { title: e.target.value })}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 26, color: "var(--color-text)", letterSpacing: -0.5,
            background: "transparent", border: "none", outline: "none",
            width: "100%", marginTop: 14, lineHeight: 1.05,
          }}
        />

        <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
          <div>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>DATE</div>
            <Wheel items={dateRange.labels} active={activeDateIdx} w={108} h={140} onChange={handleDateChange} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>TIME</div>
            <div className="card-out" style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>All day</div>
              <Toggle on={task.allDay} onToggle={() => updateTask(taskId, { allDay: !task.allDay })} />
            </div>
            <div style={{ marginTop: 10, opacity: task.allDay ? 0.4 : 1, transition: "opacity 0.2s", display: "flex", gap: 6, justifyContent: "center" }}>
              <Wheel items={HOURS} active={time.hourIdx} w={42} h={70} onChange={(i) => handleTimeChange(i, time.minuteIdx, time.ampmIdx)} />
              <Wheel items={MINUTES} active={time.minuteIdx >= 0 ? time.minuteIdx : 0} w={42} h={70} onChange={(i) => handleTimeChange(time.hourIdx, i, time.ampmIdx)} />
              <Wheel items={AMPM} active={time.ampmIdx} w={42} h={70} onChange={(i) => handleTimeChange(time.hourIdx, time.minuteIdx, i)} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="t-eyebrow" style={{ marginBottom: 6 }}>DESCRIPTION</div>
          <div className="well" style={{ padding: "14px 16px", minHeight: 96 }}>
            <textarea
              value={task.description}
              onChange={(e) => updateTask(taskId, { description: e.target.value })}
              placeholder="Add description..."
              style={{
                width: "100%", height: 70, border: "none", outline: "none",
                background: "transparent", resize: "none",
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
                color: "var(--color-text)", lineHeight: 1.5,
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="t-eyebrow" style={{ marginBottom: 6 }}>PRIORITY</div>
          <PillSwitch items={[
            { icon: "▲", label: "High" },
            { icon: "—", label: "Medium" },
            { icon: "▽", label: "Low" },
          ]} active={priorityIdx >= 0 ? priorityIdx : 0} onChange={(i) => updateTask(taskId, { priority: PRIORITIES[i] })} />
        </div>
        <div style={{ marginTop: 12 }}>
          <div className="t-eyebrow" style={{ marginBottom: 6 }}>EFFORT</div>
          <PillSwitch items={[
            { icon: "✦", label: "Quick Win" },
            { icon: "▲", label: "Steady" },
            { icon: "■", label: "Heavy Lift" },
          ]} active={effortIdx >= 0 ? effortIdx : 0} onChange={(i) => updateTask(taskId, { effort: EFFORTS[i] })} />
        </div>

        <div className="t-eyebrow" style={{ marginTop: 16, fontSize: 9, color: "var(--color-muted)" }}>
          CREATED {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()} · {new Date(task.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button className="btn-secondary t-btn btn-danger" style={{ flex: 1 }} onClick={handleDelete}>DELETE</button>
          <button className="btn-primary t-btn" style={{ flex: 1, height: 52 }} onClick={onClose}>SAVE</button>
        </div>
      </div>
    </Sheet>
  );
}
