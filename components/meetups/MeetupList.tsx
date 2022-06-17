import classes from "./MeetupList.module.css";
import { Row, Col, Card, Button } from "antd";
import { useRouter } from "next/router";
const { Meta } = Card;
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
  const router = useRouter();
  const showDetailsHandler = (id: string) => {
    router.push(`/${id}`);
  };
  return (
    <div className={classes.list}>
      <div className="block featureBlock bgGray">
        <div className="container-fluid">
          <Row gutter={[16, 16]}>
            {props.meetups?.length
              ? props.meetups.map((meetup: any, i: number) => (
                  <Col span={8} key={i}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={meetup.title}
                          style={{
                            width: "100%",
                            height: "15rem",
                            overflow: "hidden",
                            borderTopRightRadius: "6px",
                            borderTopLeftRadius: "6px",
                          }}
                          src={meetup.image}
                        />
                      }
                    >
                      <Meta
                        title={meetup.title}
                        description={meetup.description}
                      />
                      <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        onClick={() => showDetailsHandler(meetup.id)}
                      >
                        Show Details
                      </Button>
                    </Card>
                  </Col>
                ))
              : []}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default MeetupList;
