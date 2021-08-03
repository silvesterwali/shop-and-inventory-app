export default {
  methods: {
    truncateText(text, length = 20) {
      if (text === null) {
        return null
      }

      if (text.length > length) {
        return text.slice(0, length) + '...'
      }

      return text
    },
  },
}
