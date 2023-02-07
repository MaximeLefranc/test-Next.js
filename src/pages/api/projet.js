// Mongo DB
import { connectToDatabase } from 'helpers/mongodb';

export default async function handler(req, res) {
  // Constants
  const { titre, slug, client, annee, description, contenu } = req.body;
  console.log(titre, slug, client, annee, description, contenu);
  // Verification that all inputs are not empty
  if (!titre || !slug || !client || !annee || !description || !contenu) {
    res.status(422).json({
      message: 'Champ du formulaire manquant.',
    });
    return;
  }

  // Save the new project
  const newProject = {
    titre,
    slug,
    client,
    annee,
    description,
    contenu,
    dateDePublication: new Date(),
  };

  // Connection to MongoDB
  let clientMongoDB;
  try {
    clientMongoDB = await connectToDatabase();
  } catch (error) {
    res.status(500).json({
      message: 'Erreur serveur, merci de reéssayer ultérieurement.',
    });
    return;
  }

  const db = clientMongoDB.db();

  // Insert a new project
  try {
    await db.collection('projets').insertOne(newProject);
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
    message: 'Projet ajouté avec succès.',
    project: newProject,
  });
}
