export default {
  methods: {
    errorKey(key) {
      if (this.errors === null) {
        return true
      }
      const errors = this.errors

      if (Array.isArray(errors)) {
        const err = errors.filter((e) => e[key])
        return err.length > 0 ? err[0][key] : true
      }
      return true
    },
  },
}
