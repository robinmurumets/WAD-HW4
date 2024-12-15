<template>    
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/add-post">Add Post</router-link></li>
                <li><router-link to="/contacts">Contact us</router-link></li>
                <li v-if="!isAuthenticated"><router-link to="/Login">Log In</router-link></li>
            </ul>
            <div v-if="isAuthenticated" class="profile-button">
                <button type="button" @click="toggleDropdown">
                    <img src="/res/images/Default_Profile.png" width="60px" height="60px" alt="Profile">
                </button>
                <div v-if="showDropdown" class="dropdown-menu">
                    <button class="dropdown-item">Account</button>
                    <button class="dropdown-item">Settings</button>
                    <div class="divider"></div>
                    <button class="dropdown-item logout" @click="logout">Logout</button>
                </div>
            </div>
        </nav>
    </header>    
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            showDropdown: false,
            isAuthenticated: false
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        async checkAuth() {
            try {
                const response = await fetch('http://localhost:3000/auth/authenticate', {
                    credentials: 'include'
                });
                const data = await response.json();
                this.isAuthenticated = data.authenticated;
            } catch (error) {
                this.isAuthenticated = false;
            }
        },
        async logout() {
            await fetch('http://localhost:3000/auth/logout', {
                credentials: 'include'
            });
            this.isAuthenticated = false;
            this.$router.push('/signup');
        }
    },
    mounted() {
        this.checkAuth();
    }
};
</script>

<style scoped>
.profile-button {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    right: 0;
    top: 100%;
    width: 200px;
    background: #2c2c2c;
    border-radius: 8px;
    padding: 8px 0;
    margin-top: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: 12px 16px;
    color: #ffffff;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
}

.dropdown-item:hover {
    background: #3c3c3c;
}

.divider {
    height: 1px;
    background: #404040;
    margin: 8px 0;
}

.logout {
    color: #ff4444;
}

.logout:hover {
    background: #3c3c3c;
    color: #ff6666;
}
</style>