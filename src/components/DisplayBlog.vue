<template>

    <div>
      <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'"><br>
      Title : {{ blog.title }} <br>
      Description : {{ blog.description }}<br>
      <router-link :to="'/blog/'+blog.id">{{ blog.id }}</router-link><hr>
    </div>

</template>

<script>
// Ini Display Blog Nya...
// Tinggal Menyesuaikan Aja... :3.
export default {
    data: () => ({
        apiDomain : 'https://demo-api-vue.sanbercloud.com'
    }),
    props : ['blog']
}
</script>