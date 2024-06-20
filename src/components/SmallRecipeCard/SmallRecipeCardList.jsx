import SmallRecipeCard from "./SmallRecipeCard";
import styles from "./SmallRecipeCard.module.css";

const SmallRecipeCardList = ({ data, tab }) => {
  return (
    <ul className={styles.recipeCardList}>
      {data.map((el) => (
        <SmallRecipeCard key={el._id} data={el} tab={tab} />
      ))}
    </ul>
  );
};

export default SmallRecipeCardList;
