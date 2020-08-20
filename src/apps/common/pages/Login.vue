/* 
 * Login / Sign-Up Page 
*/
<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <!-- Tabs List -->
            <v-tabs
              v-model="tab"
              background-color="primary"
              centered
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1">
                Login
                <v-icon>mdi-login</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Sign Up
                <v-icon>mdi-newspaper-variant-outline</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item :key="1" :value="'tab-1'">
                <v-card class="elevation-12">
                  <v-card-text>
                    <!-- Login Form  -->
                    <v-form>
                      <v-text-field
                        label="email"
                        name="email"
                        type="email"
                        v-model="email"
                      >
                      </v-text-field>
                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        v-model="password"
                      >
                      </v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="primary"  @click.native.prevent="login">
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
              
              <v-tab-item :key="2" :value="'tab-2'">
                <v-card class="elevation-12">
                  <v-card-text>
                    <!-- Sign Up Form  -->
                    <v-form>
                      <v-text-field
                        label="Name"
                        name="name"
                        type="name"
                        v-model="name"
                      >
                      </v-text-field>
                      <v-text-field
                        label="E-mail"
                        name="email"
                        type="email"
                        v-model="email"
                      >
                      </v-text-field>
                      <v-text-field
                        id="mobile"
                        label="Mobile No"
                        name="mobile"
                        type="mobile"
                        v-model="mobile"
                      >
                      </v-text-field>
                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        v-model="password"
                      >
                      </v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="primary" @click.native.prevent="signup">
                      Sign Up
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
// Importing APIs
import AUTH_API from './../store/auth.store.js';

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      mobile: null,
      name: '',
      tab: 1
    }
  },
  methods: {
    async login () {
      var data = {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      }

      // Login API call 
      var res = await AUTH_API.login_api(data)
      
      // If user is valid move to dashboard 
      if (!res.error) this.$router.push('dashboard')
    },

    async signup () {
      var data = {
        name: this.name,
        email: this.email,
        password: this.password,
        mobile: this.mobile,
        returnSecureToken: true
      }

      // Signup API call 
      var res = await AUTH_API.signup_api(data)

      // If user is valid move to dashboard 
      if (!res.error) {
        this.$router.push('dashboard')
      }
    }
  }
}
</script>
