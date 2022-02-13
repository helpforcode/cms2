import Vue from 'vue'

export function login (params) {
    return Vue.axios.post('/admin/user/login', params)
}
