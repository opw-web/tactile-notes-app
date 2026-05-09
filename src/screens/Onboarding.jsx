import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { useTasks } from '../context/TaskContext';

function MatrixThumb() {
  return (
    <div style={{ padding: "0 22px", opacity: 0.4 }}>
      <div className="t-display" style={{ fontSize: 26 }}>Matrix</div>
      <div className="t-eyebrow" style={{ fontSize: 9, marginTop: 4 }}>WED · OCT 24</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 14 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="well" style={{ height: 80 }}></div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  {
    eyebrow: "STEP 01",
    title: "Your task matrix",
    body: "Organize tasks by Priority (when) and Effort (how much energy it takes).",
    diagram: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 38px)", gap: 6 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="well" style={{ height: 38 }}></div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "STEP 02",
    title: "Drag to reorganize",
    body: "Long-press any task and drag it to change its Priority or Effort. Cells light up as drop targets.",
    diagram: (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          background: "var(--color-surface)", boxShadow: "var(--shadow-out)",
          borderRadius: 6, padding: "8px 12px",
          display: "flex", alignItems: "center", gap: 6,
          transform: "rotate(-3deg)",
        }}>
          <span style={{ width: 3, height: 18, background: "var(--color-primary)", borderRadius: 2 }}></span>
          <span className="t-body" style={{ fontSize: 12, fontWeight: 600 }}>Q3 Report</span>
        </div>
        <span style={{ color: "var(--color-primary)", fontSize: 22, fontWeight: 700 }}>→</span>
        <div className="well" style={{ width: 70, height: 70, border: "1.5px dashed rgba(230,115,77,0.5)" }}></div>
      </div>
    ),
  },
  {
    eyebrow: "STEP 03",
    title: "Timeline view",
    body: "Switch tabs to see what's due and when, grouped by date.",
    diagram: (
      <div style={{ width: 200 }}>
        <div className="t-display" style={{ fontSize: 14, color: "var(--color-primary)" }}>TODAY</div>
        <div className="card-out" style={{ marginTop: 4, padding: "8px 10px", display: "flex", gap: 8, alignItems: "center", borderRadius: 6 }}>
          <span className="t-check"></span>
          <span className="t-body" style={{ fontSize: 12, fontWeight: 600 }}>Q3 Report · 10am</span>
        </div>
        <div className="t-display" style={{ fontSize: 13, marginTop: 6 }}>TOMORROW</div>
        <div className="card-out" style={{ marginTop: 4, padding: "8px 10px", display: "flex", gap: 8, alignItems: "center", borderRadius: 6 }}>
          <span className="t-check"></span>
          <span className="t-body" style={{ fontSize: 12, fontWeight: 600 }}>Sync w/ design</span>
        </div>
      </div>
    ),
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useTasks();

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      navigate('/matrix');
    }
  };

  const s = steps[step];

  return (
    <div className="tactile" style={{ height: 844 }}>
      <StatusBar />
      <div style={{ filter: "blur(3px)", opacity: 0.7 }}>
        <MatrixThumb />
      </div>
      <div className="frost" style={{ background: "rgba(232,230,225,0.55)" }}></div>

      <div style={{
        position: "absolute", left: 24, right: 24, bottom: 36,
        padding: 24, borderRadius: 18,
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-out)",
        zIndex: 12,
      }}>
        <div className="t-eyebrow" style={{ color: "var(--color-primary)" }}>{s.eyebrow}</div>
        <div className="t-display" style={{ fontSize: 26, marginTop: 6, lineHeight: 1.05 }}>{s.title}</div>
        <div className="t-body" style={{ fontSize: 14, color: "var(--color-muted)", marginTop: 10, lineHeight: 1.5 }}>
          {s.body}
        </div>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
          {s.diagram}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: i === step ? 22 : 8, height: 8, borderRadius: 2,
                background: i === step ? "var(--color-primary)" : "var(--color-background)",
                boxShadow: i === step ? "var(--shadow-out-sm)" : "var(--shadow-in)",
                transition: "all 0.2s",
              }}></span>
            ))}
          </div>
          <button
            className="btn-primary t-btn"
            style={{ height: 44, padding: "0 22px", borderRadius: 10 }}
            onClick={handleNext}
          >
            {step === 2 ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
