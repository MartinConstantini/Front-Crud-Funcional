<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      class="elevation-2"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      usuarios: [],
      headers: [
        { text: 'Nombre', align: 'center', sortable: true, value: 'nombre' },
        { text: 'A. Paterno', align: 'center', sortable: true, value: 'apaterno' },
        { text: 'A. Materno', align: 'center', sortable: true, value: 'amaterno' },
        { text: 'Telefono', align: 'center', sortable: true, value: 'telefono' },
        { text: 'Usuario', align: 'center', sortable: true, value: 'usuario' },
        { text: 'Acciones', align: 'center', sortable: false }
      ]
    }
  },

  mounted () {
    this.getAllUsers()
  },

  methods: {
    async getAllUsers () {
      const response = await this.$axios.get('get-all')
      if (response.data.alerta === 'Success') {
        this.usuarios = response.data.data
      }
      // console.log('@@ response =>', response)
    }
  }
}
</script>
