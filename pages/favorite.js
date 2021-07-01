import { useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import Favorite from "../components/favorite/favorite";
import { ProductsContext } from "../context/productsContext";
import { userDetails } from "../context/userDetailsContext";

const FavoritePage = () => {
  const productsContext = useContext(ProductsContext);
  const userDetailsContext = useContext(userDetails);
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    setFavorite(
      productsContext.products.filter((product) => {
        return userDetailsContext.like.includes(product.id);
      })
    );
  }, [userDetailsContext.like]);
  return <Favorite favorites={favorite} />;
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

  return { props: {} };
};
export default FavoritePage;
