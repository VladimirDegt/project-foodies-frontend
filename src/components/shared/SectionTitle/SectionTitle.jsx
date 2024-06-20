import styles from "./SectionTitle.module.css";
import cx from "classnames";

const SectionTitle = ({ text, addStyle='' }) => {
  return <h2 className={cx(styles.section_title , addStyle)}>{text}</h2>;
};

export default SectionTitle;
