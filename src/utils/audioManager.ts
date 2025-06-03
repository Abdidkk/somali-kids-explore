
export interface AudioConfig {
  customAudioPath?: string;
  fallbackText: string;
  language?: string;
}

export class AudioManager {
  private static instance: AudioManager;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async playAudio(config: AudioConfig): Promise<void> {
    const { customAudioPath, fallbackText, language = "so-SO" } = config;

    // Try to play custom audio first
    if (customAudioPath) {
      try {
        await this.playCustomAudio(customAudioPath);
        return;
      } catch (error) {
        console.log(`Custom audio failed for ${customAudioPath}, falling back to synthesis`);
      }
    }

    // Fallback to speech synthesis
    this.playSynthesizedAudio(fallbackText, language);
  }

  private async playCustomAudio(audioPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check cache first
      if (this.audioCache.has(audioPath)) {
        const audio = this.audioCache.get(audioPath)!;
        audio.currentTime = 0;
        audio.play().then(resolve).catch(reject);
        return;
      }

      // Create new audio element
      const audio = new Audio(audioPath);
      audio.onloadeddata = () => {
        this.audioCache.set(audioPath, audio);
        audio.play().then(resolve).catch(reject);
      };
      audio.onerror = () => reject(new Error(`Failed to load audio: ${audioPath}`));
    });
  }

  private playSynthesizedAudio(text: string, language: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.7;
    
    const hasLanguage = speechSynthesis.getVoices().some(v => v.lang === language);
    if (!hasLanguage) {
      utterance.lang = "en-US";
    }
    
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  hasCustomAudio(audioPath?: string): boolean {
    return !!audioPath;
  }
}
