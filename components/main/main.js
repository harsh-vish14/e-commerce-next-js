import Products from "../products/products";
import classes from "./main.module.scss";
const Main = () => {
  return (
    <div className={classes.main} id="main">
      {/* <div className={classes.mainTitle}>
        <input type="text" placeholder="search..." />
        <Button variant="success">
          Search <FiSearch />
        </Button>
      </div> */}
      <Products />
    </div>
  );
};

export default Main;
