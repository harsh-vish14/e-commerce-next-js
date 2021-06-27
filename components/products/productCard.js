import Image from "next/image";
import NumberFormat from "react-number-format";
import { AiTwotoneStar } from "react-icons/ai";
import classes from "./productCard.module.scss";
const ProductCard = ({ cardData }) => {
  return (
    <div className={classes.card}>
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
          {[...Array(cardData.rating)].map(() => (
            <AiTwotoneStar />
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
      <div></div>
    </div>
  );
};

export default ProductCard;
