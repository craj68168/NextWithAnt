import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import React from "react";

// import { useQuery } from "react-query";
const data = [
  {
    id: "m1",
    title: "First meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Jean_Broc_-_%22Death_of_general_Desaix%22.jpg",
    address: "Some places",
    description: "First Meet up ",
  },
  {
    id: "m2",
    title: "Second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Aragonite_crystal_-_Los_Molinillos%2C_Ceunca%2C_Spain_-_4x3.6x3.5cm_100g.jpg",
    address: "Some places again",
    description: "Second Meet up ",
  },
];
export default function Home() {
  return (
    <>
      <MeetupList meetups={data} />
    </>
  );
}
