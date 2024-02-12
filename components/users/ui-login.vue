<template>
  <v-card class="login-card" rounded width="400">
    <v-card-title class="custom-title">
      <v-icon left>mdi-account-key</v-icon>
      Login
    </v-card-title>
    <v-card-text>
      <v-form ref="frmLogin" v-model="valid">
        <v-text-field
          v-model="usuario"
          type="text"
          placeholder="Escribe tu usuario"
          label="Usuario"
          prepend-inner-icon="mdi-account"
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="password"
          type="password"
          placeholder="Escribe la contraseña"
          label="Password"
          prepend-inner-icon="mdi-lock"
          :rules="[rules.required, rules.password]"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block elevation="0" rounded color="primary" @click="loginUser">
        <v-icon color="white">mdi-account</v-icon>
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      usuario: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        password: value => value.length > 5 || 'Password requires 6 chars'
      }
    }
  },
  methods: {
    loginUser () {
      this.valid = this.$refs.frmLogin.validate()
      if (this.valid) {
        const sendData = {
          usuario: this.usuario,
          password: this.password
        }

        this.$axios.post('login', sendData)
          .then((result) => {
            if (result.data.alert === 'success') {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'success')
              this.$store.commit('modifyText', 'Bienvenido :)')
            } else {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'error')
              this.$store.commit('modifyText', result.data.alerta)
            }
          }).catch((err) => {
            console.log('@@@ error => ', err)
          })
      } else {
        // handle alert
      }
    }
  }
}
</script>

<style scoped>
.login-card {
  background-color: #80DEEA;
}

.custom-title {
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  text-align: center;
  color: #004D40;
}
</style>
