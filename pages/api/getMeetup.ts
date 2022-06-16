import { MongoClient } from "mongodb";
async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.mongoClient);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.find().toArray();
    client.close();
    res.status(200).json({ message: "Inserted Successfully", data: result });
  }
}
export default handler;
