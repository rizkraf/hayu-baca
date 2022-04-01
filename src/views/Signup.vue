<template>
  <div class="signupDiv">
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
</template>

<style>
table {
  margin: 25px auto;
}
.signupDiv {
  padding-bottom: 220px;
}
</style>

<script>
import { mapActions } from "vuex";

// Oh Iya... Coba Ketika Habis Sign Up Dan Berhasil Jalanin Method login()...
// Kalau Berhasil Pergi Ke Home...

export default {
  data: () => ({
    // Nama, Email Dan Passwordnya Dah Di Isi Untuk Mempermudahkan Mengecek...
    // Nanti Kosongin Aja... :3.
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
          alert(response.message);
          this.login();
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
          alert("Berhasil Login");
        })
        .catch((response) => {
          console.log(response);
          alert("Gagal Login");
        });
    },
  },
};
</script>
