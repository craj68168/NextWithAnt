import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import React from "react";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Meet Up</title>
        <meta name="description" content="next app for beginner"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://rajchaudhary:staywithme@cluster0.lvls2.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: result?.length
        ? result.map(data => ({
            title: data.title,
            description: data.description,
            address: data.address,
            image: data.image,
            id: data._id.toString(),
          }))
        : [],
    },
    revalidate: 10,
  };
}
