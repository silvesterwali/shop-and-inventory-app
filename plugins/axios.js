export default function ({ $axios, error: nuxtError }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    if (error.response.status === 404 || error.response.status === 500) {
      nuxtError({
        statusCode: error.response.status,
        message: error.response.data.message,
      })
    }
  })
}
