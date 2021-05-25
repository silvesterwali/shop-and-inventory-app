export default function ({ $axios }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line
    console.log('Making request to ' + config.url)
  })

  // $axios.onError((error) => {
  //   nuxtError({
  //     statusCode: error.response.status,
  //     message: error.message,
  //   })
  // })
}
