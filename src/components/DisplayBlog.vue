<template>
  <div>
    <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="mb-1" style="box-shadow: 10px 10px" /><br />
    <table class="d-flex justify-content-center mb-0">
      <tr>
        <td><h4>Judul</h4></td>
        <td><h4>:</h4></td>
        <td><h4>{{ blog.title}}</h4></td>
      </tr>
    </table>
    <router-link :to="'/blog/' + blog.id"><h5>Selengkapnya...</h5></router-link>
    <hr />
  </div>
</template>

<!-- ini styling untuk DisplayBlog. -->
<style>
td {
  margin: 0px auto;
}
img {
  max-width: 350px;
  max-height: 350px;
  border-radius: 60px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 5px 5px;
}
hr {
  width: 500px;
}
</style>

<script>
// Ini Display Blog.
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  props: ["blog"],
};
</script>
