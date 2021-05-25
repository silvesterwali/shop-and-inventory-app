import { setClient } from '~/services/apiClient.js'

export default ({ app, store }) => {
  setClient(app.$axios)
}
