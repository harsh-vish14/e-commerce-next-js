import { db } from "../../../lib/connectDB";

const ClearProducts = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_KEY
  ) {
    const { userId, operation } = req.body;
    const userDB = await db.collection("users").doc(userId);
    if (!(await userDB.get()).exists) {
      res.status(200).json({ err: "user not found" });
      return;
    }

    switch (operation) {
      case "like":
        userDB.update({
          likes: [],
        });
        break;
      case "cart":
        userDB.update({
          carts: [],
        });
        break;
      default:
        res.status(404).send({ err: "invalid operation" });
        return;
    }
    res.status(200).json({ message: "updated successfully" });
  }
};

export default ClearProducts;
