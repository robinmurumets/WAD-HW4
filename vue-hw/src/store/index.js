import { createStore } from 'vuex';
import posts from '../assets/objects.json';

export default createStore({
  state: {
    posts: posts.map((post, index) => ({ ...post, id: index + 1, likes: 0 })),
  },
  mutations: {
    likePost(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.likes++;
      }
    },
    resetLikes(state) {
      state.posts.forEach(post => (post.likes = 0));
    },
  },
  actions: {
    likePost({ commit }, postId) {
      commit('likePost', postId);
    },
    resetLikes({ commit }) {
      commit('resetLikes');
    },
  },
  getters: {
    getAllPosts(state) {
      return state.posts;
    },
  },
});
