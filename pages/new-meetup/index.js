import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async data => {
    const response = await fetch(`/api/new-meetup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("return from mongodb", result);
    router.replace("/");
  };
  return (
    <>
      <Head>
        <title>Meetup Form</title>
        <meta name="description" content="Add your meetup content"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
