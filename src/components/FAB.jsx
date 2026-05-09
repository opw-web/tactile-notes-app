import { IconPlus } from './Icons';
import { useFeedback } from '../hooks/useFeedback';

export default function FAB({ onClick }) {
  const { snap } = useFeedback();

  const handleClick = () => {
    snap();
    onClick?.();
  };

  return (
    <button className="t-fab" onClick={handleClick}>
      <IconPlus c="white" />
    </button>
  );
}
