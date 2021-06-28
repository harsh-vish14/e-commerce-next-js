import { useState } from "react";
import { createContext } from "react";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
});

export const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const setProductHandler = (data) => {
    setProducts(data);
  };
  const context = {
    products,
    setProducts: setProductHandler,
  };
  return (
    <ProductsContext.Provider value={context}>
      {props.children}
    </ProductsContext.Provider>
  );
};
