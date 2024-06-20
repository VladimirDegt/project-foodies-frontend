import { OwnerCard } from "./OwnerCard/OwnerCard";
import { TagList } from "./Tag/TagList";
import styles from "./RecipeMainInfo.module.css";

export const RecipeMainInfo = ({ data }) => {
  const { area, category, time, title, description, owner } = data;

  return (
    <div className={styles.recipe_main_info_wrapper}>
      <h3 className={styles.recipe_header}>{title}</h3>
      <TagList tags={{ area, category, time }} />
      <p className={styles.recipe_description}>{description}</p>
      <OwnerCard owner={owner} />
    </div>
  );
};
