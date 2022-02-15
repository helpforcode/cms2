<template>
  <div class="container">
    <div class="d-flex flex-column justify-center">
      <v-text-field v-model="username" label="NAME" placeholder="username" @keyup.enter="login" />
      <v-text-field v-model="password" label="PASSWORD" placeholder="password" @keyup.enter="login" />
      <v-btn @click="login">OK</v-btn>
      <div class="bottom-bar" @click="login">
        <div>LOG IN</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const param = {
        username: this.username,
        password: this.password,
      }
      this.$store.dispatch('loginAction', param).then((response) => {
        if (response.status === 200) {
          this.$router.push({path: this.$route.query.redirect || '/'})
        }

      }).catch((error) => {
        // 500, 403, etc
        console.log('login failed:', error.response.data.message)
      })
    }
  },
  name: "Login"
}
</script>

<style scoped>
.container {
  padding: 3em;
}
.bottom-bar {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 100%;

  border: 1px solid #eee;
  box-sizing: border-box;

  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 888;

  font-size: 1.2em;
  color: white;
  background: linear-gradient(
      315deg,#498ff2 0%,#4965f2 100%);
}
</style>
