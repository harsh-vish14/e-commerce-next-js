import Stripe from "stripe";
import { parseCookies, setCookie } from "nookies";
import { getSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../components/checkoutForm/checkoutForm";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const CheckOutPage = ({ paymentIntent }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm paymentIntent={paymentIntent} />
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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let paymentIntent;
  const { paymentIntentId } = await parseCookies(context);
  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      props: {
        paymentIntent,
      },
    };
  }
  //   paymentIntent = await stripe.paymentIntents.create({
  //     amount: 20 * 100,
  //     currency: "INR",
  //   });
  //   setCookie(context, "paymentIntentId", paymentIntent.id);
  return {
    props: {
      paymentIntent,
    },
  };
};

export default CheckOutPage;
