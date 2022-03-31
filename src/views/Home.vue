<template>
  <div class="home">
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
    blogs : []
  }),

  components : {
    // Ini Tempat Untuk Memanggil Components...
    'display-blog' : DisplayBlogVue
  },

  methods : {
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
