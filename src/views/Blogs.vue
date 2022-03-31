<template>
  <div>
    <P>Semua Artikel<b-icon icon="arrow-down-short"></b-icon></P>
    <hr>
    <display-blog v-for="blog in blogs" :key="`blog-` + blog.id" :blog="blog"></display-blog>

    <div class="overflow-auto" v-for="n in lengthPage" :key="'page-' + n">
      <b-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="perPage" pills size="sm" v-on:click="keHalaman(n)">{{ n }}></b-pagination>
    </div>    
  </div>
</template>

<style>
.overflow-auto {
  width: 140px;
  margin: 0 auto;
}
</style>

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
