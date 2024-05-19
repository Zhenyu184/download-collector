chrome.downloads.onCreated.addListener((downloadItem) => {
    console.log("created ", downloadItem);
});

chrome.downloads.onChanged.addListener((delta) => {
    try {
        const filePath = delta.filename.current;
        if (!filePath) return;

        const lastDotIndex = filePath.lastIndexOf(".");
        if (lastDotIndex === -1) return;

        const extensionName = filePath.substring(lastDotIndex + 1);
        if (!extensionName) return;

        // console.log("extension mame is > ", extensionName);
    } catch (error) {}

    try {
        const downloadState = delta.state;
        if (!downloadState) return;

        const downloadCurrent = downloadState.current;
        if (downloadCurrent !== "complete") return;

        console.log("download complete ");

        chrome.downloads.search({ id: delta.id }, (results) => {
            if (results.length <= 0) return;

            const downloadItem = results[0];
            if (!downloadItem) return;

            const fullFilePath = downloadItem.filename;
            if (!fullFilePath) return;

            const lastDotIndex = fullFilePath.lastIndexOf(".");
            if (!lastDotIndex) return;

            const extensionName = fullFilePath.substring(lastDotIndex + 1);
            if (!extensionName) return;

            console.log("fullFilePath ", fullFilePath);
            console.log("extension mame is > ", extensionName);

            if (extensionName === "webp") {
                const newFilePath = `photo/test.webp`;
                moveFile(downloadItem.url, newFilePath, downloadItem.id);
            }
        });
    } catch (error) {
        console.log(error);
    }
    return;
});

chrome.downloads.onDeterminingFilename.addListener((downloadId) => {
    console.log("onDeterminingFilename:", downloadId);
});

chrome.downloads.onErased.addListener((downloadId) => {
    console.log("onErased:", downloadId);
});

// function moveFile(url, newFilePath, originalDownloadId) {
//     chrome.downloads.download(
//         {
//             url: url,
//             filename: newFilePath,
//             conflictAction: "overwrite",
//         },
//         (newDownloadId) => {
//             if (chrome.runtime.lastError) {
//                 console.error(
//                     "Error downloading file:",
//                     chrome.runtime.lastError
//                 );
//             } else {
//                 // 刪除原始文件
//                 chrome.downloads.erase({ id: originalDownloadId }, () => {
//                     if (chrome.runtime.lastError) {
//                         console.error(
//                             "Error erasing original file:",
//                             chrome.runtime.lastError
//                         );
//                     } else {
//                         console.log(`File moved to ${newFilePath}`);
//                     }
//                 });
//             }
//         }
//     );
// }
