"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { AudioPlayer } from "../ui/audio-player";
import { cn } from "~/lib/utils";
import { useAudioVisualizer } from "~/hooks/useAudioVisualizer";

export type SpotifyTrack = {
  id: string;
  name: string;
  artist: string;
  preview_url: string;
  image_url: string;
};

const tracks: SpotifyTrack[] = [
  {
    id: "2uvE4L5ZsYKpv8hbK4TIOt",
    name: "MUTT",
    artist: "Leon Thomas",
    preview_url: "/audio/mutt.mp3",
    // "https://p.scdn.co/mp3-preview/fc9cb15deab670f91c621b2aa42e094ccacce63f",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b2737fc4fb3453f841652d2e4814",
  },
  {
    id: "0fK60qLRIpyT05TXzoSBY0",
    name: "Hereditary",
    artist: "JID",
    preview_url: "/audio/hereditary.mp3",
    // "https://p.scdn.co/mp3-preview/7c385d6ddd2777d4aee453c282a4038995239ce0",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b273f705b14ca8b81af140d1f1d3",
  },
  {
    id: "5qII2n90lVdPDcgXEEVHNy",
    name: "Sunday Morning",
    artist: "Maroon 5",
    preview_url: "/audio/sunday-morning.mp3",
    // "https://p.scdn.co/mp3-preview/41f14a5612da8fdf53a11d03fb2e705ef3ba2084",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b27392f2d790c6a97b195f66d51e",
  },
];

export const Spotify: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { waveform } = useAudioVisualizer(audioRef.current);

  const handleNextTrack = () => {
    setIsPlaying(false);

    console.log("going next");
    if (currentTrack + 1 <= tracks.length) {
      setCurrentTrack((prev) => prev + 1);
    } else {
      console.log("on last track");
    }
  };

  if (!audioRef) return null;

  return (
    <motion.div
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
      className="h-full rounded-lg bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(155,64,44,0.7)] px-8 py-4"
    >
      <AudioPlayer
        track={tracks[currentTrack]!}
        audioRef={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnd={() => handleNextTrack()}
        onNext={() =>
          currentTrack !== tracks.length - 1 &&
          setCurrentTrack((prev) => prev + 1)
        }
      />

      <div className="absolute top-0 left-0 z-[-99] h-full w-full overflow-hidden rounded-lg">
        <WaveformVisualizer waveform={waveform} />
      </div>
    </motion.div>
  );
};

const WaveformVisualizer = ({ waveform }: { waveform: Uint8Array | null }) => {
  if (!waveform) return null;

  const waveformArray = Array.from(waveform);

  return (
    <div className="flex h-full items-end gap-[1px] overflow-hidden">
      {waveformArray.map((v, i) => {
        // const height = v;
        const height = ((v - 128) / 128) * 100; // from -100 to +100
        return (
          <motion.div
            key={i}
            // 155 64 44
            className={cn(`flex-1 bg-[rgba(189,65,87)]`)}
            // style={{ height: `${Math.abs(height)}%` }}
            animate={{ height: `${Math.abs(height)}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          ></motion.div>
        );
      })}
    </div>
  );
};
