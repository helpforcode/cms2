// import router from '@/router'
//
// export default {
//     state: {
//         pageInfo: {
//             page: 1,
//             size: 10,
//             hasMore: false,
//         }
//     },
//     mutations: {
//         SET_HAS_MORE: (state, hasMore) => {
//             console.log('set hasMore:', hasMore)
//             this.pageInfo.hasMore = hasMore
//         },
//         SET_PAGE: (state, page) => {
//             state.pageInfo.page = page
//         }
//     },
//     actions: {
//         getNextPageParam({commit, state}) {
//             let query = router.app._route.query
//             commit('SET_PAGE', query.page ? query.page + 1 : 1)
//             return state.pageInfo
//         },
//         setHasMore({commit}, hasMore) {
//             commit('SET_HAS_MORE', hasMore)
//         }
//     },
//     getters: {
//         isHasMore(state) {
//             return this.getPageInfo(state).hasMore
//         },
//         getPageInfo(state) {
//             return state.pageInfo
//         }
//     }
// }
