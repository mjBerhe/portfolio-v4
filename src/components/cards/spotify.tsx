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

const tracks: SpotifyTrack[] = [
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
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack>(tracks[0]!);
  // const [track, setTrack] = useState<SpotifyApi.TrackObjectFull | null>(null);

  // useEffect(() => {
  //   const fetchTrack = async () => {
  //     const res = await fetch("/api/spotify/track?id=5qII2n90lVdPDcgXEEVHNy");
  //     const data = (await res.json()) as SpotifyApi.TrackObjectFull;

  //     // const url = data.external_urls.spotify;
  //     console.log(data);
  //     setTrack(data);
  //   };
  //   void fetchTrack();
  // }, []);

  return (
    <div className="h-full">
      <AudioPlayer track={currentTrack} />
    </div>
  );
};
