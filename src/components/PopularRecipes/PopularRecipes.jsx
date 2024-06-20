import { useGetPopularRecipeQuery } from "../../store/services/recipeService";
import { PopularRecipesList } from "./PopularRecipesList";
import styles from "./PopularRecipes.module.css";
import { Loader } from "../shared/Loader/Loader";
import { Navigate } from "react-router-dom";

export const PopularRecipes = () => {
  const { data: popularRecipes, isLoading, error: isError } = useGetPopularRecipeQuery();

  return (
    <section className={styles.popular_recipes_container}>
      {isError && <Navigate to="/error500" replace={true} />}
      <h3 className={styles.header_popular_recipes}>Popular recipes</h3>
      {!isError && isLoading ? <Loader /> : <PopularRecipesList recipes={popularRecipes} />}
    </section>
  );
};
