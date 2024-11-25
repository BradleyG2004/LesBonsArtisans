module.exports = {
    createProduct: async (req, res) => {
      const db = req.app.locals.db;
      const io = req.app.locals.io;
      try {
        const result = await db.collection('products').insertOne(req.body);
        io.emit('refresh-products', { action: 'create', product: req.body });
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: 'Unable to create product' });
      }
    },
  
    getProducts: async (req, res) => {
      const db = req.app.locals.db;
      try {
        const products = await db.collection('products').find().toArray();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch products' });
      }
    },
  
    getProductById: async (req, res) => {
      const db = req.app.locals.db;
      const { id } = req.params;  // Récupère l'ID de l'URL
      try {
        const product = await db.collection('products').findOne({
          _id: new require('mongodb').ObjectId(id)  // Conversion de l'ID en ObjectId
        });
  
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch product' });
      }
    },
  
    updateProduct: async (req, res) => {
      const db = req.app.locals.db;
      const io = req.app.locals.io;
      try {
        const result = await db.collection('products').updateOne(
          { _id: new require('mongodb').ObjectId(req.params.id) },
          { $set: req.body }
        );
  
        if (result.modifiedCount > 0) {
          io.emit('refresh-products', { action: 'update', product: req.body });
          res.status(200).json({ message: 'Product updated successfully' });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Unable to update product' });
      }
    },
  
    deleteProduct: async (req, res) => {
      const db = req.app.locals.db;
      const io = req.app.locals.io;
      try {
        const result = await db.collection('products').deleteOne({
          _id: new require('mongodb').ObjectId(req.params.id),
        });
  
        if (result.deletedCount > 0) {
          io.emit('refresh-products', { action: 'delete', productId: req.params.id });
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Unable to delete product' });
      }
    }
  };
  