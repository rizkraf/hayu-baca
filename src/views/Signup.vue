<template>
  <div class="signupDiv">
    <div class="signupContainer">
      <table>
        <tr>
          <td>
            <h5><b-icon icon="person"></b-icon> Nama</h5>
          </td>
          <td><h5>:</h5></td>
          <td><input v-model="name" type="text" /></td>
        </tr>
        <tr>
          <td>
            <h5><b-icon icon="envelope"></b-icon> Email</h5>
          </td>
          <td><h5>:</h5></td>
          <td><input v-model="email" type="email" required /></td>
        </tr>
        <tr>
          <td>
            <h5><b-icon icon="file-lock"></b-icon> Kata Sandi</h5>
          </td>
          <td><h5>:</h5></td>
          <td><input v-model="password" :type="showpassword ? 'text' : 'password'" /></td>
          <td><input type="checkbox" v-model="showpassword" /></td>
          <td>Lihat Kata Sandi</td>
        </tr>
        <tr>
          <td>
            <h5><b-icon icon="person-bounding-box"></b-icon> Masukan Foto</h5>
          </td>
          <td><h5>:</h5></td>
          <td><input type="file" name="photo" ref="photo" /></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <b-button pill variant="success" v-on:click="register">Mendaftar <b-icon icon="check-square"></b-icon></b-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<!-- Ini styling untuk signup. -->
<style>
table {
  margin: 25px auto;
}
td {
  padding-top: 10px;
}
.signupDiv {
  margin: 25px auto;
  padding: 100px 25px;
  height: 70vh;
}
.signupContainer {
  margin: 0px auto;
  max-width: 700px;
  min-width: 300px;
  padding: 20px;
  border-radius: 50px;
  background-color: #fff;
  opacity: 0.8;
  box-shadow: 25px 25px 50px #cccccc, -25px -25px 50px #ffffff;
}
td {
  text-align: left;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    name: "Zidan",
    email: "zidan@gmail.com",
    password: "sanbercodezidan",
    showpassword: false,
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),

  methods: {
    ...mapActions({
      setToken: "auth/setToken",
    }),
    register() {
      let photo = this.$refs.photo.files[0];
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("name", this.name);
      formData.append("photo_profile", photo);

      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/register",
        data: formData,
      };

      this.axios(config)
        .then((response) => {
          response.message
          this.$router.push("/login")
        })
        .catch((response) => {
          console.log(response);
          alert("Gagal Register");
        });
    },
    login() {
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/login",
        data: {
          email: this.email,
          password: this.password,
        },
      };

      this.axios(config)
        .then((response) => {
          this.setToken(response.data.access_token);
          this.$router.push("/");
        })
        .catch((response) => {
          console.log(response);
          alert("Gagal Login");
        });
    },
  },
};
</script>
