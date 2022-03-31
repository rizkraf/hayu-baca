<template>
  <div>
    <h1>All Blogs</h1>

    Ini Pagination. Nanti Ganti Aja. Buat Test Doang.<br>
    Sekarang Di Page {{ page }}<br>
    | <span v-for="n in lengthPage" :key="'page-'+n">
      <button v-on:click="keHalaman(n)">{{ n }}</button> |
    </span><br>
    Paginationnya Berhenti Sampai Sini...<hr>

    <display-blog
    v-for="blog in blogs"
    :key="`blog-` + blog.id"
    :blog="blog"
    ></display-blog>
    
  </div>
</template>

<script>
import DisplayBlogVue from '../components/DisplayBlog.vue'

export default {
  data: () => ({
    apiDomain : 'https://demo-api-vue.sanbercloud.com',
    blogs : [],
    page : 0,
    lengthPage : 0,
    perPage : 0
  }),

  components : {
    // Komponen Untuk Display Blognya... Nanti Ganti Nya Di Komponent...
    'display-blog' : DisplayBlogVue
  },

  methods : {
    // Method keHalaman(id) Ini Untuk Pagination... Karena Saya Belajarnya Pagination Vuetify...
    // Jadi Saya Buat Ini Untuk Paginationnya Sementara...
    // Nanti Mungkin Pas Styling Method Ini Kepakai... :3.
    keHalaman(id) {
      this.page = id
      // Set Dulu Page Berapa Trus Jalanin Ambil Blog Nya...
      this.go()
    },

    // Ini Untuk Ambil Blognya...
    go() {
      const config = {
        method : 'get',
        url : this.apiDomain + '/api/v2/blog?page=' + this.page
      }
      this.axios(config)
        .then(response => {
          let { blogs } = response.data
          this.blogs = blogs.data
          this.page = blogs.current_page
          this.lengthPage = blogs.last_page
          this.perPage = blogs.per_page
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  created() {
    this.go()
  }
}
</script>
