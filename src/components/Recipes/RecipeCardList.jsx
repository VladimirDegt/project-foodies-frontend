import RecipeCard from "../PopularRecipes/RecipeCard/RecipeCard";
import styles from "./Recipes.module.css";

export const RecipeCardList = ({ recipes }) => {
  const { data } = recipes;

  return (
    <ul className={styles.recipes_search_wrapp}>
      {data.map((recipe) => {
        return <RecipeCard key={recipe._id} recipe={recipe} />;
      })}
    </ul>
  );
};
