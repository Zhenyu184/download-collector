chrome.downloads.onCreated.addListener((downloadItem) => {
    console.log("Download Created ", downloadItem);
});

chrome.downloads.onChanged.addListener((delta) => {
    console.log("Download changed:", delta);
    try {
        const filePath = delta.filename.current;
        if (!filePath) return;

        const lastDotIndex = filePath.lastIndexOf(".");
        if (lastDotIndex === -1) return;

        const extensionName = filePath.substring(lastDotIndex + 1);
        if (!extensionName) return;

        console.log("extension mame is > ", extensionName);
    } catch (error) {
        // console.log(error);
    }
    return;
});

chrome.downloads.onErased.addListener((downloadId) => {
    console.log("Download erased:", downloadId);
});
