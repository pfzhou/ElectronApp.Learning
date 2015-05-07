//global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');

var shell = require('shell');
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');

$(document).ready(function() {
  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open(process.execPath);
  addressbar.set(process.execPath);

  folder.on('navigate', function(dir, mime) {
    if (mime.type == 'folder') {
      addressbar.enter(mime);
    } else {
      shell.openItem(mime.path);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });
});
