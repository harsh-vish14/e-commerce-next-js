import Image from "next/image";
import NumberFormat from "react-number-format";
import { AiTwotoneStar } from "react-icons/ai";
import classes from "./productCard.module.scss";
import Like from "../likeBtn/likebtn";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useContext, useState } from "react";
// import { updateProductCount } from "../../lib/gettingAndSetting";
import { userDetails } from "../../context/userDetailsContext";
import { useEffect } from "react";
import { addLikeOrCart } from "../../lib/gettingAndSetting";
import { useSession } from "next-auth/client";
const ProductCard = ({ cardData, cartProducts = false, key }) => {
  const [session, loading] = useSession();
  const userDetailsContext = useContext(userDetails);

  const removeItem = async () => {
    userDetailsContext.removeCartsItems(cardData.id);
    const result = await addLikeOrCart(
      session.user.userID,
      cardData.id,
      "cart",
      false
    );
  };
  return (
    <div className={classes.card}>
      <Link href={`product/${cardData.id}`}>
        <a>
          <div className={classes.cardImage}>
            <Image
              src={cardData.image}
              alt={cardData.title}
              height={200}
              width={200}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className={classes.cardTitle}>{cardData.title}</div>
          <div>
            <div className={classes.cardRating}>
              {[...Array(cardData.rating)].map((s, i) => (
                <AiTwotoneStar key={i} />
              ))}
            </div>
            <div className={classes.cardPrice}>
              <NumberFormat
                value={cardData.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
              />
            </div>
          </div>
        </a>
      </Link>
      <div className={classes.likebtn}>
        <Like productId={cardData.id} />
      </div>
      {cartProducts && (
        <div className={classes.cartBtn}>
          <div>
            <Button variant="danger" onClick={removeItem}>
              Remove from Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
