// Mongo
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  // Connexion à MongoDB
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const dataBase = process.env.MONGODB_DB;
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.n3gaejm.mongodb.net/${dataBase}?retryWrites=true&w=majority`
  );
  return client;
}
