const mysql = require('mysql')

var db = mysql.createConnection(require('../settings.json').dbInfo)
db.connect(err => { if (err) throw err; else console.log('DB Connected') })
db.on('error', err => { if (err.code == 'PROTOCOL_CONNECTION_LOST') db.connect(err => { if (err) throw err }) })

module.exports = {
    /**
     * 
     * @param {String} query 
     */
    async query(query) {
        if (!db) throw new Error(`DB Not instantiated`)
        return new Promise((res, rej) => {
            db.query(query, (err, rows) => {
                if (err) { console.log(err); return rej(err) }
                res(rows)
            })
        })
    }
}