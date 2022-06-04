// import Vue from 'vue'
import ls from '@/storage'

import router from "@/router";
import {ACCESS_TOKEN} from '@/store/constants'

router.beforeEach((to, from, next) => {
    let token = ls.get(ACCESS_TOKEN)
    if (!token) {
        if (to.name === 'Login') {
            // no token, login --> login
            next()
        } else {
            if (to.meta.anon) {
                // whitelist urls, go
                next()
            } else {
                // no token, others --> login
                // next({name: 'Login'})
                next({ name: 'Login', query: { redirect: to.fullPath } })
            }
        }
    } else {
        if (to.name === 'Login') {
            // has token, login-->home
            next({name: 'Article'})
        } else {
            // has token, others-->others
            next()
        }
    }
})
