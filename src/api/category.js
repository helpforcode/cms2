import Vue from 'vue'

export function categories(params) {
    return Vue.axios.get('/admin/category', params)
}

export default {
    categories
}
