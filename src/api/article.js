import Vue from 'vue'

export function articles(params) {
    return Vue.axios.get('/admin/article', {params: params})
}
export function add(params) {
    return Vue.axios.post('/admin/article', params)
}

export default {
    articles
}
