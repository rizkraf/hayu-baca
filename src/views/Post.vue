<template>
  <b-container>
    <!-- Nanti munculnya cuman ketika udah login doang -->
    <b-form @submit.prevent="submitForm()">
        <b-alert :show="dismissCountDown" dismissible fade :variant="alertVariant" @dismiss-count-down="countDownChanged">{{ alertText }}</b-alert>
        <label for="judul"><h5>Judul</h5></label>
        <b-form-input name="title" ref="title" :state="titleError" v-model="title" placeholder="Masukan Judul ..." :readonly="buttonStatus == 'upload'" id="judul" class="formInputCRUD"></b-form-input>

        <label for="deskripsi"><h5>Isi Artikel</h5></label>
        <b-form-textarea id="textarea" class="formInputCRUD" v-model="description" ref="description" :state="descriptionError" placeholder="Masukan Deskripsi ..." rows="3" :readonly="buttonStatus == 'upload'"></b-form-textarea>

        <div v-if="buttonStatus == 'submit'">
            <b-button pill type="submit" variant="success" class="mt-3">Terbitkan</b-button>
        </div>

        <div v-else-if="buttonStatus == 'update'">
            <b-button pill @click="updateBlog(idEditBlog)" variant="success" class="mt-3">Ubah</b-button>
            <b-button pill @click="clearForm" variant="danger" class="mt-3 ml-3">Batal</b-button>
        </div>

        <div v-else-if="buttonStatus == 'upload'">
            <b-form-file class="mt-3" name="photo" ref="photo" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
            <b-button pill @click="submitPhoto(idUploadBlog)" variant="success" class="mt-3">Unggah</b-button>
            <b-button pill @click="clearForm" variant="danger" class="mt-3 ml-3">Batal</b-button>
        </div>
    </b-form>

    <hr>
    <label for="search"><h5>Cari Judul Artikel ...</h5></label>
    <b-form-input v-on:input="cari(search)" class="formInputCRUD" v-model="search" placeholder="Cari Artikel ..." id="search"></b-form-input>

    <div class="postContainer"> 
        <table class="tableArtikel">
            <tr v-for="(blog, index) of searchBlogs" :key="`blog-` + blog.id" v-bind:class="[index%2==0 ? grey : '']"> 
                <td class="imageArtikel"> 
                    <img class="p-1" width="100" :src="blog.photo ? domain + blog.photo : 'https://dummyimage.com/16:9x1080'" alt="" /> 
                </td> 
                <td class="contentArtikel"> 
                    <h5>
                    <b>Judul : </b> {{ blog.title }} <br /> 
                    <b>Deskripsi : </b> <span v-text="blog.description.length > 100 ? blog.description.substring(0, 100) + '...' : blog.description"></span> <br /> 
                    </h5> 
                </td> 
                <td> 
                    <b-button pill class="ml-1 mt-1" variant="outline-info" @click="editBlog(blog)">Ubah</b-button> 
                    <b-button pill class="ml-1 mt-1" variant="outline-danger" @click="removeBlog(blog.id)">Hapus</b-button> 
                    <b-button pill class="ml-1 mt-1" variant="outline-secondary" @click="uploadPhoto(blog)">Unggah Foto</b-button> 
                </td>
            </tr> 
        </table> 
    </div>
  </b-container>
</template>

<!-- ini styling untuk Post. -->
<style>
.postContainer {
  margin: 0px auto;
  max-width: 700px;
  min-width: 300px;
  background-color: #fff;
  opacity: 0.8;
  box-shadow: 25px 25px 50px #cccccc, -25px -25px 50px #ffffff;
}
.tableArtikel {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  text-align: left;
  border-radius: 10px;
}
.imageArtikel {
  padding: 10px auto;
  max-width: 125px;
}
.contentArtikel {
  padding: 10px;
  max-width: 150px;
  overflow: hidden;
}
.formInputCRUD {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    box-shadow: 5px 5px 10px #cccccc, -5px -5px 10px #ffffff;
    margin-bottom: 20px;
}
td {
  margin: auto;
  padding: 10px;
  max-width: 250px;
  text-align: center;
  vertical-align: middle;
}
html {
  scroll-behavior: smooth;
}
.gray {
    background-color: #ddd;
    color: #000;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
    data: () => ({
        title: '',
        description: '',
        blogs: [],
        domain: 'https://demo-api-vue.sanbercloud.com/',
        buttonStatus: 'submit',
        idEditBlog: null,
        idUploadBlog: null,
        titleError: null,
        descriptionError: null,
        dismissSecs: 5,
        dismissCountDown: 0,
        alertVariant: 'success',
        alertText: 'Artikel telah berhasil diterbitkan',
        search: '',
        searchBlogs: [],
        grey : 'gray'
    }),
    computed : {
        ...mapGetters ({
            guest : 'auth/guest'
        })
    },
    methods: {
        cari(inputnya) {
			if (this.search.length < 1) {
				this.searchBlogs = this.blogs
			} else {
                this.searchBlogs = this.blogs.filter(function(blog){
                    return blog.title.toLowerCase().indexOf(inputnya) != -1;
                })
            }
		},
        validationForm: function () {
            this.titleError = null
            this.descriptionError = null
            if (this.title.length < 1) {
                this.titleError = false
                this.$refs.title.focus()
            }
            if (this.description.length < 1) {
                this.descriptionError = false
                this.$refs.description.focus()
            }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
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
                        this.showAlert()
                        response.data.message
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
                    this.cari('')
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
                    window.scrollTo(0, 0)
                    this.alertText = 'Artikel telah berhasil dihapus'
                    this.alertVariant = 'danger'
                    this.showAlert()
                    response.data.message
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        editBlog: function (blog) {
            window.scrollTo(0, 0)
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
            if (this.titleError === null && this.descriptionError === null) {
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
                        this.alertText = 'Artikel telah berhasil diubah'
                        this.showAlert()
                        response.data.message
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        uploadPhoto: function (blog) {
            window.scrollTo(0, 0)
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
                    this.alertText = 'Foto telah berhasil ditambahkan'
                    this.showAlert()
                    response.data.message
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getBlogs()
        if (this.guest) {
            this.$router.push("/")
        }
    }
}
</script>
