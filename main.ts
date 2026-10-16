// Import every project's media so Vite includes it in GitHub deployments.
const assets = import.meta.glob<string>('/assets/projects/*.{mp4,mov,png}', {
    eager: true,
    query: '?url',
    import: 'default',
});
const projects: Record<string, string> = {
    flock: 'flock.mp4',
    adventuretime: 'adventuretime.mov',
    truth: 'truth.mp4',
    valentinesdayfireworks: 'valentinesdayfireworks.mp4',
    thebigbangtheory: 'thebigbangtheory.mp4',
    octavia: 'octavia.mov',
};
const storageKey = 'selected-project';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function rememberProject(project: string) {
    try { sessionStorage.setItem(storageKey, project); } catch { /* Navigation also works without storage. */ }
}
function recalledProject() {
    try { return sessionStorage.getItem(storageKey); } catch { return null; }
}
function selectThumbnail(project: string | null) {
    document.querySelectorAll<HTMLAnchorElement>('.project-link').forEach(link => {
        const image = link.querySelector<HTMLImageElement>('img');
        if (image) image.style.viewTransitionName = !reducedMotion.matches && link.dataset.project === project
            ? 'media-content' : 'none';
    });
}

if (document.documentElement.id === 'home') {
    selectThumbnail(recalledProject());
    document.querySelectorAll<HTMLAnchorElement>('.project-link').forEach(link => {
        link.addEventListener('click', event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const project = link.dataset.project!;
            rememberProject(project);
            selectThumbnail(project);
        });
    });
    window.addEventListener('pageshow', () => selectThumbnail(recalledProject()));
    // Set the incoming thumbnail before the browser captures its transition snapshot.
    window.addEventListener('pagereveal', () => selectThumbnail(recalledProject()));
    const scroller = document.querySelector('.media-scroller');
    try {
        if (sessionStorage.getItem('hasAnimated')) scroller?.classList.remove('fade-in');
        sessionStorage.setItem('hasAnimated', 'true');
    } catch { /* Storage is optional. */ }
}

const player = document.querySelector<HTMLVideoElement>('#video-player');
if (player) {
    const requested = new URLSearchParams(window.location.search).get('v') || 'flock';
    const project = Object.prototype.hasOwnProperty.call(projects, requested) ? requested : 'flock';
    player.src = assets[`/assets/projects/${projects[project]}`]!;
    player.poster = assets[`/assets/projects/${project}.png`]!;
    rememberProject(project);
    player.addEventListener('click', () => {
        if (player.requestFullscreen) void player.requestFullscreen().catch(() => {});
    });
}
