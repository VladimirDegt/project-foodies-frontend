import styles from "./SectionSubtitle.module.css";
import cx from "classnames";

const SectionSubtitle = ({ text, customStyle }) => {
  return <h3 className={cx(styles.section_subtitle, customStyle)}>{text}</h3>;
};

export default SectionSubtitle;
