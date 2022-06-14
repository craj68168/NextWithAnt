import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const DynamicRoutes = props => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.title} />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://rajchaudhary:staywithme@cluster0.lvls2.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: result?.length
      ? result?.map(data => ({
          params: {
            meetupId: data._id.toString(),
          },
        }))
      : [],
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    `mongodb+srv://rajchaudhary:staywithme@cluster0.lvls2.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return {
    props: {
      meetupData: {
        id: result._id.toString(),
        title: result.title,
        description: result.description,
        address: result.address,
        image: result.image,
      },
    },
  };
}

export default DynamicRoutes;
