// NAME: Show Queue Duration
// AUTHOR: andrsdt
// DESCRIPTION: Display how long is the current track queue

/// <reference path="../globals.d.ts" />

(function ShowQueueDuration() {
  // Only run on the queue page
  if (Spicetify.Platform?.History.location.pathname !== "/queue") {
    setTimeout(ShowQueueDuration, 1000);
    return;
  }
  const queueText = document
    .querySelector(".main-type-canon")
    .textContent.split(" -")[0];

  let nextTracks = Spicetify.Queue.nextTracks.filter(
    (t) => t.provider === "queue"
  );

  const queueDuration = nextTracks
    .map((t) => parseInt(t.contextTrack.metadata.duration) || 0)
    .reduce((a, b) => a + b, 0); // Sum up the durations

  const currentSongProgress = Spicetify.Player.getProgress() || 0;
  const currentSongDuration = Spicetify.Player.getDuration() || 0;
  const currentSongRemaining = currentSongDuration - currentSongProgress;

  const prettyDuration = new Date(queueDuration + currentSongRemaining)
    .toGMTString()
    .split(" ")[4]; // Index of "hh:mm:ss"

  document.querySelector(".main-type-canon").textContent =
    queueText + `  -  ${prettyDuration}`;

  // Update every second
  setTimeout(ShowQueueDuration, 1000);
})();
