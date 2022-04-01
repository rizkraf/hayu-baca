<template>
  <div v-if="blog.id" class="contentBlog p-5">
    <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="mb-3" style="box-shadow: 10px 10px"/><br />
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
</template>

<style>
img {
  margin-bottom: 20px;
  max-width: 350px;
  max-height: 350px;
border-radius: 60px;
border-top-left-radius: 10px;
border-bottom-right-radius: 10px;
}
</style>

<script>
// Disini Cuma Ambil Blog Yang Ingin Di Ambil...
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
