<template>
  <v-alert
    :type="type"
  >
    {{ mensaje }}
  </v-alert>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      type: state => state.type,
      mensaje: state => state.mensaje
    })
  },
  watch: {
    type () {},
    mensaje () {}
  }
}
</script>
