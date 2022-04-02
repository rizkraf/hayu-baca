<template>
  <div>
    <P>Semua Artikel<b-icon icon="arrow-down-short"></b-icon></P>
    <hr />
    <display-blog v-for="blog in blogs" :key="`blog-` + blog.id" :blog="blog" style="margin: 25px auto; padding: 25px;"></display-blog>

    <div class="d-flex justify-content-center">
      <b-pagination v-model="page" @input="go" :total-rows="total" :per-page="perPage" pills size="sm"></b-pagination>
    </div>
  </div>
</template>

<script>
import DisplayBlogVue from "../components/DisplayBlog.vue";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
    page: 0,
    perPage: 0,
    total: 0,
  }),

  components: {
    // Component Untuk DisplayBlog nya, penggantiannya di component.
    "display-blog": DisplayBlogVue,
  },

  methods: {
    // Methods untuk pagination.
    keHalaman(id) {
      this.page = id;
      this.go();
    },

    // Ini Untuk Ambil data Blognya.
    go() {
      const config = {
        method: "get",
        url: this.apiDomain + "/api/v2/blog?page=" + this.page,
      };
      this.axios(config)
        .then((response) => {
          let { blogs } = response.data;
          this.blogs = blogs.data;
          this.page = blogs.current_page;
          this.perPage = blogs.per_page;
          this.total = blogs.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.go();
  },
};
</script>
