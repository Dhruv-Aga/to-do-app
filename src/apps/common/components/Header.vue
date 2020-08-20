<template>
  <!-- Creating App Bar -->
  <v-app-bar app>
    <div class="d-flex">
      <v-img
        alt="To Do"
        contain
        max-height="100"
        src="https://cdn2.iconfinder.com/data/icons/metro-ui-dock/512/Google_Tasks.png"
        max-width="50"
      ></v-img>
    </div>

    <!-- App Bar Title -->
    <v-toolbar-title class="pl-10">To-Do</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- App Bar Profile Detail Menu -->
    <v-menu bottom right>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item>
          <v-list-item-content>
            <!-- Profile details -->
            <v-list-item-title v-if="!loggedIn" class="headline mb-1">{{ loggedDetails.userId }}</v-list-item-title>
            <v-list-item-title v-if="loggedIn" class="headline mb-1">{{ loggedDetails.user }}</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar color="primary" size="80"> NU </v-list-item-avatar>
        </v-list-item>

        <!-- Login and logout btn -->
        <v-card-actions>
          <v-btn color="accent" v-if="!loggedIn" :to="{ name: 'login' }">
            <span class="mr-2">Login</span>
          </v-btn>
          <v-btn color="accent" v-if="loggedIn" @click="logout">
            <span class="mr-2">Logout</span>
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-menu>
  </v-app-bar>
</template>
<script>

export default {
  name: 'Header',
  computed: {
    loggedIn: function () {
      return this.$store.state.loggedIn
    },
    loggedDetails: function () {
      return this.$store.state
    },
    baseImageURL: function () {
      return this.$store.state.baseImageURL
    }
  },
  methods: {
    logout: async function () {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
