document.addEventListener('DOMContentLoaded', () => {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const blogContainer = document.getElementById('blog-posts');
    const searchBar = document.getElementById('search-bar');

    const displayPosts = (posts) => {
        blogContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="blog-image"/>
                <h2><a href="post.html?index=${index}">${post.title}</a></h2>
                <p>${post.content.slice(0, 100)}...</p>
                <small>${post.date}</small>
            `;
            blogContainer.appendChild(postElement);
        });
    };

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.content.toLowerCase().includes(searchTerm)
        );
        displayPosts(filteredPosts);

        if (filteredPosts.length === 0) {
            blogContainer.innerHTML = '<p>No posts found.</p>';
        }
    });

    displayPosts(blogPosts);
});
