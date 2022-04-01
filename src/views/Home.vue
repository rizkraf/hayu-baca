<template>
  <b-container>
    <div class="p-2 mb-5">
      <h1>Selamat Membaca di <span>HayuBaca!</span></h1>
      <h3><span>HayuBaca!</span> merupakan platform digital yang menampung para penjelajah internet untuk bertukar dan
        berbagi informasi menarik seputar dunia secara gratis!</h3><br>
      <div>
        <h5>Bergabunglah bersama kami untuk mendaptakan berita terpercaya dan terbaru.</h5>
        <b-button v-if="guest" pill variant="success" to="/signup">Daftar <b-icon icon="arrow-right-circle"></b-icon>
        </b-button>
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
          :text="`${blog.description.substring(0, 100)} ...`"
          :img-src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'">
            <b-link class="stretched-link" :to="'/blog/'+blog.id"></b-link>
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
import DisplayBlogVue from '../components/DisplayBlog.vue'

export default {
  data: () => ({
    apiDomain : 'https://demo-api-vue.sanbercloud.com',
    blogs : [],
    guest: true,
    slide: 0,
    sliding: null
  }),

  components : {
    // Ini Tempat Untuk Memanggil Components...
    // eslint-disable-next-line vue/no-unused-components
    'display-blog' : DisplayBlogVue
  },

  methods : {

    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },

    // Method Go() Ini Tuh Untuk Mengambil Blog Random
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
    // Ketika Di Buat... Panggil Fungsi Go()
    this.go()
  }
}
</script>
