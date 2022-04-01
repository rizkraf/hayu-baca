<template>
  <div class="home">
    <div class="p-2 mb-5">
      <h1>Selamat Membaca di <span>HayuBaca!</span></h1>
      <h3><span>HayuBaca!</span> merupakan platform digital yang menampung para penjelajah internet untuk bertukar dan berbagi informasi menarik seputar dunia secara gratis!</h3><br>
      <h5>Bergabunglah bersama kami untuk mendaptakan berita terpercaya dan terbaru.</h5>
      <b-button pill variant="success" href="#signup.vue">Mendaftar <b-icon icon="arrow-right-circle"></b-icon></b-button>
    </div>
    <div>
    <b-carousel

      style="text-shadow: 1px 1px 2px #333; width: 800px; margin: auto;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
      v-for="blog in blogs"
      :key="`blog-` + blog.id"
      :blog="blog"
      :caption="blog.title"
      :text="blog.description "
      :img-src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'"
      ></b-carousel-slide>
    </b-carousel>
  </div>

  </div>
</template>

<style>
  span {
    font-weight: 900;
    text-shadow: 1px 1px 2px #333;
  }
  h3{
    margin: 10px 250px;
  }
</style>

<script>
import DisplayBlogVue from '../components/DisplayBlog.vue'

export default {
  data: () => ({
    apiDomain : 'https://demo-api-vue.sanbercloud.com',
    blogs : [],
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
