import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: async uid => {
        let res = await axios.get(`/api/notes/${uid}`);
        for (let i of res.data) {
            i.text = i.text.replace('\\#`', '\'')
            i.title = i.title.replace('\\#`', '\'')
            i.author = i.author.replace('\\#`', '\'')
        }
        return res.data || [];
    },
    add: async (author, authorID, title, text) => {
        let err;
        author = author.replace('\'', '\\#`')
        title = title.replace('\'', '\\#`')
        text = text.replace('\'', '\\#`')
        let res = await axios.post('/api/notes/new', { author: author, authorID: authorID, title: title, text: text })
            .catch(e => { err = e })
        console.log(err)
        if (err) return { errored: true, error: err }
        return res.data || {};
    },
    edit: async (noteID, author, authorID, title, text) => {
        let err;
        title = title.replace('\'', '\\#`')
        text = text.replace('\'', '\\#`')
        let res = await axios.put('/api/notes/edit', { noteID: noteID, title: title, text: text })
            .catch(e => { err = e })
        console.log(err)
        if (err) return { errored: true, error: err }
        return res.data || {};
    },
    delete: async noteID => {
        let res = await axios.delete(`/api/notes/delete/${noteID}`);
        return res.data || [];
    },
}