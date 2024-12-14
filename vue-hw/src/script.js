

// If i want to fetch the data online point 5
/*
function fetchPosts() {
    return fetch('https://api.jsonbin.io/v3/b/6724e11aacd3cb34a8a0aa99')
        .then(response => response.json())
        .then(data => data.record)
}
*/

/*
function loadPosts() {
    // Fetch posts from API and fallback to local JSON if API fails
    fetchPosts()
        .then(posts => renderPosts(posts))
}
*/

function dropdown() {
    document.getElementById("dropdown").classList.toggle("show");
}

function fetchLocalPosts() {
    return fetch('src/js/objects.json')
        .then(response => response.json())
}

function renderPosts(posts) {
    let feed = document.querySelector('.feed');

    posts.forEach(post => {
        let postElement = document.createElement('div');
        postElement.classList.add('post');

        //Creating header parts
        let header = document.createElement('div');
        header.classList.add('post-header');
        
        let profileImage = document.createElement('img');
        profileImage.src = post.profileImage;
        profileImage.width = 40;
        profileImage.height = 40;
        profileImage.alt = 'Profile';

        let authorName = document.createElement('p');
        authorName.textContent = post.author;

        let verifiedBadge = document.createElement('img');
        verifiedBadge.classList.add('verified');
        verifiedBadge.src = 'res/images/verified.png';
        verifiedBadge.width = 20;
        verifiedBadge.height = 20;
        verifiedBadge.alt = 'verified';

        let username = document.createElement('p');
        username.textContent = post.username;

        header.appendChild(profileImage);
        header.appendChild(authorName);
        header.appendChild(verifiedBadge);
        header.appendChild(username);
        postElement.appendChild(header);


        //If post has an image adds it
        if (post.postImage) {
            let postImage = document.createElement('img');
            postImage.src = post.postImage;
            postImage.classList.add('post-image');

            postElement.appendChild(postImage);
        }


        //Post content
        let postText = document.createElement('p');
        postText.classList.add('post-text');
        postText.textContent = post.text;
        postElement.appendChild(postText);


        //Reactions to post
        let likeButtons = document.createElement('div');
        likeButtons.classList.add('like-buttons');
        ['👍', '❤️', '😂', '😠', '😥'].forEach(emoji => {
            let button = document.createElement('button');
            button.classList.add('like-button');
            button.textContent = emoji;
            likeButtons.appendChild(button);
        });
        postElement.appendChild(likeButtons);

        let postDate = document.createElement('p');
        postDate.classList.add('post-date');
        postDate.textContent = post.date;
        postElement.appendChild(postDate);
        feed.appendChild(postElement);
    });
}

function loadPosts() {
    fetchLocalPosts()
        .then(posts => renderPosts(posts))    
}

loadPosts();


