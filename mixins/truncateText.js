export default {
  methods: {
    /**
     * truncateText
     *
     * helper method to truncate text in component
     *
     * @param  {String} text
     * @param  {Number} length=20 length of trucated text
     */
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
