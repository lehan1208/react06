import api from "./api";

const list = () => api.get(api.url.instructor).then(res => res.data)
const get = (id) => api.get(`${api.url.instructor}/${id}`).then(res => res.data)
const add = (data) => api.post(api.url.instructor, data).then(res => res.data)
const update = (id, data) => api.put(`${api.url.instructor}/${id}`, data).then(res => res.data)
const remove = (id) => api.delete(`${api.url.instructor}/${id}`).then(res => res.data)

const instructorService = {
    list,
    get,
    add,
    update,
    delete: remove
}

export default instructorService