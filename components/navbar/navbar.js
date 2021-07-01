import NavLink from "./navLink";
import { FiMenu } from "react-icons/fi";
import { MdClose, MdAddShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Image from "next/image";
import { signOut } from "next-auth/client";
import classes from "./navbar.module.scss";
import Button from "react-bootstrap/Button";
import { userDetails } from "../../context/userDetailsContext";
import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import { getUserDetails } from "../../lib/gettingAndSetting";
const Navbar = () => {
  const userDetailsContext = useContext(userDetails);
  const [session, loading] = useSession();
  useEffect(async () => {
    if (!loading && session) {
      const result = await getUserDetails(session.user.userID);

      userDetailsContext.setLikesItems(result.data.likes || []);
      console.log(result.data.carts);
      userDetailsContext.setCartsItems(result.data.carts || []);
    }
  }, [loading]);

  const logoutHandler = () => {
    signOut();
  };
  return (
    <div className={classes.navbar}>
      <div classes={classes.logo}>
        <Link href="/">
          <a>
            <Image src="/logo/logo.svg" height="30" width="50" />
          </a>
        </Link>
      </div>
      <div className={classes.navlinks}>
        <div className={classes.navlinksPc}>
          <NavLink href="/" text="Home" />
        </div>
        {session ? (
          <div>
            <div className={`${classes.navlinks}`}>
              <div className={classes.navlinksPc}>
                <Link href="/favorite">
                  <a>
                    <AiOutlineHeart />
                    <label>
                      {userDetailsContext.like.length > 9
                        ? "9+"
                        : userDetailsContext.like.length}
                    </label>
                  </a>
                </Link>
              </div>
              <div className={classes.navlinksPc}>
                <Link href="/cart">
                  <a>
                    <MdAddShoppingCart />
                    <label>
                      {userDetailsContext.carts.length > 9
                        ? "9+"
                        : userDetailsContext.carts.length}
                    </label>
                  </a>
                </Link>
              </div>
              <div className={classes.logoutPC} onClick={logoutHandler}>
                <Button variant="danger">
                  <div className={classes.logout}>Logout</div>
                </Button>
              </div>
            </div>
            <div className={classes.mobileLinks}>
              <Menu
                menuButton={({ open }) => (
                  <MenuButton>{open ? <MdClose /> : <FiMenu />}</MenuButton>
                )}
              >
                <MenuItem>
                  <NavLink href="/" text="Home" />
                </MenuItem>
                <MenuItem>
                  <Link href="/favorite">
                    <a>
                      <div className={classes.navlinksIcon} counter={1}>
                        <AiOutlineHeart />
                        <label>
                          {userDetailsContext.like > 9
                            ? "9+"
                            : userDetailsContext.like}
                        </label>
                      </div>
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/cart">
                    <a>
                      <div className={classes.navlinksIcon}>
                        <MdAddShoppingCart />
                        <label>
                          {userDetailsContext.carts > 9
                            ? "9+"
                            : userDetailsContext.carts}
                        </label>
                      </div>
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Button variant="danger" onClick={logoutHandler}>
                    <div className={classes.logout}>Logout</div>
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          </div>
        ) : (
          <div>
            <div className={classes.mobileLinks}>
              <Menu
                menuButton={({ open }) => (
                  <MenuButton>{open ? <MdClose /> : <FiMenu />}</MenuButton>
                )}
              >
                <MenuItem>
                  <NavLink href="/" text="Home" />
                </MenuItem>
                <MenuItem>
                  <NavLink href="/auth/login" text="Login/signIn" />
                </MenuItem>
              </Menu>
            </div>
            <div className={classes.navlinksPc}>
              <NavLink href="/auth/login" text="Login/signIn" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
