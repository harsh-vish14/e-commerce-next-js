import { useState } from "react";
import { createContext } from "react";

export const userDetails = createContext({
  like: [],
  carts: [],
  addCartsItems: () => {},
  removeCartsItems: () => {},
  addLikeItems: () => {},
  removeLikeItems: () => {},
  setCartsItems: () => {},
  setLikesItems: () => {},
});

export const UserDetailsContextProvider = (props) => {
  const [likesItems, setLikesItems] = useState([]);
  const [cartsItems, setCartsItems] = useState([]);
  const addLikeItems = (itemId) => {
    setLikesItems((preve) => [...preve, itemId]);
  };
  const setCartsItemsHandler = (data) => {
    setCartsItems(data);
  };
  const setLikesItemsHandler = (data) => {
    setLikesItems(data);
  };
  const removeLikeItems = (itemId) => {
    const filteringList = likesItems.filter((item) => {
      if (item == itemId) return false;
      return true;
    });
    setLikesItems(filteringList);
  };
  const addCartsItems = (itemId) => {
    setCartsItems((preve) => [...preve, itemId]);
  };
  const removeCartsItems = (itemId) => {
    const filteringList = cartsItems.filter((item) => {
      if (item == itemId) return false;
      return true;
    });
    setCartsItems(filteringList);
  };
  const context = {
    like: likesItems,
    carts: cartsItems,
    addCartsItems: addCartsItems,
    removeCartsItems: removeCartsItems,
    addLikeItems,
    removeLikeItems: removeLikeItems,
    setCartsItems: setCartsItemsHandler,
    setLikesItems: setLikesItemsHandler,
  };
  return (
    <userDetails.Provider value={context}>
      {props.children}
    </userDetails.Provider>
  );
};
