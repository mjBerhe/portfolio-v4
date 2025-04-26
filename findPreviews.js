import spotifyPreviewFinder from "spotify-preview-finder";

// your Spotify client credentials
const clientId = "ac88ceb3fd6545f39c546db61f9c9a25";
const clientSecret = "0fd86898d58b4bfdaf83c4180c7a119f";

async function searchSongs() {
  try {
    // Search for multiple songs
    const songs = [
      await spotifyPreviewFinder("MUTT", 1),
      await spotifyPreviewFinder("Hereditary", 1),
      await spotifyPreviewFinder("Tokyo Nights", 1),
    ];

    songs.forEach((result) => {
      if (result.success && result.results.length > 0) {
        const song = result.results[0];
        console.log(`\nFound: ${song.name}`);
        console.log(`Preview URL: ${song.previewUrls[0]}`);
        console.log(song);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

searchSongs();
