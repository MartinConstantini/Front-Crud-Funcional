<template>
  <v-app>
    <v-row class="centerClass">
      <Nuxt />
      <ui-alert v-if="showAlert" class="alerta" />
    </v-row>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import uiAlert from '@/components/settings/ui-alert.vue'

export default {
  components: {
    uiAlert
  },
  computed: {
    ...mapState({
      showAlert: state => state.showAlert
    })
  },
  watch: {
    showAlert () {
      // se observa si hubo cambios de la variable
    }
  }
}
</script>

<style scoped>
.centerClass {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B2DFDB;
}

.alerta {
  position: absolute;
  top: 10px;
  right: 30px;
}
</style>
