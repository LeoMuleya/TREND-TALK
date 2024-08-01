document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postIndex = urlParams.get('index');
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  const post = blogPosts[postIndex];
  const postContent = document.getElementById('post-content');
  const relatedTopics = document.getElementById('related-topics');

  if (post) {
      postContent.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="blog-image"/>
          <h1>${post.title}</h1>
          <small>${post.date}</small>
          <p>${post.content}</p>
      `;

      // Implement related topics based on some logic
      const relatedPosts = blogPosts.filter((_, index) => index !== parseInt(postIndex));
      relatedTopics.innerHTML = '';
      relatedPosts.forEach((relatedPost, index) => {
          const relatedElement = document.createElement('div');
          relatedElement.classList.add('related-post');
          relatedElement.innerHTML = `
              <a href="post.html?index=${index}">
                  <h4>${relatedPost.title}</h4>
              </a>
          `;
          relatedTopics.appendChild(relatedElement);
      });
  } else {
      postContent.innerHTML = '<p>Post not found.</p>';
  }
});
