<template>
  <div>
    <v-row class="mt-2 mb-2">
      <v-btn block color="primary" @click="showDialog = true">
        <v-icon>mdi-account</v-icon>
        Add User
      </v-btn>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        class="elevation-2"
      >
        <template #[`item.Acciones`]="{ item }">
          <v-row>
            {{ item }}
          </v-row>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog v-model="showDialog" width="600" persistent>
      <v-card color="lime lighten-4">
        <v-card-title>Datos del Usuario</v-card-title>
        <v-card-text>
          <v-form ref="frmUser" v-model="frmUser">
            <v-text-field
              v-model="usuario.nombre"
              type="text"
              label="Nombre"
              placeholder="Ingresa tu Nombre"
              :rules="[requerido, longitud3]"
            />
            <v-text-field
              v-model="usuario.apaterno"
              type="text"
              label="A Paterno"
              placeholder="Ingresa tu apaterno"
              :rules="[requerido]"
            />
            <v-text-field
              v-model="usuario.amaterno"
              type="text"
              label="A Materno"
              placeholder="Ingresa tu amaterno"
            />
            <v-text-field
              v-model="usuario.telefono"
              type="text"
              label="Telefono"
              placeholder="Ingresa tu telefono"
            />
            <v-text-field
              v-model="usuario.usuario"
              type="text"
              label="Usuario"
              placeholder="Ingresa tu usuario"
              :rules="[requerido]"
            />
            <v-text-field
              v-model="usuario.password"
              type="password"
              label="Password"
              placeholder="Ingresa tu password"
              :rules="[requerido, longitud6]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showDialog = false">
            <v-icon>mdi-cancel</v-icon>
            Cancelar
          </v-btn>
          <v-btn @click="guardaUsuario">
            <v-icon>mdi-account</v-icon>  Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        { text: 'Acciones', align: 'center', sortable: false, value: 'Acciones' }
      ],
      showDialog: false,
      frmUser: false,
      usuario: {
        nombre: '',
        apaterno: '',
        amaterno: '',
        telefono: '',
        usuario: '',
        password: ''
      },
      requerido: value => !!value || 'Required.',
      longitud3: value => value.length > 2 || 'Nombre requiere mas de 3 letras',
      longitud6: value => value.length > 5 || 'Password requiere'

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
    },
    guardaUsuario () {
      this.frmUser = this.$refs.frmUser.validate()
      if (this.frmUser) {
        this.$axios.post('signup', this.usuario)
          .then((result) => {
            if (result.data.alert === 'success') {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'success')
              this.$store.commit('modifyText', 'Usuario Registrado')
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
                this.getAllUsers()
                this.showDialog = false
              }, 3000)
            }
          })
          .catch((err) => {
            console.log('@@@ err => ', err)
          })
      } else {
        this.$store.commit('modifyAlert', true)
        this.$store.commit('modifyType', 'error')
        this.$store.commit('modifyText', 'Datos Incorrectos')
        setTimeout(() => {
          this.$store.commit('modifyAlert', false)
        }, 3000)
      }
    }
  }
}
</script>
