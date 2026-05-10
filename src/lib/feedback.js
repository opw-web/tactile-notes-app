let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq, duration, gain = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    vol.gain.setValueAtTime(gain, ctx.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    osc.connect(vol);
    vol.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (e) {}
}

export function hapticTick() {
  navigator.vibrate?.(10);
}

export function hapticMedium() {
  navigator.vibrate?.(25);
}

export function hapticHeavy() {
  navigator.vibrate?.(50);
}

export function soundTick() {
  playTone(1800, 3);
}

export function soundSnap() {
  playTone(1200, 8, 0.2);
}

export function feedback(type, { hapticEnabled = true, soundEnabled = false } = {}) {
  if (type === 'tick') {
    if (hapticEnabled) hapticTick();
    if (soundEnabled) soundTick();
  } else if (type === 'snap') {
    if (hapticEnabled) hapticMedium();
    if (soundEnabled) soundSnap();
  } else if (type === 'heavy') {
    if (hapticEnabled) hapticHeavy();
    if (soundEnabled) soundSnap();
  }
}
