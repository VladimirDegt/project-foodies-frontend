import styles from "./HeaderModal.module.css";
import { NavLink } from "react-router-dom";
import cx from "classnames";

const HeaderModal = ({handlerToogleModal}) => {

    const handlerClickOnLink = (e) => {
        if (e.target.tagName === "A") {
          handlerToogleModal();
        }
      };
  return (
    <div onClick={handlerClickOnLink}>
      <NavLink className={styles.logo_modal} to="/">
        foodies
      </NavLink>
      <nav className={styles.wrap_nav_link}>
        <ul>
          <li className={styles.item_nav_link}>
            <NavLink to="/" className={styles.nav_link_modal}>
              Home
            </NavLink>
          </li>
          <li className={styles.item_nav_link}>
            <NavLink to="/recipe/add" className={styles.nav_link_modal}>
              Add recipe
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.wrap_img_modal}>
        <div className={cx(styles.smole_img, styles.img_general)}></div>
        <div className={cx(styles.big_img, styles.img_general)}></div>
      </div>
    </div>
  );
};

export default HeaderModal;
