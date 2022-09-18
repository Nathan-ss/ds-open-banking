import { Db, MongoClient, Collection } from "mongodb";

interface ConnectType {
  client: MongoClient;
  db: Db;
}
let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase(): Promise<ConnectType> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {});

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}
