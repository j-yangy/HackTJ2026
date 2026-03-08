chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchHtml") {
        fetch(request.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                sendResponse({ success: true, html: html });
            })
            .catch(error => {
                console.error("Agent Guard Fetch Error:", error);
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }
});
