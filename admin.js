document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const adminContent = document.getElementById('admin-content');
    const blogForm = document.getElementById('blog-form');
    const blogList = document.getElementById('blog-list');
    const password = 'admin123';

    const loadPosts = () => {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogList.innerHTML = '';
        blogPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post-admin');
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="blog-image"/>
                <h2>${post.title}</h2>
                <p>${post.content.slice(0, 100)}...</p>
                <small>${post.date}</small>
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
            `;
            blogList.appendChild(postElement);
        });
    };

    window.editPost = (index) => {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
        const post = blogPosts[index];
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        // Implement the rest of the edit functionality as needed
    };

    window.deletePost = (index) => {
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
        blogPosts.splice(index, 1);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        loadPosts();
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredPassword = document.getElementById('password').value;
        if (enteredPassword === password) {
            loginForm.style.display = 'none';
            adminContent.style.display = 'block';
            loadPosts();
        } else {
            alert('Incorrect password');
        }
    });

    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('image').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const blogPost = {
                title: title,
                content: content,
                image: event.target.result,
                date: new Date().toLocaleString()
            };

            let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            blogPosts.push(blogPost);
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

            alert('New blog post added successfully!');
            blogForm.reset();
            loadPosts();
        };
        reader.readAsDataURL(image);
    });
});
