<template>
  <v-app>
    <Navbar></Navbar>
    <v-content style="height: 90vh;">
      <router-view :key="$route.fullPath" style="height: 100%"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: 'App',
  data: () => ({
    
  }),
  created() {
    var _this = this;
    onAuthStateChanged(_this.$auth, (user) => {
      if (user && !_this.$store.state.loginLock) {
        console.log('user logged in:' + user.uid);
        _this.$store.state.showNavbar = true;

        //sync user's loops to store
        if (_this.$store.state.loopsUnsubscribe != null)
        {
          _this.$store.state.loopsUnsubscribe();
        }
        _this.$store.state.loopsLoading = true;
        const loopsq = query(collection(_this.$db, "loops"), where("user", "==", user.uid));
        _this.$store.state.loopsUnsubscribe = onSnapshot(loopsq, (snapshot) => {
          _this.$store.state.loops = [];
          snapshot.forEach(function(doc) {
            var ws_data = doc.data();
            ws_data.id = doc.id;
            _this.$store.state.loops.push(ws_data);
          });
          _this.$store.state.loopsLoading = false;

          if (_this.$route.name == 'login' || _this.$route.name == 'signup')
          {
            console.log('leaving login/signup page');
            if (_this.$route.query.redirect != null)
            {
              console.log('pushing to redirect: ' + _this.$route.query.redirect);
              _this.$router.push({ path: _this.$route.query.redirect});
            }
            else
            {
              console.log('pushing to home');
              _this.$router.push({ path: '/'});
            }
          }
        });

      } else {
        _this.showNavbar = false;
        _this.$store.state.userData = {};
        _this.$store.state.loops = [];
      }
    });
    
  },
  watch: {
  '$route':  {
      handler: function(value, from) {
        var _this = this;
        if (from != null)
        {
          console.log('route changed from ' + from.name + " to " + value.name);
        }
        else
        {
          console.log('route started at ' + value.name);
        }
     
        if (_this.$auth.currentUser == null && value.name != 'login' && value.name != 'signup')
        {
          if (_this.$route.query.redirect != null)
          {
            _this.$router.push({ path: "/login", query: {redirect: _this.$route.query.redirect} });
          }
          else
          {
            _this.$router.push({ path: "/login", query: {redirect: _this.$route.path} });
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
};
</script>
