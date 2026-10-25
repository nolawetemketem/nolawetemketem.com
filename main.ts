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

// Thumbnail naming and entrance animations for page transitions live in the inline <head> script of each page.

const player = document.querySelector<HTMLVideoElement>('#video-player');
if (player) {
    const requested = new URLSearchParams(window.location.search).get('v') || 'flock';
    const project = Object.prototype.hasOwnProperty.call(projects, requested) ? requested : 'flock';
    // The inline script may already have set the poster from the clicked thumbnail; keep it to avoid a flicker.
    if (!player.getAttribute('poster')) player.poster = assets[`/assets/projects/${project}.png`]!;
    player.src = assets[`/assets/projects/${projects[project]}`]!;
    try { sessionStorage.setItem('selected-project', project); } catch { /* Storage is optional. */ }
    // player.addEventListener('click', () => {
    //     if (player.requestFullscreen) void player.requestFullscreen().catch(() => {});
    // });
}
