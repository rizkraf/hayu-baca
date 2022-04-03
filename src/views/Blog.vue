<template>
  <div v-if="blog.id" class="contentBlog pb-5 pr-5 pl-5">
    <router-link to="/blogs">
      <b-link class="mb-2">
        <h4 style="text-decoration: underline">Kembali</h4>
      </b-link>
    </router-link>
    <div class="blogContainer">
      <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="mb-3" /><br />
      <h2 v-text="blog.title" class="mb-2"></h2>
      <h5 v-text="blog.description"></h5>
    </div>
  </div>
</template>
<!-- ini styling untuk Blog. -->
<style>
.blogContainer {
  margin: 0px auto;
  max-width: 700px;
  min-width: 300px;
  padding: 20px;
  border-radius: 50px;
  background-color: #fff;
  opacity: 0.9;
  box-shadow: 25px 25px 50px #cccccc, -25px -25px 50px #ffffff;
}
img {
  margin-bottom: 20px;
  max-width: 600px;
  max-height: 350px;
  border-radius: 60px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 10px 10px;
}
td {
  text-align: left;
}
</style>

<script>
// Untuk mengambil blog yang ingin ditampilkan/diambil.
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blog: {},
  }),

  methods: {
    go() {
      let { id } = this.$route.params;

      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog/${id}`,
      };

      this.axios(config)
        .then((response) => {
          let { blog } = response.data;
          this.blog = blog;
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
