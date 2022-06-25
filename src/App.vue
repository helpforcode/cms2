<template>
  <v-app>
    <v-main>

      <router-view/>

      <div class="fab-container" v-if="manage">
        <v-speed-dial
            bottom
            left
            direction="top"
        >
          <template v-slot:activator>
            <v-btn
                fab
                dark
            >
              <v-icon>fa-compass</v-icon>
            </v-btn>
          </template>
          <v-btn
              fab
              dark
              small
              v-for="(item, index) in navs" :key="index"
              @click="nav(item, index)"
          >
            <v-icon class="" >{{item.icon}}</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>

    </v-main>

  </v-app>
</template>
<script>
import ls from '@/storage'
import {ACCESS_TOKEN} from '@/store/constants'

export default {
  name: 'App',
  components: {
  },

  data() {
    return {
      token: undefined,
      navs: [
        // {icon: 'fa-home', route: 'HomeAdmin'},
        {icon: 'fa-home', route: 'Article'},
        {icon: 'fa-key', route: 'Info'},
        {icon: 'fa-trophy', route: 'Words'},
        {icon: 'fa-sign-out', route: 'Logout'},
      ],
    }
  },
  computed: {
    manage: function() {
      return this.token && this.$router.currentRoute.name !== 'Home';
    }
  },
  mounted() {
    this.token = ls.get(ACCESS_TOKEN)
  },
  methods: {
    nav(item, index) {
      if (item.route === 'Logout') {
        this.logout()
        if (this.$route.name === 'Home') {
          this.$router.go(0)
        } else {
          this.$router.push({name: "Home"})
        }
      } else {
        this.$router.push({name: item.route})
      }
    },
    logout() {
      this.$store.dispatch('logoutAction').then(() => {
      })
    }
  }
};
</script>

<style >
body {
  font-size: 12px;
}
.v-speed-dial {
  position: absolute;
}
.fab-container {
  z-index: 9999;
  position: fixed;
  bottom: 1em;
  left : 1em;
}
</style>
