<template>
  <b-col lg="6" class="d-flex justify-content-center mb-5">
  <b-card
  :title="blog.title"
  :img-src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'"
  img-alt="Thumbnail"
  img-top
  tag="article"
  class="mb-2"
  style="box-shadow: 7px 5px; width: 24rem; border-radius: 60px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px; transition: 0.2s;"> 
    <router-link :to="'/blog/' + blog.id" custom v-slot="{ navigate }">
      <b-link class="stretched-link" @click="navigate" @keypress.enter="navigate" role="link"></b-link>
    </router-link>
  </b-card>
  </b-col>
</template>

<!-- ini styling untuk DisplayBlog. -->
<style>
.card:hover {
  transform: translate(5px, 5px);
  transition: 0.2s;
}

.card-img, .card-img-top {
  max-width: 24rem;
  max-height: 200px;
  object-fit: cover;
  border-radius: 60px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 0;
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
