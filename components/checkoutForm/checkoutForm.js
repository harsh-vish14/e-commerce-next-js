import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { destroyCookie } from "nookies";

const CheckOutForm = ({ paymentIntent }) => {
  const stripe = useStripe();
  const element = useElements();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        error,
        paymentIntent: { status },
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: element.getElement(CardElement),
        },
      });
      if (error) throw new Error(error);
      if (status === "succeeded") {
        console.log("Payment successful");
        destroyCookie(null, "paymentIntentId");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <form onSubmit={handlerSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;
