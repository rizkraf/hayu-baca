<template>
    <!-- Tinggal di styling -->
    <b-container>
        <!-- Nanti munculnya cuman ketika udah login doang -->
        <b-form @submit.prevent="submitForm()">
            <label for="judul">Judul</label>
            <b-form-input 
            name="title"
            ref="title"
            :state="titleError"
            v-model="title"
            placeholder="Isi Judul" 
            :readonly="buttonStatus == 'upload'"
            id="judul"></b-form-input>

            <label for="deskripsi">Isi Artikel</label>
            <b-form-textarea
            id="textarea"
            v-model="description"
            ref="description"
            :state="descriptionError"
            placeholder="Isi ini..."
            rows="3"
            :readonly="buttonStatus == 'upload'"
            ></b-form-textarea>

            <div v-if="buttonStatus == 'submit'">
                <b-button type="submit" variant="success">Publish</b-button>
            </div>

            <div v-else-if="buttonStatus == 'update'">
                <b-button @click="updateBlog(idEditBlog)" variant="success">Button</b-button>
                <b-button @click="clearForm" variant="danger">Button</b-button>
            </div>

            <div v-else-if="buttonStatus == 'upload'">
                <b-form-file
                name="photo" ref="photo"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                ></b-form-file>
                <b-button @click="submitPhoto(idUploadBlog)" variant="success">Button</b-button>
                <b-button @click="clearForm" variant="danger">Button</b-button>
            </div>

        </b-form>

        <br><br>

        <table border=1>
            <tr v-for="blog of blogs" :key="`blog-` + blog.id">
                <td>
                    <img width=100 :src="blog.photo ? domain + blog.photo : 'https://dummyimage.com/16:9x1080'" alt="">
                </td>
                <td>
                    <b>Title : </b> {{ blog.title }} <br>
                    <b>Description : </b> {{ blog.description }} <br>

                </td>
                <td>
                    <button @click="editBlog(blog)">Edit</button>
                    <button @click="removeBlog(blog.id)">Hapus</button>
                    <button @click="uploadPhoto(blog)">Upload Foto</button>
                </td>
            </tr>
        </table>
    </b-container>
</template>

<script>
export default {
    data: () => ({
        title: '',
        description: '',
        blogs: [],
        domain: 'http://demo-api-vue.sanbercloud.com/',
        buttonStatus: 'submit',
        idEditBlog: null,
        idUploadBlog: null,
        titleError: null,
        descriptionError: null
    }),

    methods: {
        validationForm: function () {

            if (this.title.length < 5) {
                this.titleError = false
                this.$refs.title.focus()
            }

            if (this.description.length > 30) {
                this.descriptionError = false
                this.$refs.description.focus()
            }
        },
        submitForm: function () {

            this.validationForm()

            if (this.titleError === null && this.descriptionError === null) {
                let formData = new FormData()
                formData.append('title', this.title)
                formData.append('description', this.description)

                const config = {
                    method: "post",
                    url: `${this.domain}/api/blog`,
                    data: formData
                }

                this.axios(config)
                    .then((response) => {
                        this.clearForm()
                        this.getBlogs()
                        alert(response.data.message)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },

        getBlogs: function () {
            const config = {
                method: "get",
                url: `${this.domain}/api/blog`,
            }

            this.axios(config)
                .then((response) => {
                    this.blogs = response.data.blogs
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        removeBlog: function (id) {

            const config = {
                method: "post",
                url: `${this.domain}/api/blog/${id}`,
                params: {
                    _method: "DELETE"
                }

            }

            this.axios(config)
                .then((response) => {
                    this.getBlogs()
                    alert(response.data.message)
                })
                .catch((error) => {
                    console.log(error)
                })

            console.log(id)
        },

        editBlog: function (blog) {
            this.title = blog.title
            this.description = blog.description
            this.buttonStatus = 'update'
            this.idEditBlog = blog.id
        },

        clearForm: function () {
            this.title = ''
            this.description = ''
            this.buttonStatus = 'submit'
            this.idEditBlog = null
            this.idUploadBlog = null
        },

        updateBlog: function (id) {

            this.validationForm()

            if (this.errors.length === 0) {

                let formData = new FormData()
                formData.append('title', this.title)
                formData.append('description', this.description)

                let config = {
                    method: "post",
                    url: `${this.domain}/api/blog/${id}`,
                    params: {
                        _method: 'PUT'
                    },
                    data: formData
                }

                this.axios(config)
                    .then((response) => {
                        this.clearForm()
                        this.getBlogs()
                        alert(response.data.message)

                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

        },

        uploadPhoto: function (blog) {
            this.title = blog.title
            this.description = blog.description
            this.buttonStatus = 'upload'
            this.idUploadBlog = blog.id
        },

        submitPhoto: function (id) {

            let file = this.$refs.photo.files[0]

            let formData = new FormData()
            formData.append('photo', file)

            let config = {
                method: "post",
                url: `${this.domain}/api/blog/${id}/upload-photo`,
                data: formData
            }

            this.axios(config)
                .then((response) => {
                    this.clearForm()

                    this.getBlogs()

                    alert(response.data.message)

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    created() {
        this.getBlogs()
    }
}
</script>