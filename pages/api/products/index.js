import { db } from "../../../lib/connectDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const products = await db.collection("products").get();
    const allProducts = products.docs.map((product) => {
      return {
        id: product.id,
        rating: product.data().rating,
        title: product.data().title,
        image: product.data().images[0],
        price: product.data().price,
      };
    });
    res.status(200).json(allProducts);
  }
};

export default handler;
