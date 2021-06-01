/**
 * mixin for set snackbar message
 *
 */

import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_MESSAGE']),
  },
}
