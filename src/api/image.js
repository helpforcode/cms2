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

export function getUrl(relativeUrl) {
   return process.env.VUE_APP_IMAGE_BASE_URL + relativeUrl;
}

export default {
    upload
    , getUrl
}
