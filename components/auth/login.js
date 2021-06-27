import GoogleButton from "react-google-button";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { signInWithCredentials } from "../../lib/gettingAndSetting";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import classes from "./login.module.scss";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [alertBoxState, setAlertBoxState] = useState({
    message: "Loading...",
    state: "secondary",
  });
  const router = useRouter();
  const [showAlertBox, setShowAlertBox] = useState(false);
  const googleSignedIn = async () => {
    await signIn("google");
  };
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const signInHandler = () => {
    setIsLogin(false);
  };
  const loginHandler = () => {
    setIsLogin(true);
  };
  const authUserHandler = async () => {
    setShowAlertBox(true);
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
      });
      if (!result.error) {
        setAlertBoxState({
          message: "Logged user successfully",
          state: "success",
        });
        router.push("/", undefined, { shallow: true });
      } else {
        setAlertBoxState({ message: result.error, state: "danger" });
      }
      setTimeout(() => {
        setShowAlertBox(false);
        setAlertBoxState({ message: "Loading...", state: "secondary" });
      }, 3000);
      email.current.value = "";
      password.current.value = "";
      return;
    }
    const result = await signInWithCredentials({
      name: username.current.value,
      email: email.current.value,
      password: password.current.value,
    });
    if (result.status === "error") {
      setAlertBoxState({ message: result.message, state: "danger" });
    } else {
      setAlertBoxState({
        message: result.message,
        state: "success",
      });
      setIsLogin(true);
    }
    email.current.value = "";
    password.current.value = "";
    setTimeout(() => {
      setShowAlertBox(false);
      setAlertBoxState({ message: "Loading...", state: "secondary" });
    }, 3000);
  };
  return (
    <div className={classes.login}>
      <div className={classes.loginPart}>
        <div className={classes.loginTitle}>
          {isLogin ? "Login" : "Sign In"}
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="username">Name</label>
            <input type="text" id="username" ref={username} />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={email} />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" id="Password" ref={password} />
        </div>
        <div>
          <Button variant="success" onClick={authUserHandler}>
            {isLogin ? "Login" : "Sign In"}
          </Button>
        </div>
        <div>
          {isLogin ? (
            <div className={classes.link} onClick={signInHandler}>
              New Here?
            </div>
          ) : (
            <div className={classes.link} onClick={loginHandler}>
              Having Account?
            </div>
          )}
          <div className={classes.separator}>
            <span>OR</span>
          </div>
          <div>
            <GoogleButton type="light" onClick={googleSignedIn} />
          </div>
        </div>
      </div>
      <div>
        <img src="/login.svg" />
        {showAlertBox && (
          <div className={classes.alertBox}>
            <Alert variant={alertBoxState.state}>{alertBoxState.message}</Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
