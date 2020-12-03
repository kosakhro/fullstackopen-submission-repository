import axios from 'axios'
const baseUrl = 'http://localhost:3010/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 10000,
      name: 'pipa',
      number: '2019-05-30T17:30:31.098Z'
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteContact = id => {
   return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
    getAll, 
    create, 
    update,
    deleteContact
}