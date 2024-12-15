<template>
  <Header />
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
            class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
            class="form-input"
        />
      </div>
      <li><router-link to="/SignUp">Sign Up</router-link></li>
      <br>
      <button type="submit" class="login-button">Login</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Login",
  components: {Footer, Header},
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
          credentials: "include"
        });

        if (response.ok) {
          this.$router.push('/');
        }
      } catch (error) {
        console.error("Login error:", error);
        this.error = "An error occurred during login.";
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 10px;
}


li{
  display: flex;
  justify-content: center;
  list-style: none;
  text-decoration: none;
  width: 100%;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

li a{
  margin: 10px;
  font-size: 0.7em;
  display: flex;
  justify-content: center;
  list-style: none;
  text-decoration: none;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  background-color: #4caf50;
  border-radius: 4px;
}

li:hover {
  background-color: #45a049;
}
</style>
