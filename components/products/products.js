import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { getAllCardsDetails } from "../../lib/gettingAndSetting";
import ProductCard from "./productCard";
import classes from "./products.module.scss";

const Products = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const result = await getAllCardsDetails();
    setLoading(false);
    console.log(result.data);
    setCardsData(result.data);
  }, []);
  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className={classes.products}>
      {cardsData &&
        cardsData.map((card) => {
          {
            /* console.log(card); */
          }
          return <ProductCard key={card.id} cardData={card} />;
        })}
    </div>
  );
};

export default Products;
