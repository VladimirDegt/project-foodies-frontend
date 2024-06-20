import { IngredientsList } from "./IngredientsList";
import styles from "./Ingredients.module.css";

export const RecipeIngredients = ({ ingredients }) => {
  return (
    <div>
      <h3 className={styles.ingredients_subtitel}>Ingredients</h3>
      <IngredientsList ingredients={ingredients} />
    </div>
  );
};
