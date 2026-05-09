import { IconPlus } from './Icons';

export default function FAB({ onClick }) {
  return (
    <button className="t-fab" onClick={onClick}>
      <IconPlus c="white" />
    </button>
  );
}
