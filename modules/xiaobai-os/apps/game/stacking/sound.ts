export function createStackingSound() {
    let context: AudioContext | null = null;
    const patterns = { drop: [320, 190], land: [520, 660], danger: [260, 220], lose: [260, 200, 120], reward: [523, 659, 784, 1047] };
    return {
        async unlock() { context ??= new AudioContext(); if (context.state === 'suspended') { await context.resume(); } },
        play(kind: keyof typeof patterns) {
            if (!context || context.state !== 'running') { return; }
            patterns[kind].forEach((frequency, index) => {
                const oscillator = context!.createOscillator(), gain = context!.createGain(), start = context!.currentTime + index * 0.085;
                oscillator.type = kind === 'lose' ? 'triangle' : 'sine'; oscillator.frequency.setValueAtTime(frequency, start);
                gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(0.065, start + 0.008);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
                oscillator.connect(gain); gain.connect(context!.destination); oscillator.start(start); oscillator.stop(start + 0.21);
                oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
            });
        },
        async pause() { if (context?.state === 'running') { await context.suspend(); } },
        async dispose() { const previous = context; context = null; if (previous && previous.state !== 'closed') { await previous.close(); } },
    };
}
