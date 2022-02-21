<template>
  <v-container>
    <v-row v-for="(item, i) in openItems" :key="i">
      <v-col cols="12">
        <ItemCard :item="item" @close="$store.commit('closeItem', item)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemCard from '../components/ItemCard'

export default {
  name: 'Home',
  components: {
    ItemCard
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
