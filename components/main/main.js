import Products from "../products/products";
import classes from "./main.module.scss";
const Main = () => {
  return (
    <div className={classes.main} id="main">
      <Products />
    </div>
  );
};

export default Main;
