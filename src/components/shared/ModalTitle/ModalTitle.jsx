import styles from "./ModalTitle.module.css";
import cx from "classnames";

const ModalTitle = ({ text }) => {
    return <h2 className={cx(styles.modal_title)}>{text}</h2>;
};

export default ModalTitle;
