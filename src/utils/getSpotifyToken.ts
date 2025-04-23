export async function getSpotifyToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/spotify/token", {
      method: "POST",
    });

    if (!res.ok) {
      console.error("Token fetch failed");
      return null;
    }

    const data = await res.json();
    return data.access_token;
  } catch (err) {
    console.error("Error fetching token:", err);
    return null;
  }
}
