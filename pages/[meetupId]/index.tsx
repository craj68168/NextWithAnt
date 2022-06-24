import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
interface MeetupIdProps {
  title: string;
  description: string;
  image: string;
  address: string;
}
interface MeetupProps {
  meetupData: MeetupIdProps;
}
const DynamicRoutes = (props: MeetupProps) => {
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
// export async function getStaticPaths() {
//   const client = await MongoClient.connect(process.env.mongoClient);
//   const db = client.db();
//   const meetupsCollection = db.collection("meetups");
//   const result = await meetupsCollection.find({}, { _id: 1 }).toArray();
//   client.close();
//   return {
//     fallback: false,
//     paths: result?.length
//       ? result?.map((data: any) => ({
//           params: {
//             meetupId: data._id.toString(),
//           },
//         }))
//       : [],
//   };
// }
// export async function getStaticProps(context: GetStaticPropsContext) {
//   const meetupId = context.params.meetupId;
//   console.log("meetup id", meetupId);

//   const client = await MongoClient.connect(process.env.mongoClient);
//   const db = client.db();
//   const meetupsCollection = db.collection("meetups");
//   const result = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
//   client.close();
//   return {
//     props: {
//       meetupData: {
//         id: result._id.toString(),
//         title: result.title,
//         description: result.description,
//         address: result.address,
//         image: result.image,
//       },
//     },
//   };
// }
export async function getServerSideProps(context: GetStaticPropsContext){
  const meetupId = context.params.meetupId;
  console.log("meet up",meetupId);
  
  const client = await MongoClient.connect(process.env.mongoClient);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return {
    props: {
      meetupData: {
        id: result?._id?.toString(),
        title: result?.title,
        description: result?.description,
        address: result?.address,
        image: result?.image,
      },
    },
  };

}

export default DynamicRoutes;
