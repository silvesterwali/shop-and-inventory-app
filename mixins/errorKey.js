export default {
  methods: {
    errorKey(key) {
      if (this.errors === null) {
        return true
      }
      const errors = this.errors
      return errors[key] ? errors[key] : true
    },
  },
}
