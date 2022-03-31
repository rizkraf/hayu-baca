<template>
    <div v-if="blog.id">
        <img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'"><br>
        Title : {{ blog.title }} <br>
        Description : {{ blog.description }}<hr>
    </div>
</template>

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