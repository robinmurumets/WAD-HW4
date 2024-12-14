<template>
    <div>
      <Header />
      <section class="feed">
        <div class="controls">
          <button @click="resetLikes">Reset All Likes</button>
        </div>
        <div v-for="post in posts" :key="post.id" class="post">
          <UserPost :post="post" @like="likePost" />
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
    components: { Header, Footer, UserPost },
    data() {
      return {
        posts: [],
      };
    },
    methods: {
      fetchPosts() {
        this.posts = this.$store.state.posts;
      },
      resetLikes() {
        this.$store.dispatch('resetLikes');
        this.fetchPosts();
      },
      likePost(postId) {
        
        this.$store.dispatch('likePost', postId);
        this.fetchPosts();
      },
    },
    created() {
      this.fetchPosts();
    },
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
  background-color: #45a049; 
  transform: scale(1.05); 
}

.controls button:active {
  background-color: #388E3C; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  transform: scale(1); 
}

</style>