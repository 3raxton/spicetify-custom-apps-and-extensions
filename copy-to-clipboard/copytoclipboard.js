// NAME: Copy text
// AUTHOR: pnthach95
// DESCRIPTION: Adds Copy text to context menu

/**
 * @see https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 *
 * @param {string} data String to clipboard
 */
async function copyToClipboard(uris) {
  let data = Spicetify.LiveAPI(uris[0])._data.name;
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
    textArea.value = data;
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

new Spicetify.ContextMenu.Item('Copy text', copyToClipboard).register();
