<template>
  <div class="post">
    <div class="post-header">
      <img :src="post.profileImage" alt="Profile" width="50" height="50" />
      <div>
        <p><strong>{{ post.author }}</strong> {{ post.username }}</p>
        <p class="post-date">{{ post.date }}</p>
      </div>
    </div>
    <p class="post-text">{{ post.text }}</p>
    <img v-if="post.postImage" :src="post.postImage" alt="Post Image" class="post-image"/>
    <button @click="handleLike" class="like-button">❤️ <span>{{ post.likes }}</span></button>
  </div>
</template>

<script>
export default {
  name: 'UserPost',
  props: ['post'],
  methods: {
    handleLike() {
      this.$emit('like', this.post.id);
    },
  },
};
</script>


<style>
.like-button span {
  color: white;
}</style>