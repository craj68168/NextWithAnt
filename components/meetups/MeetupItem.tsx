import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";
interface MeetupItems {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
}
function MeetupItem(props: MeetupItems) {
  const router = useRouter();
  const showDetailsHandler = (e: any) => {
    e.preventDefault();
    router.push(`/${props.id}`);
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={(e: any) => showDetailsHandler(e)}>
            Show Details
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
