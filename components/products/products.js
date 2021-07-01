import { useContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { ProductsContext } from "../../context/productsContext";
import { getAllCardsDetails } from "../../lib/gettingAndSetting";
import ProductCard from "./productCard";
import classes from "./products.module.scss";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const productsContext = useContext(ProductsContext);
  useEffect(async () => {
    if (productsContext.products.length > 0) {
      setLoading(false);
    }
    const result = await getAllCardsDetails();
    productsContext.setProducts(result.data);
    setLoading(false);
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
      {productsContext.products &&
        productsContext.products.map((card) => {
          return <ProductCard key={card.id} cardData={card} />;
        })}
    </div>
  );
};

export default Products;
