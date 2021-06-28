import ProductCard from "../products/productCard";
import classes from "./favorite.module.scss";

const Favorite = ({ favorites }) => {
  return (
    <div className={classes.Favorite}>
      {favorites.map((f) => {
        return <ProductCard cardData={f} key={f.id} />;
      })}
    </div>
  );
};

export default Favorite;
