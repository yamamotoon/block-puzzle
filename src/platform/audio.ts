// WebAudio による効果音（音声ファイル不要・合成）。ブラウザ専用の platform 層。
// 自動再生ポリシー対策として、最初のユーザー操作で resume() を呼ぶ。

const MUTE_KEY = 'cbj-muted';

class Sfx {
  private ctx: AudioContext | null = null;
  private mutedFlag = false;

  constructor() {
    try {
      this.mutedFlag = localStorage.getItem(MUTE_KEY) === '1';
    } catch {
      this.mutedFlag = false;
    }
  }

  get muted(): boolean {
    return this.mutedFlag;
  }

  setMuted(m: boolean): void {
    this.mutedFlag = m;
    try {
      localStorage.setItem(MUTE_KEY, m ? '1' : '0');
    } catch {
      /* ignore */
    }
  }

  /** ユーザー操作時に呼ぶ。AudioContext を生成/再開する。 */
  resume(): void {
    if (this.mutedFlag) return;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  private tone(freq: number, delay: number, dur: number, type: OscillatorType, peak: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.03);
  }

  private play(fn: () => void): void {
    if (this.mutedFlag) return;
    if (!this.ctx || this.ctx.state !== 'running') return;
    fn();
  }

  /** ブロックを掴んだ。 */
  grab(): void {
    this.play(() => this.tone(600, 0, 0.07, 'triangle', 0.1));
  }

  /** ブロックを動かして確定した。 */
  move(): void {
    this.play(() => this.tone(340, 0, 0.06, 'sine', 0.09));
  }

  /** ゲートから脱出した。 */
  exit(): void {
    this.play(() => {
      this.tone(520, 0, 0.1, 'triangle', 0.14);
      this.tone(780, 0.06, 0.12, 'triangle', 0.12);
    });
  }

  /** レベルクリア。 */
  clear(): void {
    this.play(() => {
      const notes = [523, 659, 784, 1046];
      notes.forEach((f, i) => this.tone(f, i * 0.11, 0.18, 'triangle', 0.14));
    });
  }
}

export const sfx = new Sfx();
