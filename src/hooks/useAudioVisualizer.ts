"use client";

import { useEffect, useRef, useState } from "react";

export function useAudioVisualizer(audioEl: HTMLAudioElement | null) {
  const [volume, setVolume] = useState(0);
  const [waveform, setWaveform] = useState<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!audioEl) return;

    const context = new AudioContext();
    contextRef.current = context;

    const source = context.createMediaElementSource(audioEl);
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    dataArrayRef.current = dataArray;
    analyserRef.current = analyser;

    source.connect(analyser);
    analyser.connect(context.destination);

    const update = () => {
      if (!analyserRef.current || !dataArrayRef.current || !audioEl) return;

      if (!audioEl.paused && !audioEl.ended) {
        // Get waveform data (time domain)
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
        setWaveform(new Uint8Array(dataArrayRef.current)); // clone to avoid mutation

        // Compute volume
        const avg =
          dataArrayRef.current.reduce(
            (acc, val) => acc + Math.abs(val - 128),
            0,
          ) / dataArrayRef.current.length;
        setVolume(avg);
      } else {
        // Optional: Reset to zero or previous state
        setVolume(0);
        setWaveform(null);
      }

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      analyser.disconnect();
      source.disconnect();
      void context.close();
    };
  }, [audioEl]);

  return { volume, waveform };
}
