<template>
  <div class="page-container" >
    <Header />
    <div class="signup-container">
      <div class="signup-form-wrapper">
        <h2>Create an Account</h2>
        <form @submit.prevent="handleSubmit"> <!-- function that handles submit-->
          <div class="form-group">
            <p>Email</p>
            <input v-model="formData.email" type="email" required placeholder="Email">
            <p>Password</p>
            <input v-model="formData.password" type="password" required placeholder="Password">
            <p class="invalid-message" v-if="invalidMessage">{{invalidMessage}}</p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>

    <Footer />
  </div>
    
  </template>

  <script>

  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import UserPost from '../components/UserPost.vue';
  export default {

    name: 'SignUp',
    components: { Header, Footer },
    data() {
      return {
        formData: {
          email: '',
          password: ''
        },
        invalidMessage: "",
      }
    },
    methods: {
      validatePassword(password) {
        const conditions = [];
        conditions.push("The password is not valid")
        if (password.length < 8 || password.length >= 15) {
          conditions.push("- password must be 8 to 15 characters long");
        }
        if (!/[A-Z]/.test(password)) {
          conditions.push("- password must include at least one uppercase alphabet character");
        }
        if ((password.match(/[a-z]/g) || []).length < 2) {
          conditions.push("- password must include at least two lowercase alphabet characters");
        }
        if (!/[0-9]/.test(password)) {
          conditions.push("- password must include at least one numeric value");
        }
        if (!/^[A-Z]/.test(password)) {
          conditions.push("- password must start with an uppercase alphabet");
        }
        if (!/_/.test(password)) {
          conditions.push("- password must the character “_”");
        }
        return conditions;
      },

      handleSubmit() {
        const unmetConditions = this.validatePassword(this.formData.password)
        if (unmetConditions.length > 1) {
          this.invalidMessage = unmetConditions.join(" ");
        } else {
          this.$store.dispatch('signupUser', this.formData);
          this.$router.push('/');
        }
      }
    }
  }
  </script>

  <style scoped>

  

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

  .signup-container {
  flex: 1;
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 2rem;
  background: black;
    
  }

  .signup-form-wrapper {
    max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  p {
    display: block;
    margin-bottom: 0.5rem;
    color:darkslategray;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #357abd;
  }

  footer {
  background-color: #1d1d1d;
  color: white;
  text-align: center;
  padding: 10px;
  width: 100%;
}
  </style>