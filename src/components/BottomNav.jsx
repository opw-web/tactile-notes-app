import { useNavigate, useLocation } from 'react-router-dom';
import { IconGrid, IconClock, IconGear } from './Icons';

const tabs = [
  { k: "matrix", l: "Matrix", icon: <IconGrid />, path: "/matrix" },
  { k: "timeline", l: "Timeline", icon: <IconClock />, path: "/timeline" },
  { k: "settings", l: "Settings", icon: <IconGear />, path: "/settings" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.replace("/", "") || "matrix";

  return (
    <div className="t-bottomnav">
      {tabs.map(it => (
        <button
          key={it.k}
          className={"it" + (active === it.k ? " on" : "")}
          onClick={() => navigate(it.path)}
        >
          {it.icon}
          <span>{it.l}</span>
        </button>
      ))}
    </div>
  );
}
