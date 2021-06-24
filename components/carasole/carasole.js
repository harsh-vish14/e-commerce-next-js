import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "./carousel.module.scss";
import Image from "next/image";
function ControlledCarousel({ imgIndex, setImagIndex }) {
  // const [index, setIndex] = useState(0);
  // useEffect(() => {
  //   setIndex(index);
  // }, [imgIndex]);
  const handleSelect = (selectedIndex, e) => {
    setImagIndex(selectedIndex);
  };
  const images = [
    {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1750&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1689&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1750&q=80",
    },
  ];
  return (
    <Carousel activeIndex={imgIndex} onSelect={handleSelect} fade>
      <Carousel.Item>
        <div className={classes.image_container}>
          <Image
            src={images[0].url}
            height={300}
            width={500}
            objectFit="cover"
            layout="responsive"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className={classes.image_container}>
          <Image
            src={images[1].url}
            height={300}
            width={500}
            objectFit="cover"
            layout="responsive"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className={classes.image_container}>
          <Image
            src={images[2].url}
            height={300}
            width={500}
            objectFit="cover"
            layout="responsive"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
