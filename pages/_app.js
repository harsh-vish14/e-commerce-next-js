import { Provider } from "next-auth/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import { UserDetailsContextProvider } from "../context/userDetailsContext";
import { ProductsContextProvider } from "../context/productsContext";
import NProgress from "nprogress";
import Router from "next/router";
import "../components/np.scss";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <UserDetailsContextProvider>
        <ProductsContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductsContextProvider>
      </UserDetailsContextProvider>
    </Provider>
  );
}

export default MyApp;
