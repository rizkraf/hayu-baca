<template>
  <div id="app">
    <div id="nav">
      <div>
        <b-navbar toggleable="lg" type="light" variant="light">
          <b-navbar-brand href="#">HayuBaca!</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#"><router-link to="/">Home</router-link></b-nav-item>
              <b-nav-item href="#"><router-link to="/blogs">Blogs</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <div v-if="guest"><img src="https://www.gravatar.com/avatar/Guest?d=identicon&f=y" /> | User Guest</div>
      | <span v-if="guest"><router-link to="/login">Login</router-link> | <router-link to="/signup">Sign Up</router-link></span
      ><span v-else><button v-on:click="logout">Logout</button></span>
    </div>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "times new roman";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 180vh;
  background-color: #ecf0f1;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },
  methods: {
    logout() {
      let config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/logout",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };

      this.axios(config)
        .then(() => {
          this.setToken("");
          this.setUser({});
          //this.guest = true
        })
        .catch((response) => {
          console.log(response.data.error);
        });
    },
    ...mapActions({
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
    }),
  },
  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
  },
};
</script>
