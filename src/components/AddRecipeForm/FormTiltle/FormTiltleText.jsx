import css from "./FormTiltle.module.css";
const FormTitleText = () => {
  return (
    <div className={css.formTitleWrapper}>
      {/* <h1 className={css.formTitle}> Add recipe</h1> */}
      <p className={css.fromDescription}>
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
        with us.
      </p>
    </div>
  );
};
export default FormTitleText;
