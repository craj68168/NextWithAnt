import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import React from "react";
import { MongoClient } from "mongodb";
import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await fetch(`/api/getMeetup`, {
    method: "GET",
  });
  const result = await response.json();
  return result?.data?.length
    ? result?.data.map((data: any) => ({
        title: data?.title,
        description: data?.description,
        address: data?.address,
        image: data?.image,
        id: data?._id,
      }))
    : [];
};
const Home: React.FC = (props: any): JSX.Element => {
  const {
    data: meetupData,
    error,
    isLoading,
  } = useQuery(
    "meetupData",
    fetchData,
    { initialData: props.meetups },
    {
      onError: (err: any) => {
        console.log("react query error", err);
      },
      onSuccess: (data: any) => {
        console.log("react query success", data);
      },
    }
  );
  console.log("meetupData", meetupData);
  console.log("props.meetups ", props.meetups);

  return (
    <>
      <Head>
        <title>Meet Up</title>
        <meta name="description" content="next app for beginner" />
      </Head>
      <MeetupList meetups={meetupData} />
    </>
  );
};
export default Home;
export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.mongoClient);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: result?.length
        ? result.map((data: any) => ({
            title: data?.title,
            description: data?.description,
            address: data?.address,
            image: data?.image,
            id: data?._id.toString(),
          }))
        : [],
    },
    revalidate: 1,
  };
}
