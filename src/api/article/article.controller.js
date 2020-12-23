const util = require('util')
const mysql = require('mysql')
const db = require('../../db/db')

module.exports = {
    get: (req, res) => {
        const sql = 'SELECT * FROM articles limit ?, ?';
        const limit = 20;
        const start = (req.query.page || 0) * limit;

        db.query(sql, [start, limit], (err, response) => {
            if (err) {
                throw err
            }

            res.json(response.map(({ id, content, ...each }) => each))
        })
    },

    detail: (req, res) => {
        const sql = 'SELECT * FROM articles WHERE id = ? limit 1';

        db.query(sql, [req.params.id], (err, response) => {
            if (err) {
                throw err
            }

            const { content, others } = response[0];

            res.json({ content })
        })
    },

    update: (req, res) => {
        const data = req.body;
        const articleId = req.params.id;
        const sql = 'UPDATE articles SET ? WHERE id = ?';

        db.query(sql, [data, articleId], (err, response) => {
            if (err) {
                throw err
            }

            res.json({ message: 'Update success!' })
        })
    },

    store: (req, res) => {
        const data = Object.assign(
            req.body,
            {
                creation_date: new Date()
            },
        );

        const sql = 'INSERT INTO articles SET ?';

        db.query(sql, [data], (err, response) => {
            if (err) {
                throw err
            }

            res.json({ message: 'Insert success!' })
        })
    },
}