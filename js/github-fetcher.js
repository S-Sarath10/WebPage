document.addEventListener('DOMContentLoaded', function() {
    const username = 'S-Sarath10';
    const repoContainer = document.getElementById('repo-container');

    if (!repoContainer) {
        console.error('Repository container not found.');
        return;
    }

    // Fetch repositories from the GitHub API
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(repos => {
            // Clear the 'Loading...' message
            repoContainer.innerHTML = ''; 

            if (repos.length === 0) {
                repoContainer.innerHTML = '<p class="text-center">No public repositories found.</p>';
                return;
            }

            // Create a card for each repository
            repos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';

                // Format the last updated date
                const lastUpdated = new Date(repo.updated_at).toLocaleDateString();

                // Handle null descriptions
                const description = repo.description ? repo.description : 'No description provided.';

                repoCard.innerHTML = `
                    <div class="repo-header">
                        <h4 class="repo-title">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                        </h4>
                        <div class="repo-stats">
                            <span><i class="fa fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fa fa-code-fork"></i> ${repo.forks_count}</span>
                            <span><i class="fa fa-exclamation-circle"></i> ${repo.open_issues_count}</span>
                        </div>
                    </div>
                    <p class="repo-description">${description}</p>
                    <div class="repo-footer">
                        <span class="repo-language">${repo.language ? repo.language : 'N/A'}</span>
                        <span class="repo-updated">Last updated: ${lastUpdated}</span>
                    </div>
                `;
                
                repoContainer.appendChild(repoCard);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            repoContainer.innerHTML = '<p class="text-center" style="color: red;">Could not load repositories. Please try again later.</p>';
        });
});
