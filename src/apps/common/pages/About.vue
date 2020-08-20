/* 
 * Empty Page Template for About Page Design
 */
 <template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-info
      </v-icon>
      <span class="title font-weight-light">About</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'About',
    data: () => ({
      //
    }),
  }
</script>
