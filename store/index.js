export const state = () => ({
  loading: false,
  message: null, // text and colour
})

export const mutations = {
  /**
   * the message is for general purpose
   * @param {any} payload - {text:'' ,'color'}
   */
  SET_MESSAGE(state, payload) {
    if (payload === null) {
      state.message = null
    } else {
      state.message = {
        text: payload.text,
        color: payload.color ? payload.color : 'success',
      }
    }
  },
}
