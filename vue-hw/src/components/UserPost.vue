<template>
  <div class="post" @click="viewPost">
    <div class="post-header">
      <img :src="post.profileImage" alt="Profile" width="50" height="50" />
    
      <div class="post-info">
        <div class="author">
          <p>{{ post.user }}</p>
        </div>
        <p class="post-date">{{ post.post_date }}</p>
      </div>
    </div>

    <p class="post-text">{{ post.body }}</p>
    <button @click.stop="handleLike" class="like-button">
      ❤️ <span>{{ post.likes }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserPost',
  props: ['post'],
  methods: {
    viewPost() {
      this.$router.push(`/post/${this.post.id}`);
    },
    handleLike() {
      this.$emit('like', this.post.id);
    },
  },
};
</script>


<style>
.like-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: white;
  padding: 5px 10px;
  transition: transform 0.2s;
}

.like-button:hover {
  transform: scale(1.1);
}

.like-button span {
  color: white;
  margin-left: 5px;
}
</style>