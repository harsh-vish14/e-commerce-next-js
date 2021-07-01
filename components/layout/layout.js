import { useSession } from "next-auth/client";
import Head from "next/head";
import { Fragment } from "react";
import Navbar from "../../components/navbar/navbar";
const Layout = (props) => {
  const [session, loading] = useSession();
  return (
    <Fragment>
      <Head>
        <title>E-commerce-hv</title>
        <link rel="stylesheet" type="image/svg" href="/logo/logo.svg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="A E-Commerce where u get every thing to your doorsteps"
        ></meta>
      </Head>
      {!loading && <Navbar />}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
