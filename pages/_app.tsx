import "antd/dist/antd.css";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const MyApp: React.FC = ({ Component, pageProps }: any): JSX.Element => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
