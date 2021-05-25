let client
export function setClient(newClient) {
  client = newClient
}

const requestMethod = [
  'request',
  'delete',
  'get',
  'head',
  'options',
  'post',
  'put',
  'patch',
]

const service = {}

requestMethod.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error('Api Client not installed')
    return client[method].apply(null, arguments)
  }
})

export default service
