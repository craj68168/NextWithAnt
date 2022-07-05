import MeetupList from "../../components/meetups/MeetupList";
import { MySpinner } from "../../components/Spinner";
import Head from "next/head";
import React, { useEffect } from "react";
import { MongoClient } from "mongodb";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "../../node_modules/next/router";
import { AuthContextProvider } from "../../context/AuthContext";
interface ArrayData {
  title: string;
  description: string;
  address: string;
  image: string;
  _id: string;
}
interface InitialData {
  meetups: ArrayData[];
}

const fetchData = async () => {
  const response = await fetch(`/api/getMeetup`, {
    method: "GET",
  });
  const result = await response.json();
  return result?.data?.length
    ? result?.data.map((data: ArrayData) => ({
      title: data?.title,
      description: data?.description,
      address: data?.address,
      image: data?.image,
      id: data?._id,
    }))
    : [];
};
const Dashboard = (props: InitialData): JSX.Element => {

  const {user } = AuthContextProvider()
  const {
    data: meetupData,
    error,
    isLoading,
  } = useQuery(
    "meetupData",
    fetchData,
    // { initialData: props.meetups },
    {
      onError: (err: any) => {
        toast.error("Something Went Wrong");
      },
      onSuccess: () => {
        
      },
    }
  );
  const router = useRouter()
 


  return (
    <>
      <Head>
        <title>Meet Up</title>
        <meta name="description" content="next app for beginner" />
      </Head>
      {isLoading ? (
        <MySpinner loading={isLoading} />
      ) : (
        <MeetupList meetups={meetupData} />
      )}
    </>

  )
}

export default Dashboard

// export async function getStaticProps() {
//   const client = await MongoClient.connect(process.env.mongoClient);
//   const db = client.db();
//   const meetupsCollection = db.collection("meetups");
//   const result = await meetupsCollection.find().toArray();
//   client.close();

//   return {
//     props: {
//       meetups: result?.length
//         ? result.map((data: any) => ({
//             title: data?.title,
//             description: data?.description,
//             address: data?.address,
//             image: data?.image,
//             id: data?._id.toString(),
//           }))
//         : [],
//     },
//     revalidate: 1,
//   };
// }
