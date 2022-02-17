import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGen4QkyLZKZS-CE6RJRq52AstIp6doC4",
  authDomain: "hyperloop-prod.firebaseapp.com",
  projectId: "hyperloop-prod",
  storageBucket: "hyperloop-prod.appspot.com",
  messagingSenderId: "454083941185",
  appId: "1:454083941185:web:cd655739dc1e42c2e1c7c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

Vue.prototype.$db = getFirestore();
Vue.prototype.$auth = getAuth();

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
