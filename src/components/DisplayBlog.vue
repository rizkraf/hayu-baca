<template>
  <div>
    <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="mb-3" style="box-shadow: 10px 10px" /><br />
    <table style="margin: 0 auto">
      <tr>
        <td><h5>Judul</h5></td>
        <td><h5>:</h5></td>
        <td>
          <h5>{{ blog.title }}</h5>
        </td>
      </tr>
      <tr>
        <td><h5>Deskripsi</h5></td>
        <td><h5>:</h5></td>
        <td>
          <h5>{{ blog.description }}</h5>
        </td>
      </tr>
      <tr>
        <td><h5>Nomor Artikel</h5></td>
        <td><h5>:</h5></td>
        <td>
          <h5>
            <router-link :to="'/blog/' + blog.id">{{ blog.id }}</router-link>
          </h5>
        </td>
      </tr>
    </table>
    <hr />
  </div>
</template>

<!-- ini styling untuk DisplayBlog. -->
<style>
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
td {
  text-align: left;
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
