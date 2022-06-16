import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
interface MeetupListProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
}
interface MeetUpProps {
  meetups: MeetupListProps[];
}

const MeetupList = (props: MeetUpProps) => {
  return (
    <ul className={classes.list}>
      {props.meetups?.length
        ? props.meetups.map((meetup: any) => (
            <MeetupItem
              key={meetup.id}
              id={meetup.id}
              image={meetup.image}
              title={meetup.title}
              address={meetup.address}
            />
          ))
        : []}
    </ul>
  );
};

export default MeetupList;
