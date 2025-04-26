"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export const AudioPlayer: React.FC<{ track: SpotifyApi.TrackObjectFull }> = ({
  track,
}) => {
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

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  console.log(track);

  if (!track.external_urls.spotify) {
    return <div>Not found</div>;
  }

  return (
    <div className="rounded-xl p-4 text-white shadow-lg">
      {track.album.images[0]?.url ? (
        <img
          src={track.album.images[0].url}
          alt="Album art"
          className="mb-4 h-32 w-32 rounded"
          // width={32}
          // height={32}
        />
      ) : (
        "No Album Image"
      )}

      <h2 className="text-lg font-semibold">{track.name}</h2>
      <p className="mb-4 text-sm text-zinc-400">
        {track.artists[0]?.name ?? "N/A"}
      </p>
      <button
        onClick={togglePlay}
        className="rounded bg-green-500 px-4 py-2 transition hover:bg-green-600"
      >
        {isPlaying ? "Pause" : "Play Preview"}
      </button>
      <audio
        ref={audioRef}
        src={
          "https://p.scdn.co/mp3-preview/7339548839a263fd721d01eb3364a848cad16fa7"
        }
        preload="auto"
      />
    </div>
  );
};
