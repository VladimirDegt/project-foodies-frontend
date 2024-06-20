import { useSelector } from "react-redux";
import { Icon } from "../../shared";
import styles from "./HeaderProfile.module.css";
import cx from "classnames";
import { selectId } from "../../../store/features/authSlice";
import { NavLink } from "react-router-dom";

const HeaderProfileMenu = ({ isHome, onClick, onClose }) => {
  const userId = useSelector(selectId);
  const blackStyle = !isHome && styles.color_black;
  return (
    <div className={cx(styles.wrap_profile_modal, !isHome && styles.wrap_profile_modal_recipe)}>
      <NavLink to={`/user/${userId}`} className={cx(styles.link, blackStyle)} onClick={onClose}>
        Profile
      </NavLink>
      <button
        type="button"
        className={cx(styles.link, styles.link_log_out, blackStyle)}
        onClick={onClick}
      >
        Log out
        <Icon
          iconId="icon-arrow-up-right"
          width="18"
          height="18"
          customStyle={cx(styles.icon_log_out)}
          stroke={isHome ? "#fff" : "#000"}
        />
      </button>
    </div>
  );
};

export default HeaderProfileMenu;
