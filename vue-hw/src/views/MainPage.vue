<template>
  <div>
    <Header />
    <section class="feed">
      <div class="controls">
        <button @click="deleteAllPosts">Delete All Posts</button>
      </div>
      <div v-for="post in posts" :key="post.id">
        <UserPost 
          :post="post" 
          @like="likePost(post.id)"
        />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import UserPost from '../components/UserPost.vue';

export default {
  name: 'MainView',
  components: { 
    Header, 
    Footer,
    UserPost 
  },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          this.posts = data.map(post => ({
            ...post,
            likes: 0,
            profileImage: '/res/images/Default_Profile.png',
            date: this.formatDate(post.created_at)
          }));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    likePost(postId) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },
    async deleteAllPosts() {
      if (confirm('Are you sure you want to delete all posts?')) {
        try {
          const response = await fetch('http://localhost:3000/api/posts', {
            method: 'DELETE',
            credentials: 'include'
          });
          if (response.ok) {
            this.posts = [];
          }
        } catch (error) {
          console.error('Error deleting all posts:', error);
        }
      }
    }
  },
  created() {
    this.fetchPosts();
  }
};
</script>
  

<style>
.controls {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.controls button {
  background-color: #4CAF50; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em; 
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.controls button:hover {
  background-color: #a82f2f; 
  transform: scale(1.05); 
}

.controls button:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  transform: scale(1); 
}

.post:hover {
  transform: scale(1.05);
}

.like-button {
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

</style>