// @ts-check

// NAME: Spotify Lyrics
// AUTHOR: Darkempire
// DESCRIPTION: Display the current track lyrics.

/// <reference path="../globals.d.ts" />

(function spotifyLyrics() {
    if (!Spicetify.LocalStorage) {
        setTimeout(spotifyLyrics, 1000);
        return;
    }

    // Setup the mode 
    let isEnabled = Spicetify.LocalStorage.get("lyrics") === "1";

    new Spicetify.Menu.Item("Lyrics Mode", isEnabled, (self) => {
        isEnabled = !isEnabled;
        Spicetify.LocalStorage.set("lyrics", isEnabled ? "1" : "0");
        self.setState(isEnabled);
    }).register();



    function createLyricsButton() {
        const b = document.createElement("button");
        b.classList.add("button", "button-green");
        b.innerText = "Lyrics";
        b.id = "lyricsButton"
        b.onclick = () => {
            if (document.getElementById("LyricsContainer").style.display === "block") {
                closeNav();
            } else {
                openNav();
            }
        };
        return b;
    }

    // Create the lyrics buton
    const extraControlsContainer = document.getElementsByClassName("extra-controls-container");
    extraControlsContainer[0].prepend(createLyricsButton()); // prepend = append before all

    function createLyricsContainer() {
        const div = document.createElement("div");
        div.classList.add("sidenav");
        div.id = "LyricsContainer";

        div.style.display = "none";
        div.style.height = "100%";
        div.style.width = "500px";
        div.style.position = "absolute";
        div.style.zIndex = "1";
        div.style.top = "0";
        div.style.left = "0";
        div.style.padding = "20px";
        div.style.backgroundColor = "#111111";
        div.style.overflowX = "hidden";
        div.style.transition = "max-height 1000ms ease-in-out";
        
        // Append close button, title, artist, album, lyrics
        // Close Button
        const a = document.createElement("a");
        a.id = "LyricsContainerCloseButton";
        a.innerHTML = "&times;";
        a.onclick = () => {
            closeNav();
        }
        a.style.float = "right"
        a.style.top = "0";
        a.style.right = "25px";
        a.style.marginLeft = "100%";
        a.style.fontSize = "36px";
        // Music Title 
        const h1 = document.createElement("h1");
        h1.id = "LyricsContainerMusicTitle"
        h1.innerHTML = "Music Title";
        // Music album / artist
        const h2 = document.createElement("h2");
        h2.id = "LyricsContainerMusicArtistAlbum"
        h2.innerHTML = "Music Artist";
        // Muisc Lyrics
        const p = document.createElement("p");
        p.id = "LyricsContainerMusicLyrics"
        p.innerHTML = "Music Lyrics";
        p.style.whiteSpace = "pre-line"; // Replace \n withs <br>
        
        div.appendChild(a);
        div.appendChild(h1);
        div.appendChild(h2);
        div.appendChild(p);
        
        return div;
    }

    // Create the lyrics container
    const contentWrapper = document.getElementById("content-wrapper");
    contentWrapper.appendChild(createLyricsContainer());

    // Lyrics container functions
    function openNav() {
        document.getElementById("LyricsContainer").style.display = "block";
    }
    function closeNav() {
        document.getElementById("LyricsContainer").style.display = "none";
    }

    // When the song changes
    Spicetify.Player.addEventListener("songchange", () => {
        if (!isEnabled) return;

        // Get data
        const data = Spicetify.Player.data

        const artist = data.track.metadata.artist_name
        const album = data.track.metadata.album_title
        const title = data.track.metadata.title

        // Display the title / artist / album
        document.getElementById("LyricsContainerMusicTitle").innerHTML = title
        document.getElementById("LyricsContainerMusicArtistAlbum").innerHTML = `by ${artist} in ${album}`

        // Find lyrics
        fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`).then(function(response) {
            response.text().then(function(text) { 
                // Convert to json
                if (response.status === 200) {
                    const responseObject = JSON.parse(text);
                    if (responseObject.lyrics.length > 0) {
                        // Display the lyrics
                        document.getElementById("LyricsContainerMusicLyrics").innerHTML = responseObject.lyrics
                    } else {
                        document.getElementById("LyricsContainerMusicLyrics").innerHTML = "No lyrics found."
                    } 
                } else {
                    document.getElementById("LyricsContainerMusicLyrics").innerHTML = "Request error."
                }
            });
        });
    });

    // Display the lyrics button and the lyrics container
    setInterval(() => {
        if (!isEnabled) {
            document.getElementById("LyricsContainer").style.display = "none";
            document.getElementById("lyricsButton").style.display = "none";
        } else {
            document.getElementById("lyricsButton").style.display = "block";
        }
    }, 500)

})();