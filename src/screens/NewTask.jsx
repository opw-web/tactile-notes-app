import { useState } from 'react';
import PillSwitch from '../components/PillSwitch';
import Toggle from '../components/Toggle';
import Wheel from '../components/Wheel';
import { useTasks } from '../context/TaskContext';

const PRIORITIES = ["high", "medium", "low"];
const EFFORTS = ["quick-win", "steady", "heavy-lift"];

export default function NewTask({ onClose }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descExpanded, setDescExpanded] = useState(false);
  const [dateIdx, setDateIdx] = useState(2);
  const [allDay, setAllDay] = useState(true);
  const [hourIdx, setHourIdx] = useState(1);
  const [minIdx, setMinIdx] = useState(0);
  const [ampmIdx, setAmpmIdx] = useState(1);
  const [priorityIdx, setPriorityIdx] = useState(0);
  const [effortIdx, setEffortIdx] = useState(2);

  const dateItems = ["Oct 22", "Oct 23", "TODAY", "Oct 25", "Oct 26"];
  const dateValues = ["2024-10-22", "2024-10-23", "2024-10-24", "2024-10-25", "2024-10-26"];
  const hours = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  const minutes = ["00","15","30","45"];
  const ampm = ["AM","PM"];

  const handleDeploy = () => {
    if (!title.trim()) return;
    const timeStr = allDay ? null : `${hours[hourIdx]}:${minutes[minIdx]} ${ampm[ampmIdx]}`;
    addTask({
      title: title.trim(),
      description,
      priority: PRIORITIES[priorityIdx],
      effort: EFFORTS[effortIdx],
      date: dateValues[dateIdx],
      time: timeStr,
      allDay,
      done: false,
    });
    onClose();
  };

  return (
    <>
      <div className="frost" onClick={onClose}></div>
      <div className="sheet" style={{ height: 700, zIndex: 11 }}>
        <div className="sheet-handle"></div>

        {/* eyebrow + close */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="t-eyebrow" style={{ fontSize: 10 }}>NEW OPERATION</div>
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

        {/* large title input */}
        <div style={{ marginTop: 14 }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task name..."
            autoFocus
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: 26, color: "var(--color-text)",
              background: "transparent", border: "none", outline: "none",
              width: "100%", letterSpacing: -0.5,
            }}
          />
          <div className="t-small" style={{ color: "var(--color-muted)", marginTop: 2 }}>Log new operation…</div>
        </div>

        {/* date wheel + time */}
        <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
          <div>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>DATE</div>
            <Wheel items={dateItems} active={dateIdx} w={108} h={140} onChange={setDateIdx} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>TIME</div>
            <div className="card-out" style={{
              padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div className="t-body" style={{ fontWeight: 600, fontSize: 14 }}>All day</div>
              <Toggle on={allDay} onToggle={() => setAllDay(!allDay)} />
            </div>
            <div style={{ marginTop: 10, opacity: allDay ? 0.4 : 1, transition: "opacity 0.2s" }}>
              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                <Wheel items={hours.slice(0, 3)} active={hourIdx} w={42} h={70} onChange={setHourIdx} />
                <Wheel items={minutes.slice(0, 3)} active={minIdx} w={42} h={70} onChange={setMinIdx} />
                <Wheel items={ampm} active={ampmIdx} w={42} h={70} onChange={setAmpmIdx} />
              </div>
              {allDay && (
                <div className="t-small" style={{ textAlign: "center", marginTop: 4, fontSize: 9 }}>
                  FLIP OFF → TIME PICKER
                </div>
              )}
            </div>
          </div>
        </div>

        {/* description */}
        <div style={{ marginTop: 16 }}>
          <div
            className="well"
            style={{ padding: "12px 14px", minHeight: descExpanded ? 90 : 42, transition: "min-height 0.2s" }}
            onClick={() => setDescExpanded(true)}
          >
            {descExpanded ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add description..."
                autoFocus
                style={{
                  width: "100%", height: 66, border: "none", outline: "none",
                  background: "transparent", resize: "none",
                  fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13,
                  color: "var(--color-text)", lineHeight: 1.45,
                }}
              />
            ) : (
              <div className="t-small" style={{ color: "var(--color-muted)" }}>
                + add description
              </div>
            )}
          </div>
        </div>

        {/* priority */}
        <div style={{ marginTop: 14 }}>
          <div className="t-eyebrow" style={{ marginBottom: 6 }}>PRIORITY</div>
          <PillSwitch
            items={[
              { icon: "▲", label: "High" },
              { icon: "—", label: "Medium" },
              { icon: "▽", label: "Low" },
            ]}
            active={priorityIdx}
            onChange={setPriorityIdx}
          />
        </div>

        {/* effort */}
        <div style={{ marginTop: 12 }}>
          <div className="t-eyebrow" style={{ marginBottom: 6 }}>EFFORT</div>
          <PillSwitch
            items={[
              { icon: "✦", label: "Quick Win" },
              { icon: "▲", label: "Steady" },
              { icon: "■", label: "Heavy Lift" },
            ]}
            active={effortIdx}
            onChange={setEffortIdx}
          />
        </div>

        {/* deploy */}
        <button
          className="btn-primary t-btn"
          style={{ marginTop: 18, width: "100%" }}
          onClick={handleDeploy}
        >
          DEPLOY
        </button>
      </div>
    </>
  );
}
