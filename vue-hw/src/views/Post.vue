<template>
    <div class="post-page">
        <Header />
        <div v-if="post" class="post-details">
            <div class="post-info">
                <p>{{ post.author }}</p>
                <p>{{ post.username }}</p>
                <p>{{ post.body }}</p>
                <textarea v-if="isEditing" v-model="editedText" class="edit-text"></textarea>
            </div>
            <div>
                <button v-if="!isEditing" @click="startEdit" class="update-btn">Update</button>
                <button v-else @click="saveUpdate" class="save-btn">Save</button>
                <button class="delete-btn" @click="deletePost">Delete</button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
    name: 'Post',
    components: { Header, Footer },
    data() {
        return {
            post: null,
            isEditing: false,
            editedText: ''
        }
    },
    methods: {
        async fetchPost() {
            const postId = this.$route.params.id;
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                credentials: 'include'
            });
            this.post = await response.json();
        },
        startEdit() {
            this.isEditing = true;
            this.editedText = this.post.body;
        },
        async saveUpdate() {
            await fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ body: this.editedText })
            });
            this.post.body = this.editedText;
            this.isEditing = false;
        },
        async deletePost() {
            if (confirm('Delete this post?')) {
                await fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                this.$router.push('/');
            }
        }
    },
    created() {
        this.fetchPost();
    }
};
</script>

<style scoped>
.post-page {
    height: 100%;
    min-height: 100vh;
    background: black;
    padding: 20px;
}

.post-details {
    max-width: 800px;
    margin: 20px auto;
    background: #1d1d1d;
    border-radius: 8px;
    padding: 20px;
}

.post-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.update-btn, .save-btn {
    background: #4a90e2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.delete-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.edit-text {
    width: 100%;
    min-height: 100px;
    margin: 10px 0;
    padding: 10px;
    border-radius: 4px;
}
</style>