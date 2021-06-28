import { db } from "../../../lib/connectDB";
import firebase from "firebase";
const operationHandler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_KEY
  ) {
    const { userId, productId, operation, wantToAdd } = req.body;
    if (!userId || !productId || !operation) {
      res.status(422).json({ err: "invalid response" });
      return;
    }
    const user = await db.collection("users").doc(userId);
    if (!(await user.get()).exists) {
      res.status(404).json({ err: "User not found" });
      return;
    }
    const product = await db.collection("products").doc(productId);
    if (!(await product.get()).exists) {
      res.status(404).json({ err: "Product not found" });
      return;
    }

    switch (operation) {
      case "like":
        if (wantToAdd) {
          user.update({
            likes: firebase.firestore.FieldValue.arrayUnion(product.id),
          });
        } else {
          user.update({
            likes: firebase.firestore.FieldValue.arrayRemove(product.id),
          });
        }
        break;
      case "cart":
        if (wantToAdd) {
          user.update({
            carts: firebase.firestore.FieldValue.arrayUnion(product.id),
          });
        } else {
          user.update({
            carts: firebase.firestore.FieldValue.arrayRemove(product.id),
          });
        }
        break;
      default:
        res.status(404).json({ err: "invalid operation" });
        return;
    }
    res.status(200).json({ err: "updated successfully" });
  }
};
export default operationHandler;
