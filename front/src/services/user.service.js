import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: async () => {
        let res = await axios.get(`/api/users`);
        return res.data || [];
    },
    add: async (firstName, lastName, userName, password) => {
        let err;
        let res = await axios.post('http://localhost:5000/api/user/', { firstName: firstName, lastName: lastName, userName: userName, password: password })
            .catch(e => { err = e })
            console.log(err)
        if (err) return { errored: true, error: err }
        return res.data || {};
    },
    edit: async (firstName, lastName, userName, password) => {
        //to be implemented
        let res = await axios.put(`/api/user/`, { firstName, lastName, userName, password })
        return res.data || {};
    },
    delete: async (userName) => {
        let res = await axios.delete(`/api/user/${userName}`);
        return res.data || [];
    },
    login: async (userName, password) => {
        let err
        let res = await axios.post(`http://localhost:5000/api/login`, { userName: userName, password: password })
            .catch(e => { err = e })
        if (err) return { errored: true, error: err }
        return res.data.user || {};
    }
}