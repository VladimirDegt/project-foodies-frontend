import { RecipeNavigation } from "src/components/Recipe";
import styles from "./Categories.module.css";

export const Categories = () => {
  return (
    <section className={styles.categories_section}>
      <div className={styles.categories_info_wrapp}>
        <h2 className={styles.categories_title}>Categories</h2>
        <p className={styles.categories_description}>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
          combine taste, style and the warm atmosphere of the kitchen.
        </p>
      </div>
      <RecipeNavigation />
    </section>
  );
};
