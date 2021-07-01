import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import { useSession } from "next-auth/client";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import NumberFormat from "react-number-format";
import { useContext } from "react";
import { userDetails } from "../../context/userDetailsContext";
import classes from "./product.module.scss";
import { addLikeOrCart } from "../../lib/gettingAndSetting";

const ProductById = ({ productId, productDetails }) => {
  const [session, loading] = useSession();
  const userDetailsContext = useContext(userDetails);
  const likeHandle = async () => {
    if (!userDetailsContext.like.includes(productId)) {
      userDetailsContext.addLikeItems(productId);
      const result = await addLikeOrCart(
        session.user.userID,
        productId,
        "like",
        true
      );
      return;
    }
    userDetailsContext.removeLikeItems(productId);
    const result = await addLikeOrCart(
      session.user.userID,
      productId,
      "like",
      false
    );
  };
  const addCartHandle = async () => {
    if (!userDetailsContext.carts.includes(productId)) {
      userDetailsContext.addCartsItems(productId);
      const result = await addLikeOrCart(
        session.user.userID,
        productId,
        "cart",
        true
      );
      return;
    }
  };
  return (
    <div className={classes.product}>
      <div className={classes.carousel}>
        <Carousel>
          {productDetails.images.map((image) => {
            return (
              <Carousel.Item key={image}>
                <div className={classes.carouselImage}>
                  <Image
                    src={image}
                    height={500}
                    width={500}
                    objectFit="cover"
                    layout="responsive"
                    loading="eager"
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className={classes.productInfo}>
        <div className={classes.title}>{productDetails.title}</div>
        <div className={classes.brand}>{productDetails.companyName}</div>
        <div>{productDetails.description}</div>
        <div className={classes.rating}>
          {[...Array(productDetails.rating)].map((s, i) => (
            <AiTwotoneStar key={i} />
          ))}
        </div>
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          <NumberFormat
            value={productDetails.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
        </div>
        <div className={classes.buttons}>
          {session ? (
            <>
              <div>
                <Button variant="warning" onClick={likeHandle}>
                  {userDetailsContext.like.includes(productId) === true
                    ? "Remove from favorites"
                    : "Add to favorites"}
                  <FiHeart />
                </Button>
              </div>
              <div>
                <Button
                  variant="success"
                  onClick={addCartHandle}
                  disabled={userDetailsContext.carts.includes(productId)}
                >
                  {userDetailsContext.carts.includes(productId) === true
                    ? "Added to cart "
                    : `Add to cart `}{" "}
                  <MdAddShoppingCart />
                </Button>
              </div>
            </>
          ) : (
            <div>Login</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductById;
