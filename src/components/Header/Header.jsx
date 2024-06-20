import { useSelector } from "react-redux";
import cx from "classnames";
import { useState } from "react";
import styles from "./Header.module.css";
import stylesFromFooter from "../Footer/Footer.module.css";
import AuthToggle from "../shared/AuthToggle/AuthToggle";
import { selectToken } from "../../store/features/authSlice.js";
import { CustomModal } from "../shared";
import { LogOut } from "src/components";
import HeaderProfile from "./HeaderProfile";
import { NavLink, useLocation } from "react-router-dom";
import HeaderNav from "./HeaderNav";

const Header = () => {
  const [modalLogOutOpen, setModalLogOutOpen] = useState(false);
  const token = useSelector(selectToken);
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname.split("/")[1] === "category";
  const styleWhite = isHome && styles.color_white;
  return (
    <header className={cx(styles.header_wrap, !isHome && styles.header_wrap_bgc)}>
      <NavLink className={cx(stylesFromFooter.logo, styleWhite)} to="/" aria-label="Logo Foodies">
        <p>Foodies</p>
      </NavLink>
      {token && <HeaderNav isHome={isHome} />}
      {token ? (
        <HeaderProfile onClick={() => setModalLogOutOpen(true)} isHome={isHome} />
      ) : (
        <AuthToggle />
      )}
      <CustomModal isOpen={modalLogOutOpen} onClose={() => setModalLogOutOpen(false)}>
        <LogOut setModalLogOutOpen={setModalLogOutOpen} />
      </CustomModal>
    </header>
  );
};

export default Header;
