const input = document.getElementById("file");

input.addEventListener("change", (e) => {
    if (input.files.length === 0) {
        return;
    }
    EXIF.getData(input.files[0], function () {
        const exif = EXIF.getAllTags(this);
        chrome.tabs.query({ active: true, currentWindow: true }, function(response) {
            chrome.tabs.sendMessage(response[0].id, { exif: exif }, function(r) { });
        });
    });
});