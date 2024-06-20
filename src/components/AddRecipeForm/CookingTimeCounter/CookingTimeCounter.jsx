import IconButton from "../../shared/IconButton/IconButton";
import styles from "./CookingTimeCounter.module.css";

const CookingTimeCounter = ({ cookingTime, setCookingTime }) => {
  const incrementCookingTime = () => {
    setCookingTime((prevTime) => prevTime + 10);
  };

  const decrementCookingTime = () => {
    setCookingTime((prevTime) => (prevTime > 10 ? prevTime - 10 : 10));
  };

  return (
    <div>
      <label>Cooking Time</label>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <IconButton
          iconId="icon-minus"
          width="16"
          height="16"
          type="button"
          style={styles.iconBtn}
          styleSVG={styles.icon}
          onClick={decrementCookingTime}
        />

        <div>
          <span style={{ margin: "0 12px" }}>{cookingTime} min</span>
        </div>

        <IconButton
          iconId="icon-plus"
          type="button"
          width="16"
          height="16"
          style={styles.iconBtn}
          styleSVG={styles.icon}
          onClick={incrementCookingTime}
        />
      </div>
    </div>
  );
};

export default CookingTimeCounter;
