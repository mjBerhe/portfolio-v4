"use client";

import { useEffect, useState } from "react";
import { AudioPlayer } from "../ui/audio-player";

export type SpotifyTrack = {
  id: string;
  name: string;
  artist: string;
  preview_url: string;
  image_url: string;
};

const songs: SpotifyTrack[] = [
  {
    id: "2uvE4L5ZsYKpv8hbK4TIOt",
    name: "MUTT",
    artist: "Leon Thomas",
    preview_url:
      "https://p.scdn.co/mp3-preview/fc9cb15deab670f91c621b2aa42e094ccacce63f",
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
];

export const Spotify: React.FC = () => {
  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const res = await fetch("/api/spotify/track?id=0fK60qLRIpyT05TXzoSBY0");
      const data = (await res.json()) as SpotifyApi.TrackObjectFull;

      // const url = data.external_urls.spotify;
      console.log(data);
      setTrack(data);
    };
    void fetchTrack();
  }, []);

  return (
    <div className="h-full">{track && <AudioPlayer track={songs[1]} />}</div>
  );
};
