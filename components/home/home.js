import Link from "next/link";
import { useEffect, useState } from "react";
import ControlledCarousel from "../carasole/carasole";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import classes from "./home.module.scss";
const Home = () => {
  const [index, setCurrentIndex] = useState(0);
  const nextHandler = () => {
    if (index < 2) {
      setCurrentIndex((preve) => preve + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const prevHandler = () => {
    if (index >= 1) {
      setCurrentIndex((preve) => preve - 1);
    } else {
      setCurrentIndex(2);
    }
  };
  return (
    <div className={classes.home}>
      <div className={classes.titleBox}>
        <div className={classes.title}>Get Everything to your doorsteps</div>
        <div>
          <Link href="#products">
            <a>
              <div className={classes.btn}>Start Shopping</div>
            </a>
          </Link>
        </div>
      </div>
      <div className={classes.showCase}>
        <ControlledCarousel imgIndex={index} setImagIndex={setCurrentIndex} />

        <div className={classes.btns}>
          <div className={classes.next} onClick={prevHandler}>
            <FiArrowLeft />
          </div>
          <div className={classes.numberIndicator}>{`${index + 1} / 3`}</div>
          <div className={classes.next} onClick={nextHandler}>
            <FiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
