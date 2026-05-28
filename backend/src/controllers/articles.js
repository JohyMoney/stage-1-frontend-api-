const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user._id })
    .then((article) => res.status(201).send(article))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Invalid article data'));
        return;
      }
      next(error);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => new NotFoundError('Article not found'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Cannot delete another user article');
      }
      return Article.findByIdAndDelete(req.params.articleId);
    })
    .then((deleted) => res.send(deleted))
    .catch(next);
};
