import "antd/dist/antd.css";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
