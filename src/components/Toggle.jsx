export default function Toggle({ on, onToggle }) {
  return (
    <span className={"t-switch" + (on ? " on" : "")} onClick={onToggle}>
      <span className="thumb"></span>
    </span>
  );
}
