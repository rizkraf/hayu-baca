<template>
  <div class="loginDiv">
    <div class="loginContainer">
      <table>
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
          <td></td>
          <td><input type="checkbox" v-model="showpassword" /></td>
          <td>Lihat Kata Sandi</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <b-button pill variant="success" v-on:click="submit">Masuk <b-icon icon="arrow-right-circle"></b-icon></b-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<!-- ini styling untuk Login. -->
<style>
table {
  margin: 25px auto;
}
td {
  padding-top: 10px;
}
.loginDiv {
  margin: 25px auto;
  padding: 100px 25px;
  height: 70vh;
}
.loginContainer {
    margin: 0px auto;
  max-width: 700px;
  min-width: 300px;
  padding: 20px;
  border-radius: 50px;
  background-color: #fff;
  opacity: 0.8;
  box-shadow: 25px 25px 50px #cccccc, -25px -25px 50px #ffffff;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    email: "mubarok.iqbal@gmail.com",
    password: "sanbercode",
    showpassword: false,
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),

  methods: {
    ...mapActions({
      setToken: "auth/setToken",
    }),
    submit() {
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