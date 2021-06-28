import { useSession } from "next-auth/client";
import { Fragment } from "react";
import Navbar from "../../components/navbar/navbar";
const Layout = (props) => {
  const [session, loading] = useSession();
  return (
    <Fragment>
      {!loading && <Navbar />}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
