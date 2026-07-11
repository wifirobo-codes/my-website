document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('friends-grid');

    try {
        // Cache-busting for static hosting (GitHub Pages/browser caches)
        const url = `./friends.json?v=${Date.now()}`;
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error(`Failed to load friends.json: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        grid.innerHTML = data.map(f => {
            const links = [1, 2, 3].map(i => {
                let id = f[`link${i}id`];
                const linkUrl = f[`link${i}`];

                if (id === 'none' || !id || !linkUrl || linkUrl === 'none') return '';

                id = id.toLowerCase().trim();

                let filename = '';
                if (id === 'discord') filename = 'discord_icon.png';
                else if (id === 'email') filename = 'email icon.png';
                else if (id === 'git' || id === 'github') filename = 'git_icon.png';
                else if (id === 'insta' || id === 'instagram') filename = 'insta_icon.png';
                else if (id === 'linktree') filename = 'linktree_icon.png';
                else if (id === 'whatsapp') filename = 'whatsapp icon.png';

                if (!filename) return '';

                return `<a href="${linkUrl}" target="_blank" rel="noreferrer"><img src="./assets/${filename}" class="social-icon ${id === 'linktree' ? 'icon-circle' : ''}" alt="${id}"></a>`;
            }).join('');

            return `
                <div class="card">
                    <img src="./assets/friends/${f.id}.png" class="friend-img" alt="${f.name}">
                    <h2 class="friend-name">${f.name}</h2>
                    <div class="social-links">${links}</div>
                </div>`;
        }).join('');
    } catch (e) {
        console.error(e);
        grid.innerHTML = '<p>Could not load friends list.</p>';
    }
});
