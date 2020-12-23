const db = require('../../db/db');
const ArticleService = require('./../article/article.service');

const checkMatchCommentAndArticle = (articleId, commentId, result) => {
    const sql = `
        SELECT * FROM comments c
        WHERE c.article_id = ? and c.id = ?
    `;

    db.query(sql, [articleId, commentId], (error, response) => {
        if (error) {
            result(error, null);
        } else {
            result(null, response.length > 0);
        }
    });
}

const getCommentsByArticleId = (id, result) => {
    const sql = `
        SELECT a.*, b.*
        FROM comments a
        LEFT JOIN (
            SELECT
                id as 'sub_comment_id', 
                nickname as 'sub_comment_nickname',
                content as 'sub_comment_content',
                creation_date as 'sub_comment_creation_date',
                article_id as 'sub_comment_article_id',
                comment_id as 'commented_comment_id'
            FROM comments
            WHERE article_id = ? AND comment_id is not null
        ) b on a.id = b.commented_comment_id
        WHERE a.article_id = ? AND a.comment_id is null;`
    ;

    db.query(sql, [id, id], (error, response) => {
        if (error) {
            result(error);
        } else {
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

            result(Array.from(comments).map(([index, each]) => each));
        }
    })
}

const addComment = (articleId, commentId, commentData, result) => {
    if (commentId) {
        checkMatchCommentAndArticle(articleId, commentId, (_error, _result) => {
            if (_error) {
                result(_error);
            } else {
                if (_result) {
                    const data = Object.assign(
                        commentData,
                        {
                            article_id: articleId,
                            comment_id: commentId,
                            creation_date: new Date()
                        },
                    );
            
                    const sql = 'INSERT INTO comments SET ?';
            
                    db.query(sql, [data], (error, response) => {
                        if (error) {
                            result(error);
                        } else {
                            result({ message: 'Insert success!' });
                        }
                    });
                } else {
                    result({
                        errorCode: 404,
                        errorMessage: "Don't match article with the comment!",
                    });
                }
            }
        });
    } else {
        ArticleService.getArticleContentById(articleId, (_error, _result) => {
            if (_result && _result.errorCode) {
                result(_result);
            } else {
                const data = Object.assign(
                    commentData,
                    {
                        article_id: articleId,
                        comment_id: commentId,
                        creation_date: new Date()
                    },
                );

                const sql = 'INSERT INTO comments SET ?';

                db.query(sql, [data], (error, response) => {
                    if (error) {
                        result(error);
                    } else {
                        result({ message: 'Insert success!' });
                    }
                });
            }
        })
    }
}

module.exports = {
    checkMatchCommentAndArticle,
    getCommentsByArticleId,
    addComment,
}