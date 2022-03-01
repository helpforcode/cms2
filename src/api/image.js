import Vue from 'vue'

export function upload(params) {
    let config = {
        headers: {
            post: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }
    return Vue.axios.post('/admin/image/upload', params, config)
}

export function list() {
    return Vue.axios.get('/admin/image')
}

export function remove(id) {
    return Vue.axios.delete('/admin/image/'+id)
}

export function getUrl(relativeUrl) {
   return process.env.VUE_APP_IMAGE_BASE_URL + relativeUrl;
}

export default {
    upload
    , getUrl
    , remove
    , list
}
