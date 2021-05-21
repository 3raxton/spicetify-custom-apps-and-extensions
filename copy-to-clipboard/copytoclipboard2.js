// NAME: Copy text
// AUTHOR: pnthach95
// DESCRIPTION: Adds Copy text to context menu for Spotify v1.1.59 and Spicetify v2.0.0 and above

/// <reference path="global.d.ts" />

const { Type } = Spicetify.URI;

/**
 * @see https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 *
 * @param {string[]} uris URIs of right-click item
 */
async function copyToClipboard(uris) {
  const uri = Spicetify.URI.fromString(uris[0]);
  let data = null;
  try {
    switch (uri.type) {
      case Type.ALBUM:
        data = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/albums/${uri.getBase62Id()}`);
        break;
      case Type.TRACK:
        data = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/tracks/${uri.getBase62Id()}`);
        break;
      case Type.ARTIST:
        data = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/artists/${uri.getBase62Id()}`);
        break;
      case Type.PLAYLIST:
      case Type.PLAYLIST_V2:
        data = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/playlists/${uri.getBase62Id()}`);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(uri, error);
  }

  if (data) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = data.name;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'Successful' : 'Unsuccessful';
      Spicetify.showNotification(msg + ' copied to Clipboard');
    } catch (err) {
      Spicetify.showNotification('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  } else {
    Spicetify.showNotification('Oops, unable to copy');
  }
}

/**
 * @param {string[]} uris URIs of right-click item
 */
function shouldAdd(uris) {
  if (uris.length === 1) {
    const uri = Spicetify.URI.fromString(uris[0]);
    switch (uri.type) {
      case Type.ALBUM:
      case Type.TRACK:
      case Type.ARTIST:
      case Type.PLAYLIST:
      case Type.PLAYLIST_V2:
        return true;
      default:
        return false;
    }
  } else {
    return false;
  }
}

new Spicetify.ContextMenu.Item('Copy text', copyToClipboard, shouldAdd, 'copy').register();
