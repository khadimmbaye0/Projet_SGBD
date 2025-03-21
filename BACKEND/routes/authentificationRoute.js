const express = require('express');
const router = express.Router();
const authentificationController = require('../controllers/authentificationController');
const authentificationMiddleware = require('../middlewares/authentificationMiddleware');

//Route pour l'inscription

/**
 * @swagger
 * /api/authentification/inscription:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: NomTest0@esp.sn
 *               numero:
 *                 type: string
 *                 example: 2025MDHG
 *               mot_de_passe:
 *                 type: string
 *                 example: passer@2025
 *     responses:
 *       200:
 *         description: Compte créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/inscription', authentificationController.inscription);

//Route pour la connexion
/**
 * @swagger
 * /api/authentification/connexion:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               numero_etudiant:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Mot de passe ou rôle incorrect
 *       500:
 *         description: Erreur serveur
 */
router.post('/connexion', authentificationController.connexion);
router.post('/reinitialisation', authentificationController.reinitialisationMDP);
router.put('/mise-a-jour-mdp', authentificationController.misajourMDP);

module.exports = router;