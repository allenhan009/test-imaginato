const util = require('util')
const mysql = require('mysql')
const db = require('../../db/db')

module.exports = {
    get: (req, res) => {
        // const sql = 'SELECT * FROM comments where article_id = ?';
        const sql = `
            SELECT a.*, b.*
            FROM test_imaginato.comments a
            LEFT JOIN (
                SELECT
                    id as 'sub_comment_id', 
                    nickname as 'sub_comment_nickname',
                    content as 'sub_comment_content',
                    creation_date as 'sub_comment_creation_date',
                    article_id as 'sub_comment_article_id',
                    comment_id as 'commented_comment_id'
                FROM test_imaginato.comments
                WHERE article_id = ? AND comment_id is not null
            ) b on a.id = b.commented_comment_id
            WHERE a.article_id = ? AND a.comment_id is null;`
        ;

        db.query(sql, [req.params.id, req.params.id], (err, response) => {
            if (err) {
                throw err
            }

            const comments = new Map();

            response.map((each) => {
                if (comments.has(each.id)) {
                    const existing = comments.get(each.id);
                    existing.comments.push({
                        id: each.sub_comment_id,
                        nickname: each.sub_comment_nickname,
                        content: each.sub_comment_content,
                        creation_date: each.sub_comment_creation_date,
                        article_id: each.sub_comment_article_id,
                        comment_id: each.commented_comment_id,
                    });

                    comments.set(each.id, existing);
                } else {
                    each.comments = [];
                    const {
                        sub_comment_id,
                        sub_comment_nickname,
                        sub_comment_content,
                        sub_comment_creation_date,
                        sub_comment_article_id,
                        commented_comment_id, 
                        ...mainComment
                    } = each;

                    if (each.sub_comment_id) {
                        mainComment.comments.push({
                            id: sub_comment_id,
                            nickname: sub_comment_nickname,
                            content: sub_comment_content,
                            creation_date: sub_comment_creation_date,
                            article_id: sub_comment_article_id,
                            comment_id: commented_comment_id,
                        });
                    }
                    
                    comments.set(each.id, mainComment);
                }
            });

            res.json(Array.from(comments).map(([index, each]) => each));
        })
    },

    commentOnArticle: (req, res) => {
        const articleId = req.params.id;
        const data = Object.assign(
            req.body,
            {
                article_id: articleId,
                comment_id: null,
                creation_date: new Date()
            },
        );

        const sql = 'INSERT INTO comments SET ?';

        db.query(sql, [data], (err, response) => {
            if (err) {
                throw err
            }

            res.json({ message: 'Insert success!' })
        })
    },

    commentOnComment: (req, res) => {
        const { articleId, commentId } = req.params;
        const data = Object.assign(
            req.body,
            {
                article_id: articleId,
                comment_id: commentId,
                creation_date: new Date()
            },
        );

        const sql = 'INSERT INTO comments SET ?';

        db.query(sql, [data], (err, response) => {
            if (err) {
                throw err
            }

            res.json({ message: 'Insert success!' })
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