import { db } from "../../lib/connectDB";

const addProductsHandler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_KEY
  ) {
    const data = req.body;
    if (!req.body) {
      res.status(433).json({ err: "invalid data passed" });
      return;
    }
    try {
      await db.collection("products").add(data);
    } catch (e) {
      res.status(433).json({ err: "unable to save data to db" });
    }
    res.status(200).json({ message: "data save successfully" });
  }
};

export default addProductsHandler;
