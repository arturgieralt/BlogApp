"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ArticleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    content: {
        type: String,
        required: 'Enter a content'
    },
    author: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});
exports.ArticleModel = mongoose_1.model('Article', exports.ArticleSchema, 'articles');
//# sourceMappingURL=ArticleModel.js.map