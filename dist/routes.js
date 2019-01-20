"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArticlesController_1 = require("./controllers/ArticlesController");
var articlesController = new ArticlesController_1.ArticlesController(); // dependency injection - to do
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.routes = function (app) {
        app.route('/articles')
            .get(articlesController.getAll)
            .post(articlesController.add);
        app.route('/articles/:articleId')
            .get(articlesController.getSingle)
            .put(articlesController.update)
            .delete(articlesController.delete);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map