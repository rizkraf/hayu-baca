<template>
  <div id="app">
    <b-container fluid>
      <div id="nav">
        <div class="mb-5">
          <b-navbar toggleable="sm" type="light" variant="transparent">
            <b-navbar-brand href="#">
              <h2 class="title">HayuBaca!</h2>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item href="#" class="mr-2 mt-1">
                  <router-link to="/">
                    <b-icon icon="house-door-fill"></b-icon>
                    <h6>Beranda</h6>
                  </router-link>
                </b-nav-item>
                <b-nav-item href="#" class="mr-2 mt-1">
                  <router-link to="/blogs">
                    <b-icon icon="file-earmark-fill"></b-icon>
                    <h6>Artikel</h6>
                  </router-link>
                </b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <div class="d-flex align-items-center">
                  <b-nav-item to="/login" v-if="guest">Masuk</b-nav-item>
                  <b-nav-item-dropdown right v-if="!guest">
                    <template #button-content>
                      <em>
                        <b-avatar
                          :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://www.gravatar.com/avatar/Guest?d=identicon&f=y'">
                        </b-avatar> | {{ user.name }}
                      </em>
                    </template>
                    <b-dropdown-item to="/post">Kelola Artikel</b-dropdown-item>
                    <b-dropdown-item @click="logout">Keluar</b-dropdown-item>
                  </b-nav-item-dropdown>
                </div>

              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </div>
    </b-container>

    <router-view />
  </div>
</template>


<!-- Ini styling untuk App. -->
<style>
#app {
  font-family: "times new roman";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 50px;
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
          if (this.$route.path != '/') {
            this.$router.push("/")
        }
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
