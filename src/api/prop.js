import Vue from 'vue'

export function addProp(params) {
    return Vue.axios.post('/admin/prop', params)
}
export function updateProp(params) {
    return Vue.axios.put('/admin/prop/'+params.id, params)
}
export function propDetail(id) {
    return Vue.axios.get('/admin/prop/'+id, {})
}
export function addPropType(params) {
    return Vue.axios.post('/admin/prop/type', params)
}
export function updatePropType(params) {
    return Vue.axios.put('/admin/prop/type'+params.id, params)
}
export function deletePropType(id) {
    return Vue.axios.delete('/admin/prop/type' + id, {})
}
export function propTypeDetail(id) {
    return Vue.axios.get('/admin/prop/type/'+id, {})
}
export function saveAllProp(params) {
    return Vue.axios.post('/admin/prop/all', params)
}
export function allProp(params) {
    return Vue.axios.get('/prop/all', {params: params})
}
export function deleteProp(id) {
    return Vue.axios.delete('/admin/prop/' + id, {})
}
export default {
    saveAllProp,
    allProp,
    addProp,
    updateProp,
    deleteProp,
    propDetail,
    addPropType,
    updatePropType,
    deletePropType,
    propTypeDetail,
}
