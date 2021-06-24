import Button from "react-bootstrap/Button";
import { FiSearch } from "react-icons/fi";
import classes from "./main.module.scss";
const Main = () => {
  return (
    <div className={classes.main}>
      <div className={classes.mainTitle}>
        <input type="text" placeholder="search..." />
        <Button variant="success">
          Search <FiSearch />
        </Button>
      </div>
    </div>
  );
};

export default Main;
