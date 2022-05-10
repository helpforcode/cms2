
import Vue from 'vue'

export function all() {
    return Vue.axios.get('/admin/info/all', {})
}
export function add(params) {
    return Vue.axios.post('/admin/info', params)
}
export function update(params) {
    return Vue.axios.put('/admin/info/' + params.id, params)
}

export default {
    all
    , add
    , update
}
