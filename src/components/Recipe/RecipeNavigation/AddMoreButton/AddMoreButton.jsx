import cx from "classnames";
import styles from "./styles.module.css";

export const AddMoreButton = ({ onClick }) => {
  return (
    <button className={cx(styles["add-more-btn"])} type="button" onClick={onClick}>
      <span>All categories</span>
    </button>
  );
};
