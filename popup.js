

document.addEventListener("DOMContentLoaded", () => {
    console.log("Agent Guard Dashboard fully loaded.");


    chrome.storage.local.get({
        agentguardStats: {
            zeroPx: 0,
            hiddenComments: 0
        },
        agentguardLogs: []
    }, (result) => {
        const stats = result.agentguardStats;
        const logs = result.agentguardLogs;

        document.getElementById("count-0px").innerText = stats.zeroPx;
        document.getElementById("count-comments").innerText = stats.hiddenComments;


        const totalThreats = stats.zeroPx + stats.hiddenComments;
        if (totalThreats === 0) {
            document.querySelector("h2").innerText = "CLEAN";
            document.querySelector("h2").className = "text-xl font-bold text-green-500 tracking-wide text-glow-green text-center uppercase";
            document.querySelector("h2").style.textShadow = "0 0 8px rgba(34, 197, 94, 0.8)";
            document.querySelector("p").innerText = "No Prompts Detected";
            document.querySelector("p").className = "text-[11px] text-green-400 font-mono mt-1 text-center bg-green-900/30 px-3 py-1 rounded-full border border-green-900";
            document.querySelector(".status-ring").className = "status-ring w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-950/40 mb-4 relative";

            const icon = document.querySelector(".status-ring svg");
            icon.classList.remove("text-red-500");
            icon.classList.add("text-green-500");

            const style = document.createElement("style");
            style.innerHTML = `
                @keyframes pulse-ring-green {
                    0% { box-shadow: 0 0 15px 2px rgba(34, 197, 94, 0.4); }
                    50% { box-shadow: 0 0 25px 8px rgba(34, 197, 94, 0.7); }
                    100% { box-shadow: 0 0 15px 2px rgba(34, 197, 94, 0.4); }
                }
                .status-ring { animation: pulse-ring-green 2s infinite !important; }
            `;
            document.head.appendChild(style);
        }

        const logsContainer = document.getElementById("logs-container");
        if (logs.length > 0) {
            document.getElementById("no-logs-msg").style.display = "none";

            logs.forEach(log => {
                const logWidget = document.createElement("div");
                logWidget.className = "bg-slate-800/60 border border-slate-700 p-2 rounded relative";

                const safeUrl = log.url.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const safeSnippet = log.snippet.replace(/</g, "&lt;").replace(/>/g, "&gt;");

                logWidget.innerHTML = `
                    <div class="text-[10px] text-red-400 font-bold uppercase mb-1 flex items-center">
                        <span class="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-1"></span>
                        ${log.threatName}
                    </div>
                    <div class="text-[9px] text-slate-400 font-mono mb-2 truncate" title="${safeUrl}">
                        SOURCE: ${safeUrl}
                    </div>
                    <div class="bg-black/50 p-2 rounded border border-slate-700/50 overflow-x-auto">
                        <code class="text-[10px] text-red-300 font-mono whitespace-pre">${safeSnippet}</code>
                    </div>
                `;
                logsContainer.appendChild(logWidget);
            });
        }
    });

    document.getElementById("toggle-logs-btn").addEventListener("click", () => {
        const logsContainer = document.getElementById("logs-container");
        const chevron = document.getElementById("log-chevron");
        if (logsContainer.classList.contains("hidden")) {
            logsContainer.classList.remove("hidden");
            chevron.innerText = "▲";
        } else {
            logsContainer.classList.add("hidden");
            chevron.innerText = "▼";
        }
    });
});
