import { getSession } from "next-auth/client";
import Cart from "../../components/cart/cart";

const CartPage = ({ session }) => {
  return <Cart session={session} />;
};
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
export default CartPage;
