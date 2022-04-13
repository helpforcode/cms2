<template>
  <v-app>
<!--    <v-app-bar-->
<!--      app-->
<!--      color="primary"-->
<!--      dark-->
<!--    >-->
<!--      <div class="d-flex align-center">-->
<!--        <v-img-->
<!--          alt="Vuetify Logo"-->
<!--          class="shrink mr-2"-->
<!--          contain-->
<!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
<!--          transition="scale-transition"-->
<!--          width="40"-->
<!--        />-->

<!--        <v-img-->
<!--          alt="Vuetify Name"-->
<!--          class="shrink mt-1 hidden-sm-and-down"-->
<!--          contain-->
<!--          min-width="100"-->
<!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
<!--          width="100"-->
<!--        />-->
<!--      </div>-->

<!--      <v-spacer></v-spacer>-->

<!--      <v-btn-->
<!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
<!--        target="_blank"-->
<!--        text-->
<!--      >-->
<!--        <span class="mr-2">Latest Release</span>-->
<!--        <v-icon>mdi-open-in-new</v-icon>-->
<!--      </v-btn>-->
<!--    </v-app-bar>-->

    <v-main>
      <router-view/>


      <div class="fab-container">
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

export default {
  name: 'App',
  components: {
  },

  data() {
    return {
      navs: [
        {'icon': 'fa-home', 'route': 'HomeAdmin'},
        {'icon': 'fa-info', 'route': 'Article'},
        {'icon': 'fa-trophy', 'route': 'Words'},
      ],
    }
  },
  mounted() {
  },
  methods: {
    nav(item, index) {
      console.log(item)
      console.log(index)
      this.$router.push({name: item.route})
    },
  }
};
</script>

<style scoped>
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
