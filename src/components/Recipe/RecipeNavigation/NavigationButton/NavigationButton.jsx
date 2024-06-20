import { NavLink } from "react-router-dom";
import Icon from "src/components/shared/Icon/Icon.jsx";
import cx from "classnames";

import styles from "./styles.module.css";

export const NavigationButton = ({ category, url, imgUrl, imgUrl2x }) => {
  const isRetina = window.devicePixelRatio > 1;
  const backgroundImage = isRetina && imgUrl2x ? imgUrl2x : imgUrl;

  return (
    <NavLink
      className={cx(styles["recept-nav-btn"])}
      to={url}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={cx(styles["labels-wrap"])}>
        <p className={cx(styles["category"])}>{category}</p>
        <div className={cx(styles["icon-wrap"])}>
          <Icon
            customStyle={cx(styles["icon"])}
            iconId={"icon-arrow-up-right"}
            width={20}
            height={20}
          />
        </div>
      </div>
    </NavLink>
  );
};
