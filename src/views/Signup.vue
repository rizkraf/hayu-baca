<template>
    <div>
        Nama : <input v-model="name" type="text"><br>
        E-mail : <input v-model="email" type="email" required><br>
        Password : <input v-model="password" :type="showpassword ? 'text' : 'password'"> | 
        Show Password <input type="checkbox" v-model="showpassword"><br>
        Fotonya : <input type="file" name="photo" ref="photo"><br>
        <button>Login</button><br>
        Note : Usahakan Sehabis Klik Login... Balik Ke Home...
    </div>
</template>

<script>
import { mapActions } from 'vuex'

// Oh Iya... Coba Ketika Habis Sign Up Dan Berhasil Jalanin Method login()...
// Kalau Berhasil Pergi Ke Home...

export default {
data: () => ({
        // Nama, Email Dan Passwordnya Dah Di Isi Untuk Mempermudahkan Mengecek...
        // Nanti Kosongin Aja... :3.
        name : 'Rizky',
        email : 'rizky@gmail.com',
        password : 'sanbercode',
        showpassword : false,
        apiDomain : 'https://demo-api-vue.sanbercloud.com'
    }),

    methods : {
        ...mapActions({
            setToken : 'auth/setToken'
        }),
        login() {
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