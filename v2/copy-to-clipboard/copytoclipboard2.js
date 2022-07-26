// NAME: Copy Text
// AUTHOR: pnthach95
// DESCRIPTION: Adds Copy text to context menu for Spotify v1.1.59 and Spicetify v2.0.0 and above

/// <reference path="globals.d.ts" />

let copyTextCount = 0;
(async function copyText() {
    if (!Spicetify && copyTextCount < 200) {
        setTimeout(copyText, 300);
        copyTextCount++;
        return;
    }
    initCopyText();
})();

function initCopyText() {
    const { Type } = Spicetify.URI;

    async function getText(uris) {
        const uri = Spicetify.URI.fromString(uris[0]);

        switch (uri.type) {
            case Type.TRACK:
                sendToClipboard((await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/tracks/${uri.getBase62Id()}`)).name);
                break;
            case Type.ALBUM:
                sendToClipboard((await Spicetify.CosmosAsync.get(`wg://album/v1/album-app/album/${uri.getBase62Id()}/desktop`)).name);
                break;

            case Type.ARTIST:
                sendToClipboard((await Spicetify.CosmosAsync.get(`wg://artist/v1/${uri.getBase62Id()}/desktop?format=json`)).info.name);
                break;
            case Type.PLAYLIST:
            case Type.PLAYLIST_V2:
                sendToClipboard((await Spicetify.CosmosAsync.get(`sp://core-playlist/v1/playlist/spotify:playlist:${uri.getBase62Id()}`)).playlist.name);
                break;
            case Type.SHOW:
                sendToClipboard((await Spicetify.CosmosAsync.get(`sp://core-show/v1/shows/${uri.getBase62Id()}?responseFormat=protobufJson`)).header.showMetadata.name);
                break;
            default:
                break;
        }
    }

    function sendToClipboard(text) {
        if (text) {
            Spicetify.showNotification(`copied : ${text}`);
            Spicetify.Platform.ClipboardAPI.copy(text);
        }
    }

    function shouldAddContextMenu(uris) {
        if (uris.length === 1) {
            const uri = Spicetify.URI.fromString(uris[0]);
            switch (uri.type) {
                case Type.TRACK:
                case Type.ALBUM:
                case Type.ARTIST:
                case Type.PLAYLIST:
                case Type.PLAYLIST_V2:
                case Type.SHOW:
                    return true;
                default:
                    return false;
            }
        } else {
            return false;
        }
    }

    new Spicetify.ContextMenu.Item("Copy Text", getText, shouldAddContextMenu, "copy").register();
}
