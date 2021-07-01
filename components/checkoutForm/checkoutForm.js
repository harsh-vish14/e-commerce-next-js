import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { destroyCookie } from "nookies";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import NumberFormat from "react-number-format";
import Button from "react-bootstrap/Button";
import classes from "./checkout.module.scss";
import { useRef } from "react";
import { useContext } from "react";
import { userDetails } from "../../context/userDetailsContext";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Link from "next/link";
import LottieAnimation from "../lottie";
import { removeAllItems } from "../../lib/gettingAndSetting";

const CheckOutForm = ({ paymentIntent, amount, email, session }) => {
  const UserDetailsContext = useContext(userDetails);
  const [showButton, setShowButton] = useState(false);
  const [segment, setSegment] = useState([0, 65]);
  const stripe = useStripe();
  const element = useElements();
  const username = useRef();
  const emailInput = useRef(email);
  const state = useRef();
  const pin = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const currentEmail = email;
    const currentUsername = username.current.value;
    const currentState = state.current.value;
    const currentPin = pin.current.value;
    if (currentEmail && currentUsername && currentState && currentPin) {
      handleShow();
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
          setSegment([70, 100]);
          UserDetailsContext.setCartsItems([]);
          destroyCookie(null, "paymentIntentId");
          setShowButton(true);
          const result = removeAllItems({
            userId: session.user.userID,
            operation: "cart",
          });
        } else {
          handleClose();
        }
      } catch (e) {
        handleClose();
        window.location.reload();
      }
    }
  };
  return (
    <div className={classes.checkoutForm}>
      <div>
        <form onSubmit={handlerSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={emailInput.current}
            />
            <Form.Text className="text-muted">
              We{`&apos;`}ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Your name</Form.Label>
            <Form.Control type="text" placeholder="Name" ref={username} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State name" ref={state} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pin code</Form.Label>
            <Form.Control type="number" placeholder="Pin code" ref={pin} />
          </Form.Group>
          <div className={classes.paymentInput}>
            <CardElement />
          </div>
          <Button variant="success" type="submit" disabled={!stripe}>
            Pay
            <NumberFormat
              value={amount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" ₹ "}
            />
          </Button>
        </form>
      </div>
      <div className={classes.image}>
        <Image
          src="/payment/payment.svg"
          height={300}
          width={300}
          layout="responsive"
        />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <LottieAnimation segment={segment} />
        </Modal.Body>
        {showButton && (
          <Link href="/">
            <a>
              <Button variant="success" style={{ margin: "20px" }}>
                continue Shopping
              </Button>
            </a>
          </Link>
        )}
      </Modal>
    </div>
  );
};

export default CheckOutForm;
