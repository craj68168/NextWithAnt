import { MongoClient } from "mongodb";
async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(process.env.mongoClient);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    client.close();
    res.status(200).json({ message: "Inserted Successfully" });
  }
}
export default handler;
