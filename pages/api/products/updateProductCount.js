import { db } from "../../../lib/connectDB";
import firebase from "firebase";

const updateProductCount = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_KEY
  ) {
    const { productId, count, userId } = req.body;
    if (!productId || !count) {
      res.status(200).json({ err: "Invalid Response" });
      return;
    }
    if (count <= 0) {
      res.status(404).json({ err: "Count is out of range" });
      return;
    }
    const userDb = await db.collection("users").doc(userId);
    if (!(await userDb.get()).exists) {
      res.status(404).json({ err: "user not found" });
      return;
    }
    const userData = await (await userDb.get()).data();
    await userDb.update({
      carts: userData.carts.map((item) => {
        if (productId === item.id) {
          return {
            id: productId,
            count: count,
          };
        } else {
          return item;
        }
      }),
    });
    res.status(200).json({ message: "update successfully" });
  }
};

export default updateProductCount;
