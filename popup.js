document.addEventListener("DOMContentLoaded", () => {
    console.log("Aegis Dashboard loaded.");

    chrome.storage.local.get({
        aegisStats: {
            zeroPx: 0,
            hiddenComments: 0
        },
        aegisLogs: []
    }, (result) => {
        const stats = result.aegisStats;
        const logs = result.aegisLogs;

        document.getElementById("count-0px").innerText = stats.zeroPx;
        document.getElementById("count-comments").innerText = stats.hiddenComments;

        const totalThreats = stats.zeroPx + stats.hiddenComments;
        if (totalThreats === 0) {
            document.querySelector("h2").innerText = "CLEAN";
            document.querySelector("h2").className = "text-xl font-bold text-green-500 text-center uppercase";
            document.querySelector("p").innerText = "No Prompts Detected";
            document.querySelector("p").className = "text-[11px] text-green-400 font-mono mt-1 text-center";
            document.querySelector(".status-ring").className =
                "status-ring w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-4";

            const icon = document.querySelector(".status-ring svg");
            icon.classList.remove("text-red-500");
            icon.classList.add("text-green-500");
        }

        const logsContainer = document.getElementById("logs-container");
        if (logs.length > 0) {
            document.getElementById("no-logs-msg").style.display = "none";

            logs.forEach(log => {
                const logWidget = document.createElement("div");
                logWidget.className = "bg-slate-800 border border-slate-700 p-2 rounded";

                logWidget.innerHTML = `
                    <div class="text-[10px] text-red-400 font-bold uppercase mb-1">
                        ${log.threatName}
                    </div>
                    <div class="text-[9px] text-slate-400 font-mono mb-2 truncate">
                        SOURCE: ${log.url}
                    </div>
                    <div class="bg-black/50 p-2 rounded border border-slate-700/50">
                        <code class="text-[10px] text-red-300 font-mono whitespace-pre">${log.snippet}</code>
                    </div>
                `;

                logsContainer.appendChild(logWidget);
            });
        }
    });
});
