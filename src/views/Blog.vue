<template>
    <div v-if="blog.id" class="contentBlog p-5">
        <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="rounded"><br>
        <tabel border="1">
            <tr>
                <td><h3>Title</h3></td>
                <td><h3>:</h3></td>
                <td><h3>{{ blog.title }}</h3></td>
            </tr>
            <tr>
                <td><h3>Description</h3></td>
                <td><h3>:</h3></td>
                <td><h3>{{ blog.description }}</h3></td>
            </tr>
            <tr>
            </tr>
        </tabel>
    </div>
</template>

<style>
    img {
        margin-bottom: 20px;
        max-width: 350px;
        max-height: 350px;
    }
</style>

<script>
// Disini Cuma Ambil Blog Yang Ingin Di Ambil...
export default {
    data: () => ({
        apiDomain : 'https://demo-api-vue.sanbercloud.com',
        blog : {}
    }),

    methods : {
        go() {
            let { id } = this.$route.params

            const config = {
                method : 'get',
                url : `${this.apiDomain}/api/v2/blog/${id}`
            }

            this.axios(config)
            .then(response => {
                let { blog } = response.data
                this.blog = blog
            })
            .catch(error => {
                console.log(error)
            })
            }
    },

    created() {
        this.go()
    }
}
</script>