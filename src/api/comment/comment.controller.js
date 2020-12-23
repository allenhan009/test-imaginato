const CommentService = require('./comment.service');

module.exports = {
    getCommentsByArticleId: (req, res) => {
        CommentService.getCommentsByArticleId(
            req.params.id,
            function(err, response) {
                if (err) {
                    res.send(err);
                }

                res.json(response);
            },
        );
    },

    commentOnArticle: (req, res) => {
        CommentService.addComment(
            req.params.id,
            null,
            req.body,
            function(err, response) {
                if (err) {
                    res.send(err);
                }

                res.json(response);
            },
        );
    },

    commentOnComment: (req, res) => {
        const { articleId, commentId } = req.params;

        CommentService.addComment(
            articleId, 
            commentId, 
            req.body, 
            function(err, response) {
                if (err) {
                    res.send(err);
                }

                res.json(response);
            },
        );
    },
}