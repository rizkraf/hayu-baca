<template>
  <div id="app">
    <div id="nav">
      <div v-if="!guest">
        <img :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://www.gravatar.com/avatar/Guest?d=identicon&f=y'"> | {{ user.name }}
      </div>
      <div v-if="guest">
        <img src="https://www.gravatar.com/avatar/Guest?d=identicon&f=y"> | User Guest
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/blogs">Blogs</router-link> |
      <span v-if="guest"><router-link to="/login">Login</router-link> | <router-link to="/signup">Sign Up</router-link></span><span v-else><button v-on:click="logout">Logout</button></span>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
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
import { mapGetters, mapActions } from 'vuex'
export default {
  data : () => ({
    apiDomain : 'https://demo-api-vue.sanbercloud.com'
  }),
  computed : {
    ...mapGetters ({
      guest : 'auth/guest',
      user : 'auth/user',
      token : 'auth/token'
    })
  },
  methods : {
    logout() {
      let config = {
        method : 'post',
        url : this.apiDomain + '/api/v2/auth/logout',
        headers : {
          'Authorization' : 'Bearer ' + this.token
        }
      }

      this.axios(config)
        .then(() => {
          this.setToken('')
          this.setUser({})
          //this.guest = true
        })
        .catch((response) => {
          console.log(response.data.error)
        })
    },
    ...mapActions({
      setToken : 'auth/setToken',
      setUser : 'auth/setUser',
      checkToken : 'auth/checkToken'
    })
  },
  mounted(){
    if(this.token){
      this.checkToken(this.token)
    }
  }
}
</script>