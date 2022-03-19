import Vue from 'vue'

export function articles(params) {
    return Vue.axios.get('/admin/article', {params: params})
}
export function articleGroup(params) {
    return Vue.axios.get('/admin/article/group', {params: params})
}
export function article(id) {
    return Vue.axios.get('/admin/article/'+id)
}
export function add(params) {
    return Vue.axios.post('/admin/article', params)
}
export function remove(id) {
    return Vue.axios.delete('/admin/article/'+id)
}
export function update(params) {
    return Vue.axios.put('/admin/article/'+params.id, params)
}

export default {
    articles
    , articleGroup
    , remove
}
