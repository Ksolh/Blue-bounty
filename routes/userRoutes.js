const sqlHelper = require('../lib/mySqlHelper')

module.exports = async app => {

    app.get(`/api/users`, async (req, res) => {
        let errored = false;
        let users = await sqlHelper.query(`SELECT * FROM users`)
            .catch(err => {
                errored = true
                res.status(400).send(err)
            })
        if (errored) return
        return res.status(200).send(users);
    });

    app.post(`/api/user`, async (req, res) => {
        let errored = false;
        const { firstName, lastName, userName, password } = req.body;
        await sqlHelper.query(`INSERT INTO users(username,password,first_name,last_name) VALUES ('${userName}','${password}','${firstName}','${lastName}')`)
            .catch(err => {
                errored = true;
                res.status(400).send(err)
            })
        if (errored) return
        return res.status(201).send({
            error: false,
            user: req.body
        });
    })

    app.post('/api/login', async (req, res) => {
        let errored = false;
        const { userName, password } = req.body;
        let id = await sqlHelper.query(`SELECT id FROM users WHERE username = '${userName}' AND password = '${password}'`)
            .catch(err => {
                errored = true;
                res.status(400).send(err)
            })
        if (errored) return
        if (id.length == 0) return res.status(401).send({
            error: true,
            errorMessage: 'No user found'
        });
        return res.status(201).send({
            error: false,
            user: id[0].id
        });
    })

    app.put(`/api/user`, async (req, res) => {
        let errored = false;
        const { firstName, lastName, username, password } = req.body;
        await sqlHelper.query(`UPDATE users SET first_name = '${firstName}', last_name = '${lastName}', password = '${password}' WHERE username = '${username}'`)
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

    app.delete(`/api/user/:id`, async (req, res) => {
        const { id } = req.params;
        console.log(id);

        db.get('users')
            .remove({ id })
            .write()

        return res.status(202).send({
            error: false
        })

    })

}