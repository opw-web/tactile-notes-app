import { useState } from 'react';
import PillSwitch from '../components/PillSwitch';
import Toggle from '../components/Toggle';
import Wheel from '../components/Wheel';
import { useTasks } from '../context/TaskContext';

const PRIORITIES = ["high", "medium", "low"];
const EFFORTS = ["quick-win", "steady", "heavy-lift"];
const DATE_ITEMS = ["Oct 22","Oct 23","TODAY","Oct 25","Oct 26"];
const DATE_VALUES = ["2024-10-22","2024-10-23","2024-10-24","2024-10-25","2024-10-26"];
const DATE_ITEMS_FULL = ["Oct 21","Oct 22","Oct 23","TODAY","Oct 25","Oct 26","Oct 27"];
const DATE_VALUES_FULL = ["2024-10-21","2024-10-22","2024-10-23","2024-10-24","2024-10-25","2024-10-26","2024-10-27"];

export default function TaskDetail({ taskId, onClose }) {
  const { tasks, updateTask, deleteTask } = useTasks();
  const task = tasks.find(t => t.id === taskId);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!task) return null;

  const priorityIdx = PRIORITIES.indexOf(task.priority);
  const effortIdx = EFFORTS.indexOf(task.effort);
  const dateIdx = isFullScreen
    ? DATE_VALUES_FULL.indexOf(task.date)
    : DATE_VALUES.indexOf(task.date);

  const handleSave = () => onClose();

  const handleDelete = () => {
    deleteTask(taskId);
    onClose();
  };

  const handleDateChange = (idx) => {
    const values = isFullScreen ? DATE_VALUES_FULL : DATE_VALUES;
    if (values[idx]) updateTask(taskId, { date: values[idx] });
  };

  if (isFullScreen) {
    return (
      <>
        <div className="frost" onClick={onClose}></div>
        <div style={{
          position: "absolute", inset: 0, zIndex: 11,
          background: "rgba(242, 240, 236, 0.95)",
          backdropFilter: "blur(20px)",
          overflowY: "auto",
        }}>
          <div style={{ padding: "10px 24px 24px" }}>
            <div className="sheet-handle" style={{ marginTop: 4 }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span
                className="t-eyebrow"
                style={{ fontSize: 9, cursor: "pointer" }}
                onClick={() => setIsFullScreen(false)}
              >↓ PULL TO HALF</span>
              <span className="t-eyebrow" style={{ fontSize: 9, color: "var(--color-primary)" }}>EDITING</span>
            </div>
            <div className="t-eyebrow">OPERATION</div>
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(taskId, { title: e.target.value })}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: 30, color: "var(--color-text)", letterSpacing: -0.5,
                background: "transparent", border: "none", outline: "none",
                width: "100%", marginTop: 4, lineHeight: 1.05,
              }}
            />

            <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
              <div>
                <div className="t-eyebrow" style={{ marginBottom: 6 }}>DATE</div>
                <Wheel items={DATE_ITEMS_FULL} active={dateIdx >= 0 ? dateIdx : 3} w={114} h={170} onChange={handleDateChange} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="t-eyebrow" style={{ marginBottom: 6 }}>TIME</div>
                <div className="card-out" style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>All day</div>
                  <Toggle on={task.allDay} onToggle={() => updateTask(taskId, { allDay: !task.allDay })} />
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 6, justifyContent: "center" }}>
                  <Wheel items={["1","2","3"]} active={1} w={42} h={104} />
                  <Wheel items={["00","15","30","45"]} active={0} w={42} h={104} />
                  <Wheel items={["AM","PM"]} active={1} w={42} h={104} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="t-eyebrow" style={{ marginBottom: 6 }}>DESCRIPTION</div>
              <div className="well" style={{ padding: "14px 16px", minHeight: 110 }}>
                <textarea
                  value={task.description}
                  onChange={(e) => updateTask(taskId, { description: e.target.value })}
                  placeholder="Add description..."
                  style={{
                    width: "100%", height: 86, border: "none", outline: "none",
                    background: "transparent", resize: "none",
                    fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
                    color: "var(--color-text)", lineHeight: 1.5,
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
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

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button className="btn-secondary t-btn btn-danger" style={{ flex: 1 }} onClick={handleDelete}>DELETE</button>
              <button className="btn-primary t-btn" style={{ flex: 1, height: 52 }} onClick={handleSave}>SAVE</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Half-sheet mode
  return (
    <>
      <div className="frost" onClick={onClose}></div>
      <div className="sheet" style={{ height: 600, padding: "12px 24px 24px" }}>
        <div className="sheet-handle" style={{ cursor: "pointer" }} onClick={() => setIsFullScreen(true)}></div>
        <div
          className="t-eyebrow"
          style={{ textAlign: "center", marginBottom: 8, fontSize: 9, cursor: "pointer" }}
          onClick={() => setIsFullScreen(true)}
        >↑ SWIPE FOR FULL VIEW</div>

        <div style={{ overflow: "auto", height: 540 }}>
          <div className="t-eyebrow">OPERATION</div>
          <input
            type="text"
            value={task.title}
            onChange={(e) => updateTask(taskId, { title: e.target.value })}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: 22, color: "var(--color-text)", letterSpacing: -0.5,
              background: "transparent", border: "none", outline: "none",
              width: "100%", marginTop: 2, lineHeight: 1.1,
            }}
          />

          {/* date + time */}
          <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 6 }}>DATE</div>
              <Wheel items={DATE_ITEMS} active={dateIdx >= 0 ? dateIdx : 2} w={100} h={120} onChange={handleDateChange} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="t-eyebrow" style={{ marginBottom: 6 }}>TIME</div>
              <div className="card-out" style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="t-body" style={{ fontWeight: 600, fontSize: 13 }}>All day</div>
                <Toggle on={task.allDay} onToggle={() => updateTask(taskId, { allDay: !task.allDay })} />
              </div>
              <div style={{ marginTop: 8, display: "flex", gap: 4, justifyContent: "center" }}>
                <Wheel items={["1","2","3"]} active={1} w={36} h={72} />
                <Wheel items={["00","15","30"]} active={0} w={36} h={72} />
                <Wheel items={["AM","PM"]} active={1} w={36} h={72} />
              </div>
            </div>
          </div>

          {/* description */}
          <div style={{ marginTop: 14 }}>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>DESCRIPTION</div>
            <div className="well" style={{ padding: "12px 14px", minHeight: 70 }}>
              <textarea
                value={task.description}
                onChange={(e) => updateTask(taskId, { description: e.target.value })}
                placeholder="Add description..."
                style={{
                  width: "100%", height: 50, border: "none", outline: "none",
                  background: "transparent", resize: "none",
                  fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13,
                  color: "var(--color-text)", lineHeight: 1.45,
                }}
              />
            </div>
          </div>

          {/* priority */}
          <div style={{ marginTop: 12 }}>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>PRIORITY</div>
            <PillSwitch items={[
              { icon: "▲", label: "High" },
              { icon: "—", label: "Medium" },
              { icon: "▽", label: "Low" },
            ]} active={priorityIdx >= 0 ? priorityIdx : 0} onChange={(i) => updateTask(taskId, { priority: PRIORITIES[i] })} />
          </div>

          {/* effort */}
          <div style={{ marginTop: 12 }}>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>EFFORT</div>
            <PillSwitch items={[
              { icon: "✦", label: "Quick Win" },
              { icon: "▲", label: "Steady" },
              { icon: "■", label: "Heavy" },
            ]} active={effortIdx >= 0 ? effortIdx : 0} onChange={(i) => updateTask(taskId, { effort: EFFORTS[i] })} />
          </div>

          {/* actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn-secondary t-btn btn-danger" style={{ flex: 1 }} onClick={handleDelete}>DELETE</button>
            <button className="btn-primary t-btn" style={{ flex: 1, height: 52 }} onClick={handleSave}>SAVE</button>
          </div>
          <div className="t-small" style={{ textAlign: "center", marginTop: 10, fontSize: 9, opacity: 0.7 }}>
            ↕ scroll · pull down to dismiss
          </div>
        </div>
      </div>
    </>
  );
}
