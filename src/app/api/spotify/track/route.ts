import { getSpotifyAccessToken } from "~/utils/tokenManager";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response("Missing track ID", { status: 400 });

  try {
    const token = await getSpotifyAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return new Response("Failed to fetch track", { status: 500 });

    const track = await res.json();
    return Response.json(track);
  } catch {
    return new Response("Server error", { status: 500 });
  }
}
