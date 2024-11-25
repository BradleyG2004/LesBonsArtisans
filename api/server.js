require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./products/routes');
const authRoutes = require('./auth/routes');
const { authenticate } = require('./auth/middleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;  // Mettre 3000 ici, puisque c'est le port que vous souhaitez
const mongoURI ='mongodb://localhost:27017/LBA';


let db;

app.locals.io = io;

// Middleware
app.use(bodyParser.json());

// Connexion MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', authenticate, productRoutes);

// WebSocket -> Gestion des connexions clients
io.on('connection', (socket) => {
  console.log('Utilisateur connecté:', socket.id);

  // Déconnexion
  socket.on('deconnexion', () => {
    console.log('Utilisateur déconnecté:', socket.id);
  });

  // Écouter les événements (par exemple, mise à jour d'un produit)
  socket.on('produit mis à jour', (data) => {
    console.log('Produit mis à jour', data);
    // Diffuser l'information à tous les clients connectés
    io.emit('raffraichissement-produits', data);
  });
});

// Lancer le serveur
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
