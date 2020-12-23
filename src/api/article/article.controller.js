const ArticleService = require('./article.service');

module.exports = {
    getAll: (req, res) => {
        ArticleService.get(20, req.query.page, function(err, response) {
            if (err) {
                res.send(err);
            }

            res.json(response);
        });
    },

    getContent: (req, res) => {
        ArticleService.getArticleContentById(req.params.id, function(err, response) {
            if (err) {
                res.send(err);
            }

            res.json(response);
        });
    },

    save: (req, res) => {
        const data = Object.assign(
            req.body,
            {
                creation_date: new Date()
            },
        );

        ArticleService.save(data, function(err, response) {
            if (err) {
                res.send(err);
            }

            res.json(response);
        });
    },
}