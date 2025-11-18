document.addEventListener('DOMContentLoaded', function() {
    const username = 's-sarath10';
    const repoContainer = document.getElementById('repo-container');

    if (!repoContainer) {
        console.error('Repository container not found.');
        return;
    }

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(repos => {
            repoContainer.innerHTML = ''; // Clear the "Loading..." text

            const myRepos = repos.filter(repo => repo.fork === false);

            if (myRepos.length === 0) {
                repoContainer.innerHTML = '<p class="text-center">No public, non-forked repositories found.</p>';
                return;
            }

            myRepos.forEach(repo => {
                // --- Start of Secure Code ---
                
                // 1. Create all elements safely
                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';

                const repoHeader = document.createElement('div');
                repoHeader.className = 'repo-header';

                const repoTitle = document.createElement('h3');
                repoTitle.className = 'repo-title';
                
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.target = '_blank';
                repoLink.rel = 'noopener noreferrer';
                repoLink.textContent = repo.name; // Use .textContent
                
                const repoStats = document.createElement('div');
                repoStats.className = 'repo-stats';
                
                // Safely create stats using textContent
                const stars = document.createElement('span');
                stars.innerHTML = `<i class="fa fa-star"></i> `; // Using innerHTML here is safe as it's our own static code
                stars.appendChild(document.createTextNode(repo.stargazers_count));

                const forks = document.createElement('span');
                forks.innerHTML = `<i class="fa fa-code-fork"></i> `;
                forks.appendChild(document.createTextNode(repo.forks_count));

                const issues = document.createElement('span');
                issues.innerHTML = `<i class="fa fa-exclamation-circle"></i> `;
                issues.appendChild(document.createTextNode(repo.open_issues_count));

                const repoDescription = document.createElement('p');
                repoDescription.className = 'repo-description';
                repoDescription.textContent = repo.description ? repo.description : 'No description provided.'; // Use .textContent

                const repoFooter = document.createElement('div');
                repoFooter.className = 'repo-footer';
                
                const repoLanguage = document.createElement('span');
                repoLanguage.className = 'repo-language';
                repoLanguage.textContent = repo.language ? repo.language : 'N/A'; // Use .textContent

                const repoUpdated = document.createElement('span');
                repoUpdated.className = 'repo-updated';
                repoUpdated.textContent = `Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`; // Use .textContent

                // 2. Assemble the elements
                repoTitle.appendChild(repoLink);
                
                repoStats.appendChild(stars);
                repoStats.appendChild(forks);
                repoStats.appendChild(issues);

                repoHeader.appendChild(repoTitle);
                repoHeader.appendChild(repoStats);

                repoFooter.appendChild(repoLanguage);
                repoFooter.appendChild(repoUpdated);

                repoCard.appendChild(repoHeader);
                repoCard.appendChild(repoDescription);
                repoCard.appendChild(repoFooter);

                repoContainer.appendChild(repoCard);
                // --- End of Secure Code ---
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            repoContainer.innerHTML = '<p class="text-center" style="color: red;">Could not load repositories. Please try again later.</p>';
        });
});
