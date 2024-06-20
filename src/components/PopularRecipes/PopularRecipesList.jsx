import styles from "./PopularRecipes.module.css";
import RecipeCard from "./RecipeCard/RecipeCard";

export const PopularRecipesList = ({ recipes }) => {
  const { data } = recipes;

  return (
    <ul className={styles.popular_recipes_list}>
      {data.map(({ recipe }) => {
        return <RecipeCard key={recipe._id} recipe={recipe} />;
      })}{" "}
    </ul>
  );
};
