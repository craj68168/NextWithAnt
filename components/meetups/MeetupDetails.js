import classes from "./MeetupDetails.module.css";

const MeetupDetails = ({ title, image, description, address }) => {
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
