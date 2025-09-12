import axios from 'axios'
const baseUrl = '/api/anuncios'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }