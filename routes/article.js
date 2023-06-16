const express = require('express');
const router = express.Router();
const articleController = require('../handlers/articleHandler');

// get all artikel
router.get('/', articleController.getAllArticle);

// get artikel by tag
router.get('/:tag', articleController.getAllArticlesByTag);

// create artikel
router.post('/', articleController.createNewArticle);

// update artikel
router.patch('/:id', articleController.updateArticle);

// delete
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
