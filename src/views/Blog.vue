<template>
  <div v-if="blog.id" class="contentBlog p-5">
    <div class="blogContainer">
    <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="mb-3"/><br />
    
          <table style="margin: 0 auto">
      <tr>
        <td><h3>Judul</h3></td>
        <td><h3>:</h3></td>
        <td>
          <h3>{{ blog.title }}</h3>
        </td>
      </tr>
      <tr>
        <td><h3>Deskripsi</h3></td>
        <td><h3>:</h3></td>
        <td>
          <h3>{{ blog.description }}</h3>
        </td>
      </tr>
      <tr></tr>
    </table>
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
  max-width: 350px;
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
