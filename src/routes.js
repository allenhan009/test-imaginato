module.exports = function (app) {
	const articleController = require('./api/article/controller/article.controller');
	const commentController = require('./api/comment/controller/comment.controller');

	// todoList Routes
	app.route('/articles')
		.get(articleController.get)
		.post(articleController.store);

	app.route('/articles/:id')
		.get(articleController.detail)
		.put(articleController.update);

	app.route('/comments')
		.post(commentController.store);

	app.route('/comments/:id')
		.get(commentController.get);

}