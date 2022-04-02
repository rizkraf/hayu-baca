<template>
  <div id="app">
    <b-container fluid>
      <div id="nav">
        <div class="mb-5">
          <b-navbar toggleable="sm" type="light" variant="transparent">
            <router-link to="/" custom v-slot="{ navigate }">
              <b-navbar-brand style="user-select: none;" @click="navigate" @keypress.enter="navigate" role="link">
                  <h2 class="title">HayuBaca!</h2>
              </b-navbar-brand>
            </router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <router-link to="/" custom v-slot="{ navigate }">
                  <b-nav-item class="mr-2 mt-1" @click="navigate" @keypress.enter="navigate" role="link">
                    <b-icon icon="house-door-fill"></b-icon>
                    <h6>Beranda</h6>
                  </b-nav-item>
                </router-link>
                <router-link to="/blogs" custom v-slot="{ navigate }">
                  <b-nav-item class="mr-2 mt-1" @click="navigate" @keypress.enter="navigate" role="link">
                    <b-icon icon="file-earmark-fill"></b-icon>
                    <h6>Artikel</h6>
                  </b-nav-item>
                </router-link>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <div class="d-flex align-items-center justify-content-center">
                  <b-nav-item v-if="guest">
                    <router-link to="/login" custom v-slot="{ navigate }">
                      <span @click="navigate" @keypress.enter="navigate" role="link">Masuk</span>
                    </router-link>
                  </b-nav-item>
                  <b-nav-item-dropdown right v-if="!guest">
                    <template #button-content>
                      <em> <b-avatar :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://www.gravatar.com/avatar/Guest?d=identicon&f=y'"> </b-avatar> | {{ user.name }} </em>
                    </template>
                    <router-link to="/post" custom v-slot="{ navigate }">
                      <b-dropdown-item @click="navigate" @keypress.enter="navigate" role="link">Kelola Artikel</b-dropdown-item>
                    </router-link>
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

    <div class="container mt-5">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <span>&copy; 2022 HayuBaca.id</span>
        </div>
      </footer>
    </div>
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
      alertText : 'alert/text'
    }),
  },
  methods: {
    toast(text, append = false) {
      this.$bvToast.toast(text, {
        title: 'Notifikasi',
        toaster: 'b-toaster-top-center',
        solid: true,
        appendToast: append
      })
    },
    logout() {
      let config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/logout",
        headers: {
          Authorization: "Bearer " + this.token
        },
      }
      
      this.axios(config)
        .then(() => {
          this.setToken("")
          this.setUser({})
          this.setGuest(true)
          if (this.$route.path != '/') {
            this.setText('Anda Berhasil Logout')
            this.$router.push("/")
          } else {
            this.toast('Anda Berhasil logout.')
          }
        })
        .catch(() => {
          this.toast('Anda Gagal logout.')
        });
    },
    ...mapActions({
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
      setText: "alert/setText",
      setGuest: "auth/setGuest"
    }),
  },
  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
  },
};
</script>
