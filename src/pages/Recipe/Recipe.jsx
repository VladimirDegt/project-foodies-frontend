import { Navigate, useParams } from "react-router-dom";
import { RecipeInfo } from "../../components/RecipeInfo/RecipeInfo";
import { useGetRecipyByIdQuery } from "../../store/services/recipeService";
import { PopularRecipes } from "../../components/PopularRecipes/PopularRecipes";
import styles from "./Recipe.module.css";
import { useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { Loader } from "../../components/shared/Loader/Loader";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error: isError } = useGetRecipyByIdQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {isError && <Navigate to="/error500" replace={true} />}
      {!isError && (
        <main className={styles.main_container}>
          {recipe && <BreadCrumbs currentPage={recipe.data.title} />}
          {isLoading ? <Loader /> : <RecipeInfo recipe={recipe.data} />}
          <PopularRecipes />
        </main>
      )}
    </>
  );
};

export default Recipe;
