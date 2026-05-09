import { useCallback } from 'react';
import { feedback } from '../lib/feedback';
import { useTasks } from '../context/TaskContext';

export function useFeedback() {
  const { hapticEnabled, soundEnabled } = useTasks();

  const tick = useCallback(() => {
    feedback('tick', { hapticEnabled, soundEnabled });
  }, [hapticEnabled, soundEnabled]);

  const snap = useCallback(() => {
    feedback('snap', { hapticEnabled, soundEnabled });
  }, [hapticEnabled, soundEnabled]);

  const heavy = useCallback(() => {
    feedback('heavy', { hapticEnabled, soundEnabled });
  }, [hapticEnabled, soundEnabled]);

  return { tick, snap, heavy };
}
