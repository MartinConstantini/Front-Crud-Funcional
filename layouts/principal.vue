<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="pt-4"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/80.jpg" />
        </v-list-item-avatar>
        <v-list-item-title>Martin Emmanuel</v-list-item-title>
        <v-btn color="red" icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list>
        <v-list-item v-for="opcion in opciones" :key="opcion.titulo" :to="opcion.path" link>
          <v-list-item-icon><v-icon>{{ opcion.icon }}</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title>{{ opcion.titulo }}</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
      <ui-alert v-if="showAlert" class="alerta" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import uiAlert from '@/components/settings/ui-alert.vue'
export default {
  components: {
    uiAlert
  },
  data () {
    return {
      drawer: true,
      mini: true,
      opciones: [
        { titulo: 'Users', icon: 'mdi-account', path: 'dashboard/users' }
      ]
    }
  },
  computed: {
    ...mapState({
      showAlert: state => state.showAlert
    })
  }
}
</script>
