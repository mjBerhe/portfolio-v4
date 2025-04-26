"use client";

import { useEffect } from "react";
import { getSpotifyToken } from "~/utils/getSpotifyToken";

export const Spotify: React.FC = () => {
  useEffect(() => {
    // const fetchToken = async () => {
    //   const data = await getSpotifyToken();
    //   console.log(data);
    //   return data;
    // };
    // const data = fetchToken();

    const fetchTrack = async () => {
      const res = await fetch("/api/spotify/track?id=0VjIjW4GlUZAMYd2vXMi3b");
      const data = await res.json();
      console.log(data);
    };
    fetchTrack();
  }, []);

  return <div>hello</div>;
};
