document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard loaded.");

    chrome.storage.local.get({
        agentguardStats: {
            zeroPx: 0,
            hiddenComments: 0
        }
    }, (result) => {
        const stats = result.agentguardStats;

        document.getElementById("count-0px").innerText = stats.zeroPx;
        document.getElementById("count-comments").innerText = stats.hiddenComments;

        const totalThreats = stats.zeroPx + stats.hiddenComments;
        if (totalThreats === 0) {
            document.querySelector("h2").innerText = "CLEAN";
            document.querySelector("p").innerText = "No Prompts Detected";
        }
    });
});
