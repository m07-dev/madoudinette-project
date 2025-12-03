
console.log('madou accordion script loaded');
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('madou-accordion');
    if (!container) return;

    const triggers = Array.from(container.querySelectorAll('.accordion-trigger'));
    const panels = Array.from(container.querySelectorAll('.accordion-panel'));

    function closeAll() {
        triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
        panels.forEach(p => { p.setAttribute('data-open', 'false'); p.setAttribute('aria-hidden', 'true'); });
    }

    container.addEventListener('click', function (e) {
        const btn = e.target.closest('.accordion-trigger');
        if (!btn) return;
        const panelId = btn.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (!panel) return;

        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            btn.setAttribute('aria-expanded', 'false');
            panel.setAttribute('data-open', 'false');
            panel.setAttribute('aria-hidden', 'true');
        } else {
            closeAll();
            btn.setAttribute('aria-expanded', 'true');
            panel.setAttribute('data-open', 'true');
            panel.setAttribute('aria-hidden', 'false');
        }
    });

    container.addEventListener('keydown', function (e) {
        const key = e.key;
        const active = document.activeElement;
        if (!active || !active.classList.contains('accordion-trigger')) return;
        const idx = triggers.indexOf(active);
        if (idx === -1) return;

        if (key === 'ArrowDown') {
            e.preventDefault();
            const next = triggers[(idx + 1) % triggers.length]; next.focus();
        } else if (key === 'ArrowUp') {
            e.preventDefault();
            const prev = triggers[(idx - 1 + triggers.length) % triggers.length]; prev.focus();
        } else if (key === 'Home') {
            e.preventDefault(); triggers[0].focus();
        } else if (key === 'End') {
            e.preventDefault(); triggers[triggers.length - 1].focus();
        }
    });
});
