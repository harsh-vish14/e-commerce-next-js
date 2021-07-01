import Stripe from "stripe";
import { parseCookies, setCookie } from "nookies";
import { getSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../components/checkoutForm/checkoutForm";
import { db } from "../../lib/connectDB";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const CheckOutPage = ({ paymentIntent, amount, email, session }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm
        paymentIntent={paymentIntent}
        amount={amount}
        session={session}
        email={email}
      />
    </Elements>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (session.user.userID !== context.params.userId) {
    return {
      notFound: true,
    };
  }
  const userDB = await db.collection("users").doc(session.user.userID).get();
  if (!userDB.exists) {
    return {
      notFound: true,
    };
  }
  const userCart = userDB.data().carts;
  const productDB = await db.collection("products").get();
  const allProducts = productDB.docs.map((product) => {
    return {
      id: product.id,
      price: product.data().price,
    };
  });
  let amount = 0;
  allProducts
    .filter((cartItem) => {
      return userCart.includes(cartItem.id);
    })
    .map((cartItem) => {
      amount = amount + cartItem.price;
    });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let paymentIntent;
  const { paymentIntentId } = await parseCookies(context);
  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      props: {
        paymentIntent,
        amount,
        email: userDB.data().email,
        session,
      },
    };
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "INR",
    receipt_email: userDB.data().email,
  });
  setCookie(context, "paymentIntentId", paymentIntent.id);
  return {
    props: {
      paymentIntent,
      amount,
      email: userDB.data().email,
      session,
    },
  };
};

export default CheckOutPage;
