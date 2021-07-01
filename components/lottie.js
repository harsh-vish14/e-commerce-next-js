import { useLottie } from "lottie-react";
import payment from "../animation/payment.json";
const style = {
  height: 300,
};
const LottieAnimation = ({ segment }) => {
  const options = {
    animationData: payment,
    loop: true,
    autoplay: true,
    initialSegment: segment,
  };
  const { View } = useLottie(options, style);
  return View;
};
export default LottieAnimation;
