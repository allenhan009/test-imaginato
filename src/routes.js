module.exports = function (app) {
	const articleController = require('./api/article/article.controller');
	const commentController = require('./api/comment/comment.controller');

	app.route('/api/articles')
		.get(articleController.get)
		.post(articleController.store);

	app.route('/api/articles/:id')
		.get(articleController.detail)
		.put(articleController.update);

	app.route('/api/comments')
		.post(commentController.store);

	app.route('/api/comments/:id')
		.get(commentController.get)
		.post(commentController.commentOnArticle);

		
	app.route('/api/comments/:articleId/comment/:commentId')
		.post(commentController.commentOnComment);

}