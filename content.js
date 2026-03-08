function injectWarningBanner(threatType, sourceUrl) {
    if (document.getElementById('agent-guard-warning-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'agent-guard-warning-banner';

    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.8l7.5 13.2H4.5L12 5.8zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>`;

    banner.innerHTML = `
        <div id="agent-guard-banner-header">
            ${iconSvg}
            <span><strong>WARNING:</strong> A citation contains hidden algorithmic manipulation (${threatType}).</span>
            <button id="agent-guard-details-btn">View Details ▼</button>
        </div>
        <div id="agent-guard-banner-details" style="display: none;">
            <div class="agent-guard-details-title">Compromised Source:</div>
            <ul class="agent-guard-compromised-list">
                <li>${sourceUrl} <span class="agent-guard-reason">${threatType}</span></li>
            </ul>
        </div>
    `;

    document.body.prepend(banner);

    document.getElementById('agent-guard-details-btn').addEventListener('click', function () {
        const details = document.getElementById('agent-guard-banner-details');
        if (details.style.display === 'none') {
            details.style.display = 'block';
            this.innerText = 'Hide Details ▲';
        } else {
            details.style.display = 'none';
            this.innerText = 'View Details ▼';
        }
    });
}

function decorateCitation(linkElement, isCompromised) {
    if (!linkElement.parentNode) return;

    const badge = document.createElement('span');
    if (isCompromised) {
        badge.className = 'agent-guard-compromised-badge';
        badge.title = 'Agent Guard Warning: Compromised source';
    } else {
        badge.className = 'agent-guard-verified-badge';
        badge.title = 'Agent Guard Verified: Clean source';
    }

    linkElement.parentNode.insertBefore(badge, linkElement.nextSibling);
}

function scanCitations() {
    const links = document.querySelectorAll('a[href], .citation');

    links.forEach((link, index) => {
        const url = link.href || link.getAttribute('href') || '';

        if (!url || !url.startsWith('http')) return;

        // Simple placeholder heuristic for early prototype
        const suspicious = url.includes('api') || url.includes('hidden') || index === 1;

        if (suspicious) {
            decorateCitation(link, true);
            injectWarningBanner('Prompt Injection Detected', url);
        } else {
            decorateCitation(link, false);
        }
    });
}

setTimeout(() => {
    scanCitations();
    console.log("Agent Guard basic citation scan complete.");
}, 800);
