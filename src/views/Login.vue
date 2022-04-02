<template>
    <div class="loginContainer">
    <table>
        <tr>
            <td><h5><b-icon icon="envelope"></b-icon> Email</h5></td>
            <td><h5> : </h5></td>
            <td><input v-model="email" type="email" required></td>
        </tr>
        <tr>
            <td><h5><b-icon icon="file-lock"></b-icon> Kata Sandi</h5></td>
            <td><h5> : </h5></td>
            <td><input v-model="password" :type="showpassword ? 'text' : 'password'"></td>
            <td></td>
            <td><input type="checkbox" v-model="showpassword"></td>
            <td>Lihat Kata Sandi</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td><b-button pill variant="success" v-on:click="submit">Masuk <b-icon icon="arrow-right-circle"></b-icon></b-button></td>
        </tr>
    </table>
    </div>
</template>

<style>
table {
    margin: 25px auto;
}
.loginContainer {
     padding-bottom: 220px;
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
data: () => ({
        // Email Dan Passwordnya Dah Di Isi Untuk Mempermudahkan Mengecek...
        // Nanti Kosongin Aja... :3.
        email : 'mubarok.iqbal@gmail.com',
        password : 'sanbercode',
        showpassword : false,
        apiDomain : 'https://demo-api-vue.sanbercloud.com'
    }),

    methods : {
        ...mapActions({
            setToken : 'auth/setToken'
        }),
        submit() {
            const config = {
                method : 'post',
                url : this.apiDomain + '/api/v2/auth/login',
                data : {
                    'email' : this.email,
                    'password' : this.password
                }
            }

            this.axios(config)
                .then( (response) => {
                    this.setToken(response.data.access_token)
                    this.$router.push("/")
                    alert("Berhasil Login")
                })
                .catch( (response) => {
                    console.log(response)
                    alert("Gagal Login")
                })
        }
    }
}
</script>