import Layout from "@/components/layouts/layout";
import store from "@/context";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
