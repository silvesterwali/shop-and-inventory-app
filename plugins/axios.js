export default function ({ $axios, redirect, error: nuxtError }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    nuxtError({
      statusCode: error.response.status,
      message: error.message,
    })
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
