import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignUp from '../views/SignUp.vue';
import LogIn from '../views/Login.vue';
import Contacts from '../views/Contacts.vue';
import AddPost from '../views/addPost.vue';
import PostDetails from '../views/Post.vue';
import auth from '../auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    beforeEnter: async (to, from, next) => {
      const authResult = await auth.authenticated();
      if (!authResult) {
        return next('/signup');
      }
      next();
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: async (to, from, next) => {
      const authResult = await auth.authenticated();
      if (!authResult) {
        return next('/signup');
      }
      next();
    }
  },
  {
    path: '/post/:id',
    name: 'PostDetails',
    component: PostDetails,
    beforeEnter: async (to, from, next) => {
      const authResult = await auth.authenticated();
      if (!authResult) {
        return next('/signup');
      }
      next();
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
