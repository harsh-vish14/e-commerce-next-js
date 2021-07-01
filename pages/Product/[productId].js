import ProductById from "../../components/productById/product";
import { db } from "../../lib/connectDB";

const ProductPage = ({ productId, productDetails }) => {
  return <ProductById productId={productId} productDetails={productDetails} />;
};

export const getServerSideProps = async (context) => {
  const { productId } = context.params;
  const productDetails = await db.collection("products").doc(productId);
  if (!(await productDetails.get()).exists) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productId,
      productDetails: (await productDetails.get()).data(),
    },
  };
};

export default ProductPage;
