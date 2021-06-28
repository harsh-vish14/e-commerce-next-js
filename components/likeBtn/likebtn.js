import { FiHeart } from "react-icons/fi";
import { useSession } from "next-auth/client";
import classes from "./likebtn.module.scss";
import { addLikeOrCart } from "../../lib/gettingAndSetting";
import { useContext } from "react";
import { userDetails } from "../../context/userDetailsContext";
const Like = ({ productId }) => {
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
    } else {
      userDetailsContext.removeLikeItems(productId);
      const result = await addLikeOrCart(
        session.user.userID,
        productId,
        "like",
        false
      );
    }
  };
  return (
    <div
      className={`${classes.like} ${
        userDetailsContext.like.includes(productId) && classes.likeActive
      }`}
      onClick={likeHandle}
    >
      <FiHeart />
    </div>
  );
};

export default Like;
