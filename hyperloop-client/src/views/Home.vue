<template>
  <v-container>
    <v-row>
      <v-col cols="12">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
  },
  computed: {
    openItems() {
      return this.$store.state.openItems;
    }
  },
  data() {
    return {

    }
  }
}
</script>
