import styles from "./Input.module.css";
import Icon from "../Icon/Icon.jsx";
import cx from "classnames";

export const Input = ({
  placeholder,
  iconId,
  type,
  togglePasswordVisibility,
  register,
  name,
  hasText,
  width,
  classname,
}) => {
  const handleClickEye = () => {
    togglePasswordVisibility();
  };

  if (!iconId)
    return (
      <input
        className={cx(styles.input, classname, `${hasText ? styles.hasText : ""}`)}
        placeholder={placeholder}
        type={type}
        {...register(name, { required: true })}
      />
    );

  return (
    <div className={styles.container}>
      <input
        className={cx(styles.input, classname, `${hasText ? styles.hasText : ""}`)}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
      {iconId && (
        <button className={styles.btn} onClick={handleClickEye} type="button">
          <Icon iconId={iconId} width={width} height={width} />
        </button>
      )}
    </div>
  );
};
