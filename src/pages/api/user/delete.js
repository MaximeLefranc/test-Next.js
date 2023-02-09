// Auth
import { getSession } from 'next-auth/client';

// Mongo DB
import { connectToDatabase } from 'helpers/mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({
        message: 'impossible de vous authentifier.',
      });
      return;
    }

    let clientMongoDB;
    try {
      clientMongoDB = await connectToDatabase();
    } catch {
      res.status(500).json({
        message: 'Une erreur est survenue, merci de réessayer ultérieurement.',
      });
      return;
    }

    const db = clientMongoDB.db();
    try {
      await db
        .collection('utilisateurs')
        .deleteOne({ email: session.user.email });
    } catch {
      res.status(500).json({
        message: 'Impossible de supprimer cet utilisateur.',
      });
      clientMongoDB.close();
      return;
    }

    res.status(200).json({
      message: 'Utilisateur supprimé avec succès.',
    });
  }
  res.status(403).json({
    message: 'Votre requête est invalide.',
  });
}
