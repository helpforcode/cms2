import Vue from 'vue'

export function words(params) {
    return Vue.axios.get('/admin/word', {params: params})
}
export function wordsDistinct() {
    return Vue.axios.get('/admin/word/distinct')
}
export function dailyWords(params) {
    return Vue.axios.get('/admin/daily-word', {params: params})
}
export function dailyWordsAll(params) {
    return Vue.axios.get('/admin/daily-word/all', {params: params})
}
export function dailyWord(id) {
    return Vue.axios.get('/admin/daily-word/'+id)
}
export function dailyLatest() {
    return Vue.axios.get('/daily-word/latest')
}
export function latestCode() {
    return Vue.axios.get('/admin/daily-word/latest-code')
}
export function dailyNext() {
    return Vue.axios.get('/admin/daily-word/next')
}
export function dailyAdd(params) {
    return Vue.axios.post('/admin/daily-word', params)
}
export function dailyRemove(id) {
    return Vue.axios.delete('/admin/daily-word/'+id)
}
export function dailyUpdate(params) {
    return Vue.axios.put('/admin/daily-word/'+params.id, params)
}

export default {
    dailyLatest
    , dailyNext
    , latestCode
    , words, wordsDistinct
    , dailyWordsAll, dailyWords, dailyWord, dailyAdd, dailyRemove, dailyUpdate
}
