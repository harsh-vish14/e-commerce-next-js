import NavLink from "./navLink";
import Image from "next/image";
import classes from "./navbar.module.scss";
const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div classes={classes.logo}>
        <Image src="/logo/logo.svg" height="30" width="50" />
      </div>
      <div className={classes.navlinks}>
        <div>
          <NavLink href="/" text="Home" />
        </div>
        <div>
          <NavLink href="/auth/login" text="Login/signIn" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
