chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.exif) {
        displayExif(msg.exif);
    } else {
        console.error("No EXIF data available");
    }
    return true;
});

function displayExif(data) {
    let display = window.open("", "_blank", "width=600,height=400");
    if (display) {
        let content = "<h1>EXIF Data</h1>";
        for (let key in data) {
            if (key !== "thumbnail") {
                content += "<p><strong>" + key + ":</strong> " + data[key] + "</p>";
            }
        }
        display.document.write(content);
    } else {
        alert("Failed to open new window. Please check your browser settings.");
    }
}