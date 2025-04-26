let accessToken: string | null = null;
let expiresAt: number | null = null;

export async function getSpotifyAccessToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if it's still valid
  if (accessToken && expiresAt && now < expiresAt) {
    return accessToken;
  }

  // Otherwise, fetch a new token
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data = (await res.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number; // in seconds
  };

  accessToken = data.access_token;
  expiresAt = now + data.expires_in * 1000 - 10_000; // Subtract 10s buffer

  return accessToken;
}
