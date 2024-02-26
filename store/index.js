export const state = () => ({
  type: '',
  showAlert: false,
  mensaje: '',
  token: ''
})

export const mutations = {
  modifyType (state, type) {
    state.type = type
  },
  modifyAlert (state, showAlert) {
    state.showAlert = showAlert
  },
  modifyText (state, mensaje) {
    state.mensaje = mensaje
  },
  modifyToken (state, token) {
    state.token = token
  }
}
