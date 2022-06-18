import PuffLoader from "react-spinners/PuffLoader";
export const MySpinner = ({ loading }: any) => {
  return (
    <>
      <section
        className="content  text-dark"
        style={{
          textAlign: "center",
          marginTop: "250px",
          marginBottom: "300px",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <PuffLoader
                // color={"#ffffff"}
                loading={loading}
                // css={override}
                size={150}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
