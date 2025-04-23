"use client";

import { useEffect } from "react";
import { getSpotifyToken } from "~/utils/getSpotifyToken";

export const Spotify: React.FC = () => {
  useEffect(() => {
    const fetchToken = async () => {
      const data = await getSpotifyToken();
      console.log(data);
      return data;
    };
    const data = fetchToken();
  }, []);

  return <div>hello</div>;
};
