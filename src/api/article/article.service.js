const db = require('../../db/db')

const get = (limit = 10, page = 0, result) => {
    const sql = 'SELECT * FROM articles limit ?, ?';
    const start = page * limit;

    db.query(sql, [start, limit], (error, records) => {
        if (error) {
            result(error, null);
        } else {
            result(null, records);
        }
    });
}

const getArticleContentById = (id, result) => {
    const sql = 'SELECT * FROM articles WHERE id = ? limit 1';

    db.query(sql, [id], (error, records) => {
        if (error) {
            result(error, null);
        } else {
            if (records && records.length > 0) {
                const { content, others } = records[0];

                result(null, { content });
            } else {
                result(
                    null,
                    { 
                        errorCode: 404, 
                        errorMessage: "Not found article" 
                    }
                );
            }
        }
    });
}

const save = (data, result) => {
    const sql = 'INSERT INTO articles SET ?';

    db.query(sql, [data], (error, response) => {
        if (error) {
            result(error, null);
        } else {
            result(null, { message: 'Insert success!' });
        }
    })
}

module.exports = {
    get,
    getArticleContentById,
    save,
}