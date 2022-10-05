import api from "./api";

const list = () => api.get(api.url.student).then(res => res.data)
const get = (id) => api.get(`${api.url.student}/${id}`).then(res => res.data)
const add = (data) => api.post(api.url.student, data).then(res => res.data)
const update = (id, data) => api.put(`${api.url.student}/${id}`, data).then(res => res.data)
const remove = (id) => api.delete(`${api.url.student}/${id}`).then(res => res.data)

const studentService = {
    list,
    get,
    add,
    update,
    delete: remove
}

export default studentService