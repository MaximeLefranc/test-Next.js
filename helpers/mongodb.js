// Mongo
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  // Connexion à MongoDB
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const client = await MongoClient.connect(URL);
  return client;
}
