import Vue from 'vue'

export function articles(params) {
    return Vue.axios.get('/admin/article', params)
}

export default {
    articles
}
