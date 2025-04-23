import { env } from "~/env";

export async function POST() {
  // 1. Read env vars (safe since this code runs server-side)
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;

  // 2. Prepare the authorization header
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  // 3. Make POST request to Spotify token endpoint
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    // Optional: Add more error details for debugging
    return new Response("Failed to fetch access token from Spotify", {
      status: 500,
    });
  }

  const data = await res.json(); // Should contain access_token, token_type, expires_in

  // 4. Return the token data to the frontend
  return Response.json(data);
}
