import { useFeedback } from '../hooks/useFeedback';

export default function Toggle({ on, onToggle }) {
  const { tick } = useFeedback();

  const handleClick = () => {
    tick();
    onToggle?.();
  };

  return (
    <span className={"t-switch" + (on ? " on" : "")} onClick={handleClick}>
      <span className="thumb"></span>
    </span>
  );
}
