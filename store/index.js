export const state = () => ({
  type: '',
  showAlert: false,
  mensaje: ''
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
  }
}
