const user = 'wifirobo-codes';

async function syncData() {
    const projectsList = document.getElementById('projects-list');
    const aboutContent = document.getElementById('about-content');

    try {
        const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=10`);
        const repos = await res.json();
        projectsList.innerHTML = repos.length
            ? repos.map(r => `<div class="project-item"><a class="project-link" href="${r.html_url}" target="_blank" rel="noreferrer">${r.name}</a></div>`).join('')
            : '<p>No repositories found.</p>';
    } catch (e) {
        projectsList.innerHTML = '<p>Could not load repositories.</p>';
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${user}/${user}/readme`, {
            headers: { Accept: 'application/vnd.github.html' }
        });
        const html = await response.text();
        aboutContent.innerHTML = html;
    } catch (e) {
        aboutContent.innerHTML = 'Could not load profile.';
    }
}

document.addEventListener('DOMContentLoaded', syncData);