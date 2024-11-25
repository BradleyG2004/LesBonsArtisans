module.exports = {
    createProduct: async (db, product) => {
      return await db.collection('products').insertOne(product);
    },
    
    getProducts: async db => {
      return await db.collection('products').find().toArray();
    },
  
    getProductById: async (db, id) => {
      const { ObjectId } = require('mongodb');
      return await db.collection('products').findOne({ _id: ObjectId(id) });
    },
  
    updateProduct: async (db, id, updates) => {
      const { ObjectId } = require('mongodb');
      return await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: updates });
    },
  
    deleteProduct: async (db, id) => {
      const { ObjectId } = require('mongodb');
      return await db.collection('products').deleteOne({ _id: ObjectId(id) });
    }
  };
  