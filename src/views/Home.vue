<template>
  <b-container>
    <div class="p-2 mb-5">
      <h1>Selamat Membaca di <span>HayuBaca!</span></h1>
      <h3><span>HayuBaca!</span> merupakan platform digital yang menampung para penjelajah internet untuk bertukar dan
        berbagi informasi menarik seputar dunia secara gratis!</h3><br>
      <div>
      <div v-if="guest">
        <h5>Bergabunglah bersama kami untuk mendaptakan berita terpercaya dan terbaru.</h5>
        <router-link to="/signup" custom v-slot="{ navigate }">
          <b-button pill variant="success" @click="navigate" @keypress.enter="navigate" role="link">
            Daftar <b-icon icon="arrow-right-circle"></b-icon>
          </b-button>
        </router-link>
      </div>
      </div>
    </div>
    <b-row class="d-flex justify-content-center">
      <b-col col lg="8">
        <b-carousel id="carousel-fade" 
        fade 
        indicators 
        controls 
        style="text-shadow: 1px 1px 2px #000; margin: auto;" 
        @sliding-start="onSlideStart" 
        @sliding-end="onSlideEnd">
          <b-carousel-slide v-for="blog in blogs" 
          :key="`blog-` + blog.id" 
          :blog="blog" 
          :caption="blog.title"
          :text="blog.description.length > 100 ? blog.description.substring(0, 100) + '...' : blog.description"
          :img-src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'">
            <router-link :to="'/blog/'+blog.id" custom v-slot="{ navigate }">
              <b-link class="stretched-link" @click="navigate" @keypress.enter="navigate" role="link"></b-link>
            </router-link>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
  span {
    font-weight: 900;
    text-shadow: 1px 1px 2px #333;
  }
</style>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";

export default {
  data: () => ({
    apiDomain : 'https://demo-api-vue.sanbercloud.com',
    blogs : [],
    slide: 0,
    sliding: null
  }),

  computed : {
    ...mapGetters({
      alertText : 'alert/text',
      guest : 'auth/guest'
    })
  },

  methods : {

    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    toast(text, append = false) {
        this.$bvToast.toast(text, {
            title: 'Notifikasi',
            toaster: 'b-toaster-top-center',
            solid: true,
            appendToast: append
        })
    },
    ...mapActions({
      setText: "alert/setText"
    }),
    // Method Go() Ini untuk memanggil blog random yang akan ditampilkan di carousel
    go() {
      const config = {
        method : 'get',
        url : this.apiDomain + '/api/v2/blog/random/4'
      }
      this.axios(config)
        .then(response => {
          let { blogs } = response.data
          this.blogs = blogs
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  created() {
    // Ketika Di Buat Panggil Fungsi Go()
    this.go()
    if (this.alertText.length > 0) {
      this.toast(this.alertText)
      this.setText('');
    }
  }
}
</script>
