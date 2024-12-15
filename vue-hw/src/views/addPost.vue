<template>
  <Header />
  <section class="addPost-box">
    <div class="addPost-postBody">
      <p>Post body</p>
      <input
          v-model="postBody"
          type="text"
          placeholder="Write your post here"
      />
    </div>
    <button type="button" @click="createPost">Create post</button>
  </section>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "AddPost",
  components: { Footer, Header },
  data() {
    return {
      postBody: "",
    };
  },
  methods: {
    async createPost() {
      try {
        const response = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            body: this.postBody,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(`Error: ${error.error}`);
          return;
        }

        const result = await response.json();
        alert("Post created successfully!");
        this.postBody = "";
      } catch (error) {
        console.error("Failed to create post:", error);
        alert("An error occurred while creating the post.");
      }
    },
  },
};
</script>

<style scoped>
.addPost-box {
  margin: 20vh auto;
  width: 33%;
  height: 80%;
  display: flex;
  flex-direction: column;
  background-color: gray;
  border-radius: 15px;
  padding: 2em;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.addPost-box div ~ button {
  background-color: navy;
  border: none;
  color: white;
  padding: 1vh 1vh;
  text-align: center;
  cursor: pointer;
  font-size: 3vh;
}

.addPost-postBody {
  display: flex;
  flex-direction: row;
  padding: 4vh;
}

.addPost-postBody p {
  color: white;
  display: flex;
  font-size: 3vh;
}


.addPost-selectFile p {
  color: white;
  vertical-align: middle;
  margin-bottom: 0;
  font-size: 3vh;
  margin: 3vh;
}

.addPost-postBody input {
  width: 100%;
  height: 150px;
  border: solid 1px darkgray;
  padding: 1vh 1vh;
  font-size: 3vh;
}

.addPost-selectFile p + button {
  background-color: darkgray;
  border: solid 1px black;
  color: white;
  padding: 1vh 1vh;
  text-align: center;
  cursor: pointer;
  font-size: 3vh;
}
</style>
