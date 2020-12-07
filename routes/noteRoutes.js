const sqlHelper = require('../lib/mySqlHelper')

module.exports = async app => {

    app.get(`/api/notes/:uid`, async (req, res) => {
        const { uid } = req.params;
        if (!uid) res.status(400).send('No UID Provided')
        let errored = false;
        let notes = await sqlHelper.query(`SELECT * FROM notes WHERE authorid = '${uid}'`)
            .catch(err => {
                errored = true
                res.status(400).send(err)
            })
        if (errored) return
        return res.status(200).send(notes);
    });

    app.post('/api/notes/new', async (req, res) => {
        let errored = false;
        const { author, authorID, title, text } = req.body;
        await sqlHelper.query(`INSERT INTO notes(author,title,text,createdAt, authorid) VALUES ('${author}','${title}','${text}','${Date.now()}', '${authorID}')`)
            .catch(err => {
                errored = true;
                res.status(400).send(err)
            })
        if (errored) return
        return res.status(201).send({
            error: false,
            note: req.body
        });
    })


    app.put(`/api/notes/edit`, async (req, res) => {
        let errored = false;
        const { noteID, title, text } = req.body;
        await sqlHelper.query(`UPDATE notes SET title = '${title}', text = '${text}' WHERE id = '${noteID}'`)
            .catch(err => {
                errored = true;
                res.status(400).send(err)
            })
        if (errored) return
        return res.status(202).send({
            error: false,
            user: req.body
        });
    });

    app.delete(`/api/notes/delete/:id`, async (req, res) => {
        const { id } = req.params;

        await sqlHelper.query(`DELETE FROM notes WHERE id = '${id}'`)

        return res.status(202).send({
            error: false
        })

    })

}