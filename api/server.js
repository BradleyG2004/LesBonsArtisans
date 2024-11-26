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
const io = new Server(server, {
  cors: {
      origin: 'http://localhost:3001', // URL du front-end
      methods: ['GET', 'POST'],
      credentials: true,
  },
});

const port = process.env.PORT || 3000;
const mongoURI ='mongodb://localhost:27017/LBA';

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3001', // URL du front-end
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true, // Si vous utilisez des cookies ou sessions
}));

let db;

app.locals.io = io;

// Middleware
app.use(bodyParser.json());

// Connexion MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.locals.db = mongoose.connection;
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
