"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { SpotifyTrack } from "../cards/spotify";
import { Play, Pause, SkipBack, SkipForward, SkipBackIcon } from "lucide-react";

export const AudioPlayer: React.FC<{
  track: SpotifyTrack;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onPlay: () => void;
  onEnd: () => void;
  onPause: () => void;
  onNext: () => void;
}> = ({ track, audioRef, onPlay, onEnd, onPause, onNext }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay = () => {
    try {
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
      } else {
        void audio.play();
      }
      setIsPlaying(!isPlaying);
      onPlay(); // callback so spotify player knows we are playing
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    onNext();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log("loading new track");
    audio.load();
    audio.volume = 1; // reset volume back to 1 after new track

    // on end, move to next song but don't autoplay??
    const handleEnded = () => {
      setIsPlaying(false);
      onEnd();
    };
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
    };
  }, [track]);

  return (
    <div className="flex h-full items-center justify-between">
      <div className="flex items-center gap-x-3">
        <Image
          alt="album cover"
          src={track.image_url}
          width={96}
          height={96}
          className="rounded-lg"
        />

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{track.name}</h2>
          <p className="mb-4 text-sm text-zinc-400">{track.artist}</p>
        </div>
      </div>

      <div className="flex gap-x-3">
        <button onClick={handleNext} className="cursor-pointer transition">
          <SkipBackIcon className="h-6 w-6 fill-gray-300 stroke-gray-300" />
        </button>
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white transition"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-white" />
          ) : (
            <Play className="h-5 w-5 fill-white" />
          )}
        </button>
        <button onClick={handleNext} className="cursor-pointer transition">
          <SkipForward className="h-6 w-6 fill-gray-300 stroke-gray-300" />
        </button>
      </div>

      <audio ref={audioRef} src={track.preview_url} preload="auto" />
    </div>
  );
};
