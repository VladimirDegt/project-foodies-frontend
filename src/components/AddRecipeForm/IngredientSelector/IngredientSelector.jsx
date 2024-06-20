import { useState } from "react";
import styles from "./IngredientSelector.module.css";
import SelectShared from "../../shared/SelectShared/SelectShared";
import { Input } from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";
import IconButton from "../../shared/IconButton/IconButton";
import CookingTimeCounter from "../CookingTimeCounter/CookingTimeCounter";
import { Loader } from "../../shared/Loader/Loader";
import stylesInput from "../CustomInput.module.css";
import useAutoResizeTextarea from "../../../utilities/hooks/useAutoResizeTextarea";

const IngredientSelector = ({
  register,
  setValue,
  watch,
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
  errors,
  categories,
  areas,
  cookingTime,
  setCookingTime,
  isIngredientsLoading,
  isCategoriesLoading,
  isAreasLoading,
}) => {
  const [isIngredientListVisible, setIsIngredientListVisible] = useState(false);
  const ingredient = watch("ingredient");
  const measure = watch("measure");
  const addIngredient = () => {
    if (ingredient && measure) {
      const selectedIngredient = ingredients.find((item) => item._id === ingredient.value);

      setSelectedIngredients([
        ...selectedIngredients,
        {
          id: ingredient.value,
          measure,
          imageUrl: selectedIngredient.img,
          label: ingredient.label,
        },
      ]);
      setValue("ingredient", null);
      setValue("measure", "");
      setIsIngredientListVisible(true);
    }
  };

  const removeIngredient = (index) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
    if (selectedIngredients.length <= 1) {
      setIsIngredientListVisible(false);
    }
  };

  const renderLoader = (isLoading) => {
    return isLoading ? <Loader /> : null;
  };

  useAutoResizeTextarea(styles.textarea);

  return (
    <div className={styles.container}>
      <div className={`${stylesInput.form__group} ${stylesInput.field}`}>
        <textarea
          {...register("description")}
          name="description"
          maxLength="200"
          placeholder="Enter the description of the dish"
          id="description"
          className={`${stylesInput.form__field} ${styles.textarea}`}
          required
        />
        <label htmlFor="description" className={stylesInput.form__label}>
          Enter the description of the dish
        </label>
        <span className={styles.symbolCounter}>{watch("description")?.length || 0}/200</span>
      </div>
      {errors.description && <p className={styles.errorMsg}>{errors.description.message}</p>}
      <div className={styles.selectors_time_wrapp}>
        <div className={styles.categoryAndTime}>
          {renderLoader(isCategoriesLoading) || (
            <div>
              <label>Category</label>
              <SelectShared
                options={categories}
                placeholder="Select a category"
                {...register("category")}
                onChange={(selectedOption) => setValue("category", selectedOption.label)}
              />
              {errors.category && <p className={styles.errorMsg}>{errors.category.message}</p>}
            </div>
          )}
        </div>
        <div>
          <CookingTimeCounter cookingTime={cookingTime} setCookingTime={setCookingTime} />
          {errors.cookingTime && <p className={styles.errorMsg}>{errors.cookingTime.message}</p>}
        </div>
      </div>
      <div className={styles.categoryAndTime}>
        {renderLoader(isAreasLoading) || (
          <div>
            <label>Area</label>
            <SelectShared
              options={areas}
              placeholder="Select area"
              {...register("area")}
              onChange={(selectedOption) => setValue("area", selectedOption.label)}
            />
            {errors.area && <p className={styles.errorMsg}>{errors.area.message}</p>}
          </div>
        )}
      </div>
      <div className={styles.ingredientAndQuantity}>
        {isIngredientsLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <label>Ingredient</label>
            <SelectShared
              options={ingredients}
              placeholder="Select an ingredient"
              className={styles.select}
              {...register("ingredient")}
              onChange={(selectedOption) => setValue("ingredient", selectedOption)}
            />
            {errors.ingredient && <p className={styles.errorMsg}>{errors.ingredient.message}</p>}
          </div>
        )}

        <div className={`${stylesInput.form__group} ${stylesInput.field}`}>
          <Input
            type="text"
            name="measure"
            id="measure"
            register={register}
            placeholder="Enter quantity"
            classname={`${styles.inputQuantity} ${stylesInput.form__field}`}
          />
          <label className={stylesInput.form__label} htmlFor="measure">
            Enter quantity
          </label>
          {errors.measure && <p className={styles.errorMsg}>{errors.measure.message}</p>}
        </div>
      </div>
      {isIngredientListVisible && (
        <ul className={styles.list}>
          {selectedIngredients.map((ingredient, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.imageWrapper}>
                <img
                  src={ingredient.imageUrl}
                  alt={ingredient.label}
                  width="55px"
                  height="55px"
                  className={styles.image}
                />
              </div>
              <div className={styles.textWrapper}>
                <p>{ingredient.label}</p>
                <p>{ingredient.measure}</p>
              </div>
              <IconButton
                iconId="icon-close-btn"
                type="button"
                onClick={() => removeIngredient(index)}
                style={styles.iconBtn}
              />
            </li>
          ))}
        </ul>
      )}
      <Button
        text="Add ingredient"
        type="button"
        onClick={addIngredient}
        iconId="icon-plus"
        iconStyle={styles.addBtnIcon}
        classname={styles.buttonAdd}
      />
    </div>
  );
};

export default IngredientSelector;
