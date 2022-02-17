<template>
  <v-app>
    <Navbar></Navbar>
    <v-content style="height: 90vh;">
      <router-view :key="$route.fullPath" style="height: 100%"></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    
  }),
};
</script>
