"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArticleModel_1 = require("./../models/ArticleModel");
var ArticlesController = /** @class */ (function () {
    function ArticlesController() {
    }
    ArticlesController.prototype.getAll = function (req, res) {
        ArticleModel_1.ArticleModel.find({}, function (err, articles) {
            if (err) {
                res.send(err);
            }
            res.json(articles);
        });
    };
    ArticlesController.prototype.getSingle = function (req, res) {
        ArticleModel_1.ArticleModel.findById(req.params.articleId, function (err, article) {
            if (err) {
                res.send(err);
            }
            res.json(article);
        });
    };
    ArticlesController.prototype.update = function (req, res) {
        ArticleModel_1.ArticleModel.findOneAndUpdate({ _id: req.params.articleId }, req.body, { new: true }, function (err, article) {
            if (err) {
                res.send(err);
            }
            res.json(article);
        });
    };
    ArticlesController.prototype.add = function (req, res) {
        var article = new ArticleModel_1.ArticleModel(req.body);
        article.save(function (err, article) {
            if (err) {
                res.send(err);
            }
            res.json(article);
        });
    };
    ArticlesController.prototype.delete = function (req, res) {
        ArticleModel_1.ArticleModel.remove({ _id: req.params.articleId }, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ msg: 'Removed' });
        });
    };
    return ArticlesController;
}());
exports.ArticlesController = ArticlesController;
//# sourceMappingURL=ArticlesController.js.map