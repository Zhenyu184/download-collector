chrome.downloads.onCreated.addListener((downloadItem) => {
    console.log("Download started:", downloadItem);
});

chrome.downloads.onChanged.addListener((delta) => {
    console.log("Download changed:", delta);
});

chrome.downloads.onErased.addListener((downloadId) => {
    console.log("Download erased:", downloadId);
});
