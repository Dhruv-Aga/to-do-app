/* 
 * Empty Page Template for Home Design
 */
<template>
  <v-card flat max-width="100%" class="px-8" centered>
  </v-card>
</template>
<script>

export default {
  name: 'Home',
  data: () => {
    return {}
  },
  computed: {
    baseImageURL: function () {
      return this.$store.state.baseImageURL
    }
  }
}
</script>
