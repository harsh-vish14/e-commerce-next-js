import { useContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { ProductsContext } from "../../context/productsContext";
import { getAllCardsDetails } from "../../lib/gettingAndSetting";
import ProductCard from "./productCard";
import classes from "./products.module.scss";

const Products = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsContext = useContext(ProductsContext);
  useEffect(async () => {
    const result = await getAllCardsDetails();
    setLoading(false);
    setCardsData(result.data);
    productsContext.setProducts(result.data);
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
          return <ProductCard key={card.id} cardData={card} />;
        })}
    </div>
  );
};

export default Products;
