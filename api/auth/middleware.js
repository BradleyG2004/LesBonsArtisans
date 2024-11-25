const jwt = require('jsonwebtoken');

const JWT_SECRET = 'votre_secret'; // Utilisez le même secret que dans `controller.js`

module.exports = {
  authenticate: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Ajouter les informations utilisateur à `req`
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
};
