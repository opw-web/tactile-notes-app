import { useState, useMemo } from 'react';
import PillSwitch from '../components/PillSwitch';
import Toggle from '../components/Toggle';
import Wheel from '../components/Wheel';
import Sheet from '../components/Sheet';
import { useTasks } from '../context/TaskContext';
import { useFeedback } from '../hooks/useFeedback';
import { generateDateRange, getCurrentTimeIndices } from '../lib/dates';

const PRIORITIES = ["high", "medium", "low"];
const EFFORTS = ["quick-win", "steady", "heavy-lift"];
const HOURS = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const MINUTES = ["00","15","30","45"];
const AMPM = ["AM","PM"];

export default function NewTask({ open, onClose }) {
  const { addTask } = useTasks();
  const { snap } = useFeedback();

  const dateRange = useMemo(() => generateDateRange(15), []);
  const timeDefaults = useMemo(() => getCurrentTimeIndices(), []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descExpanded, setDescExpanded] = useState(false);
  const [dateIdx, setDateIdx] = useState(dateRange.todayIndex);
  const [allDay, setAllDay] = useState(true);
  const [hourIdx, setHourIdx] = useState(timeDefaults.hourIdx);
  const [minIdx, setMinIdx] = useState(timeDefaults.minuteIdx);
  const [ampmIdx, setAmpmIdx] = useState(timeDefaults.ampmIdx);
  const [priorityIdx, setPriorityIdx] = useState(0);
  const [effortIdx, setEffortIdx] = useState(2);

  const handleDeploy = () => {
    if (!title.trim()) return;
    const timeStr = allDay ? null : `${HOURS[hourIdx]}:${MINUTES[minIdx]} ${AMPM[ampmIdx]}`;
    addTask({
      title: title.trim(),
      description,
      priority: PRIORITIES[priorityIdx],
      effort: EFFORTS[effortIdx],
      date: dateRange.values[dateIdx],
      time: timeStr,
      allDay,
      done: false,
    });
    snap();
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDescExpanded(false);
    setDateIdx(dateRange.todayIndex);
    setAllDay(true);
    setPriorityIdx(0);
    setEffortIdx(2);
    onClose();
  };

  return (
    <Sheet open={open} onClose={handleClose} height={700}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="t-eyebrow" style={{ fontSize: 10 }}>NEW OPERATION</div>
        <button
          onClick={handleClose}
          style={{
            width: 30, height: 30, borderRadius: 8, fontSize: 14, color: "var(--color-muted)",
            background: "var(--color-background)", boxShadow: "var(--shadow-in)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer",
          }}
        >✕</button>
      </div>

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

      <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 6 }}>DATE</div>
          <Wheel items={dateRange.labels} active={dateIdx} w={108} h={140} onChange={setDateIdx} />
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
              <Wheel items={HOURS} active={hourIdx} w={42} h={70} onChange={setHourIdx} />
              <Wheel items={MINUTES} active={minIdx} w={42} h={70} onChange={setMinIdx} />
              <Wheel items={AMPM} active={ampmIdx} w={42} h={70} onChange={setAmpmIdx} />
            </div>
            {allDay && (
              <div className="t-small" style={{ textAlign: "center", marginTop: 4, fontSize: 9 }}>
                FLIP OFF → TIME PICKER
              </div>
            )}
          </div>
        </div>
      </div>

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

      <button
        className="btn-primary t-btn"
        style={{ marginTop: 18, width: "100%" }}
        onClick={handleDeploy}
      >
        DEPLOY
      </button>
    </Sheet>
  );
}
