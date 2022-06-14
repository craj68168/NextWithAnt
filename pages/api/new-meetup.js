import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      `mongodb+srv://rajchaudhary:staywithme@cluster0.lvls2.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log("mongodb", result);
    client.close();
    res.status(200).json({ message: "Inserted Successfully" });
  }
}
export default handler;
