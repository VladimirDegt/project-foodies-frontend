import { IngredientsItem } from "./IngredientsItem";
import styles from "./Ingredients.module.css";

export const IngredientsList = ({ ingredients }) => {
  return (
    <ul className={styles.ingredients_list}>
      {ingredients.map(({ ingredient, mesure }) => (
        <IngredientsItem
          key={ingredient._id}
          pathImg={ingredient.img}
          name={ingredient.name}
          mesure={mesure}
        />
      ))}
    </ul>
  );
};
