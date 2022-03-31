<template>
    <div>
        E-mail : <input v-model="email" type="email" required><br>
        Password : <input v-model="password" :type="showpassword ? 'text' : 'password'"><br>
        Show Password <input type="checkbox" v-model="showpassword"><br>
        <button v-on:click="submit">Login</button><br>
        Note : Usahakan Sehabis Klik Login... Balik Ke Home...
    </div>
</template>

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