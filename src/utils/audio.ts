// Pleasant, subtle acoustic ambient chime/melody synthesizer using Web Audio API
class AudioPlayerService {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public play() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.scheduleNotes();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private scheduleNotes() {
    if (!this.isPlaying || !this.ctx) return;

    // Romantic Pentatonic chord notes: F#4, A#4, C#5, D#5, F5, F#5 (gentle music box / harp feel)
    const melody = [369.99, 466.16, 554.37, 622.25, 698.46, 739.99, 622.25, 554.37];
    const baseFreq = melody[Math.floor(Math.random() * melody.length)];
    this.playTone(baseFreq, 1.8);

    // Occasional gentle harmony
    if (Math.random() > 0.4) {
      const harmonyFreq = baseFreq * 1.5; // perfect fifth
      setTimeout(() => {
        if (this.isPlaying) {
          this.playTone(harmonyFreq, 1.4);
        }
      }, 200);
    }

    const nextDelay = 800 + Math.random() * 800;
    this.timer = window.setTimeout(() => {
      this.scheduleNotes();
    }, nextDelay);
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft envelope (gentle attack, smooth natural exponential decay)
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback silently guarded
    }
  }
}

export const ambientAudio = new AudioPlayerService();
