import { useContext, useState, useEffect } from "react";
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
export default FavoritePage;
