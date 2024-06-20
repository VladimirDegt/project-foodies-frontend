import { toast } from "react-toastify";

const customId = "toastId";

const handleFavorite = async (funcName, recipeID, action, setFunc) => {
  try {
    await funcName(recipeID).unwrap();
    toast.success(`Recipe ${action === "add" ? "added to" : "deleted from"} favorites!`, {
      toastId: customId,
    });
    action === "add" ? setFunc(true) : setFunc(false);
  } catch (error) {
    console.error("Failed to add recipe to favorites: ", error);
  }
};

export default handleFavorite;

/*
Функція handleFavorite призначена для спрощення обробки додавання та видалення рецептів із вибраного. 
Вона приймає три параметри: функцію мутації, ідентифікатор рецепту та дію яку треба зробити - додавання(add) або видалення(delete)). 
Ось як її використовувати:
  <Button
    text="add to favorite"
    variant="add_favorite"
    onClick={() => handleFavorite(addFavoriteRecipe, _id, "add", setStateFunction)}
  />

  <Button
    text="delete from favorite"
    variant="remove_favorite"
    onClick={() => handleFavorite(removeFavoriteRecipe, _id, "delete", setStateFunction)}
  />

*/
