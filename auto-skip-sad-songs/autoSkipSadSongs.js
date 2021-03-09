/* @ts-check

NAME: Auto Skip Sad Songs
AUTHOR: Jake Roggenbuck
DESCRIPTION: Auto Skip Sad Songs

*/

(function SkipSad() {
    if (!Spicetify.LocalStorage) {
        setTimeout(SkipSad, 1000);
        return;
	}

    let isEnabled = Spicetify.LocalStorage.get("SkipSad") === "1";

    // Add menu item to enable feature
    new Spicetify.Menu.Item("Skip Sad Songs", isEnabled, (self) => {
        isEnabled = !isEnabled;
        Spicetify.LocalStorage.set("SkipSad", isEnabled ? "1" : "0");
        self.setState(isEnabled);
    }).register();

    Spicetify.Player.addEventListener("songchange", () => {
        if (!isEnabled) return;
        const data = Spicetify.Player.data || Spicetify.Queue;
        if (!data) return;

        // Get title and artist name
        const artist = data.track.metadata.artist_name;
        const title = data.track.metadata.title;

        const sad_artists = ["AJR", "Sleeping At Last", "Of Monsters and Men"];
        const sad_titles = ["Lost Stars", "Had It All"];
        // If the artist name or title are in their corresponding arrays
        if (sad_artists.includes(artist) || sad_titles.includes(title)) {
            Spicetify.Player.next();
        }
    });
})();
