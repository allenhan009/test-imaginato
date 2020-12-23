module.exports = function (app) {
	const articleController = require('./api/article/article.controller');
	const commentController = require('./api/comment/comment.controller');

	app.route('/api/articles')
		.get(articleController.getAll)
		.post(articleController.save);

	app.route('/api/articles/:id')
		.get(articleController.getContent);

	app.route('/api/comments/:id')
		.get(commentController.getCommentsByArticleId)
		.post(commentController.commentOnArticle);
		
	app.route('/api/comments/:articleId/comment/:commentId')
		.post(commentController.commentOnComment);

}