<template>
  <div>
    <v-row class="mt-2 mb-2">
      <v-btn block color="primary" class="text-capitalize" @click="showDialog = true">
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
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-tooltip bottom color="red">
                <template #activator="{ on, attrs }">
                  <v-btn icon color="red" v-bind="attrs" @click="deleteUser(item.usuario)" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Borrar el usuario:{{ item.usuario }}</span>
              </v-tooltip>
            </v-col>
            <v-col cols="6">
              <v-tooltip left color="red">
                <template #activator="{ on, attrs }">
                  <v-btn icon color="yellow darkeen-4" v-bind="attrs" @click="updateUser(item)" v-on="on">
                    <v-icon>mdi-update</v-icon>
                  </v-btn>
                </template>
                <span>Actualizar el usuario:{{ item.usuario }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog v-model="showDialog" width="600" persistent>
      <v-card class="lime lighten-4">
        <v-card-title class="primary white--text">
          Datos del Usuario
        </v-card-title>
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
          <v-btn @click="showDialog = false; resetForm()">
            <v-icon>mdi-cancel</v-icon>
            Cancelar
          </v-btn>
          <v-btn color="secondary" @click="guardaUsuario ">
            <v-icon>mdi-account</v-icon>  Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDelete"
      max-width="350"
      persistent
      color="blue"
    >
      <v-card>
        <v-card-title class="text-h5">
          Delete User
        </v-card-title>

        <v-card-text>
          Are you sure you want to DELETE the USER?
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="red darken-1"
            text
            @click="dialogDelete = false; resetForm()"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="postDelete, resetForm() "
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdate" width="600" persistent>
      <v-card color="green lighten-4">
        <v-card-title class="primary white--text">
          Datos del Usuario
        </v-card-title>
        <v-card-text>
          <v-form ref="frmUserUpdate" v-model="frmUserUpdate">
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
              label="Usuario"
              placeholder="Ingresa tu usuario"
              :rules="[requerido]"
              style="display: none;"
            />
            <v-text-field
              v-model="usuario.password"
              type="text"
              label="Password"
              placeholder="Ingresa tu password"
              :rules="[requerido, longitud6]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogUpdate = false; resetForm()">
            <v-icon>mdi-cancel</v-icon>
            Cancelar
          </v-btn>
          <v-btn color="secondary" @click="actualizarUsuario">
            <v-icon>mdi-account-arrow-up</v-icon>  Actualizar
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
      longitud6: value => value.length > 5 || 'Password requiere',
      dialogDelete: false,
      userDelete: '',
      dialogUpdate: false,
      frmUserUpdate: false

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
                this.resetForm()
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
    },
    deleteUser (user) {
      this.userDelete = user
      this.dialogDelete = true
    },
    postDelete () {
      if (this.userDelete !== '') {
        const user = {
          usuario: this.userDelete
        }
        this.$axios.post('delete-user', user)
          .then((result) => {
            console.log('@@ result => ', result)
            if (result.data.alerta === 'Usuario eliminado correctamente') {
              this.getAllUsers()
              this.dialogDelete = false
            }
          })
          .catch((error) => {
            console.log('@@@ error', error)
          })
      }
    },
    updateUser (user) {
      this.usuario.nombre = user.nombre
      this.usuario.apaterno = user.apaterno
      this.usuario.amaterno = user.amaterno
      this.usuario.telefono = user.telefono
      this.usuario.usuario = user.usuario
      this.usuario.password = ''
      this.dialogUpdate = true
    },
    actualizarUsuario () {
      this.frmUserUpdate = this.$refs.frmUserUpdate.validate()
      if (this.frmUserUpdate) {
        this.$axios.post('update-user', this.usuario)
          .then((result) => {
            console.log('@@ update =>', result)
            this.getAllUsers()
            this.dialogUpdate = false
            this.resetForm()
          })
          .catch((error) => {
            console.log('@@ error => ', error)
            this.resetForm()
          })
      } else {
        // algo salio mal
      }
    },
    resetForm () {
      this.usuario = {
        nombre: '',
        apaterno: '',
        amaterno: '',
        telefono: '',
        usuario: '',
        password: ''
      }
    }
  }
}
</script>
