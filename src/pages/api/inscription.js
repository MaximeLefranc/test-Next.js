// Mongo DB
import { connectToDatabase } from 'helpers/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Constants
    const { email, pseudo, password } = req.body;

    // Verification that all inputs are not empty
    if (!email || !pseudo || !password) {
      res.status(422).json({
        message: 'Champ du formulaire manquant.',
      });
      return;
    }

    // Check email syntax
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!pattern.test(email)) {
      res.status(406).json({
        message: 'Votre adresse email est invalide',
      });
      return;
    }

    // Save the new user
    const newUser = {
      email,
      pseudo,
      password,
      created_at: new Date(),
    };

    // Connection to MongoDB
    let clientMongoDB;
    try {
      clientMongoDB = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        message: 'Erreur serveur, merci de réessayer ultérieurement.',
      });
      return;
    }

    const db = clientMongoDB.db();
    let mailAlreadyExist;
    // check if email adress doesn't exist in DB
    try {
      mailAlreadyExist = await db
        .collection('utilisateurs')
        .findOne({ email: email });
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({
        message: 'Un problème est survenu.',
      });
      return;
    }

    if (mailAlreadyExist) {
      clientMongoDB.close();
      res.status(403).json({
        message: "L'adresse mail existe déjà.",
      });
      return;
    }

    // Insert a new User
    try {
      await db.collection('utilisateurs').insertOne(newUser);
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({
        message: 'Un problème est survenu.',
      });
      return;
    }

    // Success
    clientMongoDB.close();
    res.status(201).json({
      message: 'Utilisateur enregistré avec succès.',
      user: newUser,
    });
  }
  res.status(405).json({
    message: 'Une erreur est survenue.',
  });
}
