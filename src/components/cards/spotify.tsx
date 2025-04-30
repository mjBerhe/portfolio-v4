"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AudioPlayer } from "../ui/audio-player";

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
    preview_url:
      "https://p.scdn.co/mp3-preview/7c385d6ddd2777d4aee453c282a4038995239ce0",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b273f705b14ca8b81af140d1f1d3",
  },
  {
    id: "5qII2n90lVdPDcgXEEVHNy",
    name: "Sunday Morning",
    artist: "Maroon 5",
    preview_url:
      "https://p.scdn.co/mp3-preview/41f14a5612da8fdf53a11d03fb2e705ef3ba2084",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b27392f2d790c6a97b195f66d51e",
  },
];

export const Spotify: React.FC = () => {
  // we can use ! because we know we have tracks
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  // const [track, setTrack] = useState<SpotifyApi.TrackObjectFull | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0);

  // console.log("is playing:", isPlaying);

  const handleNextTrack = () => {
    setIsPlaying(false);

    console.log("going next");
    if (currentTrack + 1 <= tracks.length) {
      setCurrentTrack((prev) => prev + 1);
    } else {
      console.log("on last track");
    }
  };

  const glowEffect = {
    boxShadow: `0 0 ${volume * 50}px rgba(255, 0, 255, 0.7)`, // Increase the intensity of the glow based on volume
    transform: `scale(${1 + volume * 0.05})`, // Optionally make the card "breathe" or "pulse"
  };

  console.log(volume);

  return (
    <motion.div
      // animate={
      //   isPlaying
      //     ? { boxShadow: `0 0 ${volume * 500}px rgba(255, 0, 255, 0.7)` }
      //     : {}
      // }
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
      className="h-full rounded-lg"
    >
      <AudioPlayer
        track={tracks[currentTrack]!}
        onVolumeChange={(v) => setVolume(v)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnd={() => handleNextTrack()}
      />
    </motion.div>
  );
};
