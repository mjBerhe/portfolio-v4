"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import type { SpotifyTrack } from "../cards/spotify";

export const AudioPlayer: React.FC<{ track: SpotifyTrack }> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    audio.addEventListener("timeupdate", () => {
      if (audio.duration && audio.currentTime > audio.duration - 5) {
        // Last 5 seconds - start fading
        const fadeOutDuration = 5; // seconds
        const timeLeft = audio.duration - audio.currentTime;
        audio.volume = Math.max(0, timeLeft / fadeOutDuration);
      }
    });

    return () => {
      audio.removeEventListener("ended", handleEnded);
      // audio.removeEventListener("timeout", )
    };
  }, []);

  return (
    <div className="flex h-full items-center gap-x-2 p-4">
      <img
        src={track.image_url}
        alt="Album art"
        className="mb-4 h-24 w-24 rounded-lg"
        // width={32}
        // height={32}
      />

      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{track.name}</h2>
        <p className="mb-4 text-sm text-zinc-400">{track.artist}</p>
      </div>

      <button
        onClick={togglePlay}
        className="rounded bg-green-500 px-4 py-2 transition hover:bg-green-600"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio ref={audioRef} src={track.preview_url} preload="auto" />
    </div>
  );
};
