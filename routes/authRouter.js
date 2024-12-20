import express from 'express';
import { register, login, protect } from '../controllers/authController.js';

const authRouter = express.Router();

// Route pour l'inscription
authRouter.post('/register', register);

// Route pour la connexion
authRouter.post('/login', login);

// Exemple de route protégée (uniquement accessible avec un token valide)
authRouter.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'Accès autorisé', user: req.user });
});

export default authRouter;
