<template>    
        <header>
            <nav>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/addPost">Add Post</router-link></li>
                    <li><router-link to="/signup">Sign up</router-link></li>
                </ul>
                <div class="profile-button">
                    <button type="button" @click="dropdown">
                        <img src="/res/images/Default_Profile.png" width="60px" height="60px" alt="Profile">
                    </button>
                </div>
            </nav>
        </header>    
</template>

<script>
export default {
    name: 'Header',
};
</script>

  