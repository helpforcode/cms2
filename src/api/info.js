
import Vue from 'vue'

export function all() {
    return Vue.axios.get('/admin/info/all', {})
}

export default {
    all
}
