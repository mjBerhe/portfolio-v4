"use client";

import { useEffect, useState } from "react";
import { AudioPlayer } from "../ui/audio-player";

export const Spotify: React.FC = () => {
  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const res = await fetch("/api/spotify/track?id=463CkQjx2Zk1yXoBuierM9");
      const data = (await res.json()) as SpotifyApi.TrackObjectFull;

      // const url = data.external_urls.spotify;
      setTrack(data);
    };
    void fetchTrack();
  }, []);

  return <div>{track && <AudioPlayer track={track} />}</div>;
};
