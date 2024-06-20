import styles from "./Title.module.css";
import cx from "classnames";

const Title = ({ text }) => {
  return <h1 className={cx(styles.title)}>{text}</h1>;
};

export default Title;
