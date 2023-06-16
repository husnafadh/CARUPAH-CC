const db = require('../config/firebaseAdmin');
const admin = require('firebase-admin');

const getAllArticle = async (req, res) => {
    try {
        const articlesRef = db.collection('articles');
        const snapshot = await articlesRef.get();
        const articles = [];
        
        snapshot.forEach((doc) => {
          const article = doc.data();
          articles.push(article);
        });
        
        res.status(200).json(articles);
      } catch(error) {
        console.error('Error retrieving articles:', error);
        res.status(500).json({ error: 'Failed to retrieve articles.' });
      }
}

const getAllArticlesByTag = async (req, res) => {
    try {
      const tag = req.params.tag;
  
      // Retrieve documents from Firestore with the specified tag
      const snapshot = await db.collection('articles').where('tag', '==', tag).get();
      const articles = [];
  
      snapshot.forEach((doc) => {
        articles.push(doc.data());
      });
  
      res.status(200).json(articles);
    } catch (error) {
      console.error('Error retrieving articles:', error);
      res.status(500).json({ error: 'Failed to retrieve articles.' });
    }
  };



const createNewArticle = async (req, res) => {
  try {
    const { title, tag, link } = req.body;

    const addArticle = {
      title: title,
      tag: tag,
      link: link,
      updatedAt: new Date()
    };

    const articleRef = await db.collection('articles').add(addArticle);
    const articleId = articleRef.id;

    // Remove the "_writeTime" field from the response
    const { _writeTime, ...articleData } = addArticle;

    res.send({ message: 'Article added successfully.',
      data: {
        id: articleId,
        ...articleData
      }
    });
  } catch (error) {
    console.error('Error adding article:', error);
    res.status(500).json({ error: 'Failed to add article.' });
  }
};

const updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, tag, link} = req.body;

    const updateData = {
      updatedAt: new Date()
    };

    if (title) updateData.title = title;
    if (tag) updateData.tag = tag;
    if (link) updateData.link = link;

    const usersRef = await db.collection('articles').doc(id).update(updateData);
    // Remove the "_writeTime" field from the response
    delete usersRef._writeTime;
    res.send({ message: 'Article updated successfully.', data: usersRef });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
};

const deleteArticle = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Delete document from Firestore
      await db.collection('articles').doc(id).delete();
  
      res.send({ message: 'Article deleted successfully.' });
    } catch (error) {
      console.error('Error deleting article:', error);
      res.status(500).json({ error: 'Failed to delete article.' });
    }
};

  module.exports = {
    getAllArticle,
    getAllArticlesByTag,
    createNewArticle,
    updateArticle,
    deleteArticle,
  }

