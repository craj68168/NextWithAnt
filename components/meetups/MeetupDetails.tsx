import classes from "./MeetupDetails.module.css";
interface MeetupItems {
  image: string;
  title: string;
  description: string;
  address: string;
}
const MeetupDetails = ({
  title,
  image,
  description,
  address,
}: MeetupItems): JSX.Element => {
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetails;
