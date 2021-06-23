import Link from "next/link";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Image from 'next/image';
import { FiArrowLeft,FiArrowRight } from 'react-icons/fi';
import classes from "./home.module.scss";
import { useEffect, useState } from "react";
const Home = () => {
  const [index, setIndex] = useState(0);
  const images = [
    { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1750&q=80" },
    { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1689&q=80" },
    { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1750&q=80" }
  ]
  useEffect(() => {
    console.log(index);
  }, [index]);
  const properties = {
    prevArrow: <div className={`${classes.prev} ${classes.btn}`}><FiArrowLeft/></div>,
    nextArrow: <div className={`${classes.prev} ${classes.btn}`}><FiArrowRight /></div>,
    onChange: (previous, next) => {
      setIndex(next+1);
    }
  }

  return (
    <div className={classes.home}>
      <div className={classes.titleBox}>
        <div className={classes.title}>Get Everything to your doorsteps</div>
        <Link href="#products">
          <a>
            <div className={classes.btn}>
              Start Shopping
            </div>
          </a>
        </Link>
      </div>
      <div className={classes.showCase}>
        <div className="slide-container">
          <Fade {...properties}>
            <div className="each-fade">
              <div className={classes.image_container}>
                <Image src={images[0].url} height={300} width={500} objectFit='cover' layout='responsive' />
              </div>
            </div>
            <div className="each-fade">
              <div className={classes.image_container}>
                <Image src={images[1].url} height={300} width={500} objectFit='cover' layout='responsive' />                
              </div>
            </div>
            <div className="each-fade">
              <div className={classes.image_container}>
                <Image src={images[2].url} height={300} width={500} objectFit='cover' layout='responsive' />
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};


export default Home;
