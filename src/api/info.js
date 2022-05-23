
import Vue from 'vue'

export function all() {
    return Vue.axios.get('/admin/info/all', {})
}
export function detail(id) {
    return Vue.axios.get('/admin/info/'+id, {})
}
export function add(params) {
    return Vue.axios.post('/admin/info', params)
}
export function update(params) {
    return Vue.axios.put('/admin/info/' + params.id, params)
}
export function cateDetail(id) {
    return Vue.axios.get('/admin/info/cate/'+id, {})
}
export function cateAdd(params) {
    return Vue.axios.post('/admin/info/cate', params)
}
export function cateUpdate(params) {
    return Vue.axios.put('/admin/info/cate/' + params.id, params)
}
export default {
    all
    , add
    , update
    , detail
    , cateDetail
    , cateAdd
    , cateUpdate
}
