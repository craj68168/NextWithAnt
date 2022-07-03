import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
interface FormData {
  title: string;
  description: string;
  image: string;
  address: string;
}
const NewMeetup = () => {
  const addMeetupHandler = async (data: FormData) => {
    const response = await fetch(`/api/new-meetup`, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  };
  return (
    <>
      <Head>
        <title>Meetup Form</title>
        <meta name="description" content="Add your meetup content" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
