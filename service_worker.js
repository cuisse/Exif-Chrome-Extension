try {
    importScripts("./libs/exif.js");
} catch (e) {
    console.error(e);
}

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.contextMenus.create({
        id      : "exif",
        title   : "Inspect EXIF data",
        contexts: ["image"]
    }, function() {});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.srcUrl) {
        fetch(info.srcUrl).then(response => response.blob()).then(blob => {
            EXIF.getData(blob, function() {
                chrome.tabs.sendMessage(tab.id, { exif: EXIF.getAllTags(this) }, function(r) { return true; });
            });
        });
    }
});