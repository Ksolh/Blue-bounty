import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: async uid => {
        let res = await axios.get(`https://a.vibot.tech:5001/api/notes/${uid}`);
        for (let i of res.data) {
            if (i.text) i.text = i.text.replace('\\#`', '\'')
            if (i.title) i.title = i.title.replace('\\#`', '\'')
            if (i.author) i.author = i.author.replace('\\#`', '\'')
        }
        return res.data || [];
    },
    add: async (author, authorID, title, text) => {
        let err;
        if (author) author = author.replace('\'', '\\#`')
        if (title) title = title.replace('\'', '\\#`')
        if (text) text = text.replace('\'', '\\#`')
        let res = await axios.post(`https://a.vibot.tech:5001/api/notes/new`, { author: author, authorID: authorID, title: title, text: text })
            .catch(e => { err = e })
        console.log(err)
        if (err) return { errored: true, error: err }
        return res.data || {};
    },
    edit: async (noteID, author, authorID, title, text) => {
        let err;
        if (title) title = title.replace('\'', '\\#`')
        if (text) text = text.replace('\'', '\\#`')
        let res = await axios.put(`https://a.vibot.tech:5001/api/notes/edit`, { noteID: noteID, title: title, text: text })
            .catch(e => { err = e })
        console.log(err)
        if (err) return { errored: true, error: err }
        return res.data || {};
    },
    delete: async noteID => {
        let res = await axios.delete(`https://a.vibot.tech:5001/api/notes/delete/${noteID}`);
        return res.data || [];
    },
    addCollaborators: async (noteID, collaboratorString) => {
        let err;
        if (collaboratorString) collaboratorString = collaboratorString.replace('\'', '\\#`').replace(' ', '')
        let res = await axios.put(`https://a.vibot.tech:5001/api/notes/edit/collaborators`, { noteID: noteID, collaboratorString: collaboratorString })
            .catch(e => { err = e })
        console.log(err)
        if (err) return { errored: true, error: err }
        return res.data || {};
    },
    addComment: async (noteID, comment, commentAuthor) => {
        let err;
        if (commentAuthor) commentAuthor = commentAuthor.replace('\'', '\\#`')
        if (comment) comment = comment.replace('\'', '\\#`')
        let res = await axios.post(`https://a.vibot.tech:5001/api/notes/comment/new`, { commentAuthor: commentAuthor, comment: comment, noteID: noteID })
            .catch(e => { err = e })
        console.log(err)
        if (err) return { errored: true, error: err }
        return res.data || {};
    },
    deleteComment: async commentID => {
        let res = await axios.delete(`https://a.vibot.tech:5001/api/notes/delete/comment/${commentID}`);
        return res.data || [];
    },
    getComments: async noteID => {
        let res = await axios.get(`https://a.vibot.tech:5001/api/notes/comments/${noteID}`);
        return res.data || [];
    }
}