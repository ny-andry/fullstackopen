import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    }
  }
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObj) => {
  const response = await axios.post(baseUrl, blogObj, config())
  return response.data
}

const update = async (blogObj, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObj)
  return response.data
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config())
}

export default { getAll, create, update, remove }
