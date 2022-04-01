<template>
  <div id="app">
    <div id="nav">
      <div class="mb-5">
        <b-navbar toggleable="lg" type="light" variant="light">
          <b-navbar-brand href="#"><h2 class="title">HayuBaca!</h2></b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#" class="mr-2 mt-1"><router-link to="/"><b-icon icon="house-door-fill"></b-icon><h6> Beranda</h6></router-link></b-nav-item>
              <b-nav-item href="#" class="mr-2 mt-1"><router-link to="/blogs"><b-icon icon="file-earmark-fill"></b-icon><h6> Blogs</h6></router-link></b-nav-item>
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

      <div v-if="!guest">
      <img :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://www.gravatar.com/avatar/Guest?d=identicon&f=y'" style="width: 50px; height: 50px" /> | {{ user.name }}</div>
      <div v-if="guest"><img src="https://www.gravatar.com/avatar/Guest?d=identicon&f=y" style="width: 50px; height: 50px" /> | Pengguna Tamu</div>
      <span v-if="guest"><router-link to="/login">Masuk</router-link> | <router-link to="/signup">Mendaftar</router-link></span
      ><span v-else><button v-on:click="logout">Keluar</button></span>
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
  padding-Bottom: 50px;
  background-image: url("./assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
img {
  max-width: 350px;
  max-height: 350px;
border-radius: 60px;
border-top-left-radius: 10px;
border-bottom-right-radius: 10px;
}
.title {
  font-weight: bold;
text-shadow: 2px 2px 4px #333;
}
h6 {
  font-weight: bold;
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
