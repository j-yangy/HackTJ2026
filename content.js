function injectWarningBanner() {
    if (document.getElementById('agent-guard-warning-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'agent-guard-warning-banner';
    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.8l7.5 13.2H4.5L12 5.8zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>`;
    banner.innerHTML = `<div id="agent-guard-banner-header">${iconSvg}<span><strong>WARNING:</strong> Citation [2] contains hidden algorithmic manipulation (Prompt Injection Detected). This AI summary is compromised.</span><button id="agent-guard-details-btn">View Details ▼</button></div><div id="agent-guard-banner-details" style="display: none;"><div class="agent-guard-details-title">Compromised Sources Detected:</div><ul class="agent-guard-compromised-list"><li><strong>[2]</strong> https://source2.org/hidden-vectors <span class="agent-guard-reason">0px Font Prompt Injection</span></li><li><strong>[4]</strong> https://trackinfo.net/api/v1/data <span class="agent-guard-reason">White-on-White Text</span></li></ul></div>`;
    document.body.prepend(banner);
    document.getElementById('agent-guard-details-btn').addEventListener('click', function () {
        const details = document.getElementById('agent-guard-banner-details');
        if (details.style.display === 'none') { details.style.display = 'block'; this.innerText = 'Hide Details ▲'; } else { details.style.display = 'none'; this.innerText = 'View Details ▼'; }
    });
}
function injectMockBadges() {
    const potentialLinks = document.querySelectorAll('p a, .citation, sup a');
    if (potentialLinks.length > 0) {
        potentialLinks.forEach((link, index) => {
            const badge = document.createElement('span');
            if (index === 1) { badge.className = 'agent-guard-compromised-badge'; badge.title = 'Agent Guard Warning: Compromised source data linked'; } else { badge.className = 'agent-guard-verified-badge'; badge.title = 'Agent Guard Verified: Clean source'; }
            link.parentNode.insertBefore(badge, link.nextSibling);
        });
    } else {
        const demoBox = document.createElement('div');
        demoBox.id = 'agent-guard-demo-box';
        demoBox.innerHTML = `<h3>Agent Guard Sandbox Data</h3><p style="font-size: 14px; margin-bottom: 12px;">The system analysis looks generally stable according to the community forum <a href="#" style="color: #38bdf8; text-decoration: none; font-weight: bold;">[1]</a><span class="agent-guard-verified-badge" title="Verified Clean"></span>.</p><p style="font-size: 14px; margin: 0;">However, checking the remote server logs <a href="#" style="color: #ef4444; text-decoration: none; font-weight: bold;">[2]</a><span class="agent-guard-compromised-badge" title="Prompt Injection Detected"></span> there are anomalies detected in the raw input parsing framework.</p>`;
        document.body.appendChild(demoBox);
    }
}
setTimeout(() => {
    injectWarningBanner();
    injectMockBadges();
    console.log("Agent Guard Mock UI injected into the active page.");
}, 800);
