let audioCtx = null;
let unlocked = false;

function ensureContext() {
  if (!audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    try {
      audioCtx = new Ctor();
    } catch (e) {
      return null;
    }
  }
  return audioCtx;
}

function unlock() {
  const ctx = ensureContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  // Play a silent buffer to fully unlock on iOS
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start(0);
  } catch (e) {}
  unlocked = true;
}

if (typeof window !== 'undefined') {
  const onFirstInteract = () => {
    unlock();
    window.removeEventListener('touchstart', onFirstInteract, true);
    window.removeEventListener('touchend', onFirstInteract, true);
    window.removeEventListener('mousedown', onFirstInteract, true);
    window.removeEventListener('keydown', onFirstInteract, true);
    window.removeEventListener('click', onFirstInteract, true);
  };
  window.addEventListener('touchstart', onFirstInteract, true);
  window.addEventListener('touchend', onFirstInteract, true);
  window.addEventListener('mousedown', onFirstInteract, true);
  window.addEventListener('keydown', onFirstInteract, true);
  window.addEventListener('click', onFirstInteract, true);
}

function playTone(freq, duration, gain = 0.15) {
  const ctx = ensureContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  try {
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    const now = ctx.currentTime;
    vol.gain.setValueAtTime(gain, now);
    vol.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
    osc.connect(vol);
    vol.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration / 1000);
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
  playTone(1500, 12, 0.18);
}

export function soundSnap() {
  playTone(900, 22, 0.25);
}

export function soundHeavy() {
  playTone(600, 35, 0.3);
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
    if (soundEnabled) soundHeavy();
  }
}
