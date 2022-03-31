<template>
  <div>
    <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="rounded" /><br />
    Title : {{ blog.title }} <br />
    Description : {{ blog.description }}<br />
    <hr style="width: 250px" />
    <router-link :to="'/blog/' + blog.id">{{ blog.id }}</router-link>
  </div>
</template>

<style>
img {
  max-width: 200px;
  max-height: 200px;
}
</style>

<script>
// Ini Display Blog Nya...
// Tinggal Menyesuaikan Aja... :3.
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  props: ["blog"],
};
</script>
