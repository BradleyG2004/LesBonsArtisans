module.exports = {
    // createProduct: async (req, res) => {
    //   const db = req.app.locals.db;
    //   const io = req.app.locals.io;
    //   try {
    //     const result = await db.collection('products').insertOne(req.body);
    //     io.emit('raffraichissement-produits', { action: 'create', product: req.body });
    //     res.status(201).json(result);
    //   } catch (error) {
    //     res.status(500).json({ error: 'Unable to create product' });
    //   }
    // },
    createProduct: async (req, res) => {
      const db = req.app.locals.db;
      const io = req.app.locals.io;
      const getNextSequenceValue = req.app.locals.getNextSequenceValue;

    
      try {
        // Générer un nouvel ID séquentiel pour le produit
        const newId = await getNextSequenceValue(db, 'products');
    
        // Ajouter l'ID généré au corps de la requête
        const newProduct = { _id: newId, ...req.body };
    
        // Insérer le produit dans la base de données
        const result = await db.collection('products').insertOne(newProduct);
    
        // Notifier les clients via WebSocket
        io.emit('raffraichissement-produits', { action: 'create', product: newProduct });
    
        // Répondre au client
        res.status(201).json(newProduct);
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
      const { id } = req.params;
    
      let productId;
      try {
        productId = parseInt(id, 10); // Convertit l'ID en entier
        if (isNaN(productId)) {
          return res.status(400).json({ error: 'Invalid product ID format' });
        }
      } catch (err) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
    
      try {
        const product = await db.collection('products').findOne({ _id: productId });
    
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch product' });
      }
    }
    ,
  
    updateProduct: async (req, res) => {
      const db = req.app.locals.db;
      const io = req.app.locals.io;
      const { id } = req.params;
    
      let productId;
      try {
        // Convertir l'ID en entier
        productId = parseInt(id, 10);
        if (isNaN(productId)) {
          return res.status(400).json({ error: 'Invalid product ID format' });
        }
      } catch (err) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
    
      try {
        const result = await db.collection('products').updateOne(
          { _id: productId }, // Filtrer par ID entier
          { $set: req.body }  // Appliquer les modifications
        );
    
        if (result.matchedCount > 0) {
          // Émettre un événement de mise à jour via WebSocket
          io.emit('raffraichissement-produits', { action: 'update', productId, updates: req.body });
    
          res.status(200).json({ message: 'Product updated successfully' });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update product' });
      }
    },
  
    deleteProduct: async (req, res) => {
      const db = req.app.locals.db;
      const io = req.app.locals.io;
      const { id } = req.params;

      let productId;
      try {
        // Convertir l'ID en entier
        productId = parseInt(id, 10);
        if (isNaN(productId)) {
          return res.status(400).json({ error: 'Invalid product ID format' });
        }
      } catch (err) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      try {
        const result = await db.collection('products').deleteOne({
          _id: productId,
        });
  
        if (result.deletedCount > 0) {
          io.emit('raffraichissement-produits', { action: 'delete', productId: req.params.id });
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Unable to delete product' });
      }
    }
  };
  