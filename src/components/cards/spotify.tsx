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
  colors: {
    main: string;
    bg: string;
    bars: string;
  };
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
    colors: {
      main: "rgba(155,64,44,0.7)",
      bg: "from-[rgba(0,0,0,0.6)] to-[rgba(155,64,44,0.7)]",
      bars: "bg-[rgba(189,65,87)]",
    },
  },
  {
    id: "0fK60qLRIpyT05TXzoSBY0",
    name: "Hereditary",
    artist: "JID",
    preview_url: "/audio/hereditary.mp3",
    // "https://p.scdn.co/mp3-preview/7c385d6ddd2777d4aee453c282a4038995239ce0",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b273f705b14ca8b81af140d1f1d3",
    colors: {
      main: "rgb(223,150,56)",
      bg: "from-[rgba(0,0,0,0.6)] to-[rgba(20,20,20,0.9)]",
      bars: "bg-[rgba(223,150,56)]",
    },
  },
  {
    id: "5rwOE5J3Y1A2NiRa6y3Yph",
    name: "Stainless",
    artist: "Logic",
    preview_url: "/audio/stainless.mp3",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b273f0f7649257d4b99460929ced",
    colors: {
      main: "rgb(31,48,78)",
      bg: "from-[rgba(0,0,0,0.6)] to-[rgba(31,48,78,0.9)]",
      bars: "bg-[rgb(132,184,233)]",
    },
  },
  {
    id: "0815caqt2Lytro5EIzMufT",
    name: "You and Me",
    artist: "Lifehouse",
    preview_url: "/audio/you-and-me.mp3",
    image_url:
      "https://i.scdn.co/image/ab67616d0000b273a35daeab41d7d6da14cc809c",
    colors: {
      main: "rgb(233,201,69)",
      bg: "from-[rgba(0,0,0,0.6)] to-[rgba(233,201,69,0.9)]",
      bars: "bg-[rgb(73,96,54)]",
    },
  },
  // {
  //   id: "5qII2n90lVdPDcgXEEVHNy",
  //   name: "Sunday Morning",
  //   artist: "Maroon 5",
  //   preview_url: "/audio/sunday-morning.mp3",
  //   // "https://p.scdn.co/mp3-preview/41f14a5612da8fdf53a11d03fb2e705ef3ba2084",
  //   image_url:
  //     "https://i.scdn.co/image/ab67616d0000b27392f2d790c6a97b195f66d51e",
  // },
];

export const Spotify: React.FC = () => {
  const [trackNumber, setTrackNumber] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = tracks[trackNumber];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { waveform } = useAudioVisualizer(audioRef.current);

  const handleNextTrack = () => {
    setIsPlaying(false);

    console.log("going next");
    if (trackNumber + 1 < tracks.length) {
      setTrackNumber((prev) => prev + 1);
      // setIsPlaying(true);
    } else {
      console.log("on last track");
    }
  };

  useEffect(() => {
    const fetchTrack = async () => {
      const res = await fetch("/api/spotify/track?id=0815caqt2Lytro5EIzMufT");
      const data = (await res.json()) as SpotifyApi.TrackObjectFull;

      const url = data.external_urls.spotify;
      console.log(url);
      console.log(data);
    };
    void fetchTrack();
  }, []);

  if (!audioRef || !currentTrack) return null;

  return (
    <motion.div
      animate={
        isPlaying
          ? {
              boxShadow: [
                "0 0 5px 1px currentColor", // base glow
                "0 0 10px 2px currentColor", // brighter pulse
                "0 0 5px 1px currentColor", // return to base
              ],
            }
          : {
              boxShadow: "0 0 8px 1px transparent", // optional: hide when paused
            }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={cn(
        "h-full rounded-lg px-8 py-4",
        "bg-gradient-to-r",
        currentTrack?.colors?.bg,
      )}
      style={{
        color: currentTrack?.colors?.main ?? "#ffffff",
      }}
    >
      <AudioPlayer
        track={currentTrack}
        audioRef={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnd={() => handleNextTrack()}
        onNext={() =>
          trackNumber !== tracks.length - 1 &&
          setTrackNumber((prev) => prev + 1)
        }
        onBack={() => trackNumber !== 0 && setTrackNumber((prev) => prev - 1)}
      />

      <div className="absolute top-0 left-0 z-[-99] h-full w-full overflow-hidden rounded-lg">
        <WaveformVisualizer
          waveform={waveform}
          color={currentTrack.colors?.bars}
        />
      </div>
    </motion.div>
  );
};

const WaveformVisualizer = ({
  waveform,
  color,
}: {
  waveform: Uint8Array | null;
  color: string;
}) => {
  if (!waveform) return null;

  const waveformArray = Array.from(waveform);

  return (
    <div className="flex h-full items-end gap-[1px] overflow-hidden">
      {waveformArray.map((v, i) => {
        const height = ((v - 128) / 128) * 100; // from -100 to +100
        return (
          <motion.div
            key={i}
            className={cn("flex-1", color)}
            // style={{ height: `${Math.abs(height)}%` }}
            animate={{ height: `${Math.abs(height)}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          ></motion.div>
        );
      })}
    </div>
  );
};
