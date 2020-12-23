const util = require('util')
const mysql = require('mysql')
const db = require('../../../db/db')

module.exports = {
    get: (req, res) => {
        const sql = 'SELECT * FROM comments where article_id = ?';

        db.query(sql, [req.params.id], (err, response) => {
            if (err) {
                throw err
            }

            res.json(response.map(({ id, article_id, comment_id, ...each }) => each));
        })
    },

    store: (req, res) => {
        const data = req.body;
        data.creation_date = new Date();

        const sql = 'INSERT INTO comments SET ?';

        db.query(sql, [data], (err, response) => {
            if (err) {
                throw err
            }

            res.json({ message: 'Insert success!' })
        })
    },
}