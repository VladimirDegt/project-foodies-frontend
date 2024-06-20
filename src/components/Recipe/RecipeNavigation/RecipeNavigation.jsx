import { useState } from "react";
import cx from "classnames";
import { AddMoreButton } from "src/components/Recipe/RecipeNavigation/AddMoreButton/AddMoreButton";
import { NavigationButton } from "src/components/Recipe/RecipeNavigation/NavigationButton/NavigationButton";
import beef from "src/assets/categories/categories-beef.jpg";
import beef2x from "src/assets/categories/categories-beef@2x.jpg";
import breakfast from "src/assets/categories/categories-breakfast.jpg";
import breakfast2x from "src/assets/categories/categories-breakfast@2x.jpg";
import desserts from "src/assets/categories/categories-desserts.jpg";
import desserts2x from "src/assets/categories/categories-desserts@2x.jpg";
import goat from "src/assets/categories/categories-goat.jpg";
import goat2x from "src/assets/categories/categories-goat@2x.jpg";
import lamb from "src/assets/categories/categories-lamb.jpg";
import lamb2x from "src/assets/categories/categories-lamb@2x.jpg";
import miscellaneous from "src/assets/categories/categories-miscellaneous.jpg";
import miscellaneous2x from "src/assets/categories/categories-miscellaneous@2x.jpg";
import pasta from "src/assets/categories/categories-pasta.jpg";
import pasta2x from "src/assets/categories/categories-pasta@2x.jpg";
import pork from "src/assets/categories/categories-pork.jpg";
import pork2x from "src/assets/categories/categories-pork@2x.jpg";
import seafood from "src/assets/categories/categories-seafood.jpg";
import seafood2x from "src/assets/categories/categories-seafood@2x.jpg";
import side from "src/assets/categories/categories-side.jpg";
import side2x from "src/assets/categories/categories-side@2x.jpg";
import starter from "src/assets/categories/categories-starter.jpg";
import starter2x from "src/assets/categories/categories-starter@2x.jpg";
import vegan from "src/assets/categories/categories-vegan.jpg";
import vegan2x from "src/assets/categories/categories-vegan@2x.jpg";
import vegetarian from "src/assets/categories/categories-vegetarian.jpg";
import vegetarian2x from "src/assets/categories/categories-vegetarian@2x.jpg";

import styles from "./styles.module.css";

const CATEGORIES = [
  {
    category: "Beef",
    url: "/category/beef",
    imgUrl: beef,
    imgUrl2x: beef2x,
  },
  {
    category: "Breakfast",
    url: "/category/breakfast",
    imgUrl: breakfast,
    imgUrl2x: breakfast2x,
  },
  {
    category: "Desserts",
    url: "/category/dessert",
    imgUrl: desserts,
    imgUrl2x: desserts2x,
  },
  {
    category: "Lamb",
    url: "/category/lamb",
    imgUrl: lamb,
    imgUrl2x: lamb2x,
  },
  {
    category: "Goat",
    url: "/category/goat",
    imgUrl: goat,
    imgUrl2x: goat2x,
  },
  {
    category: "Miscellaneous",
    url: "/category/miscellaneous",
    imgUrl: miscellaneous,
    imgUrl2x: miscellaneous2x,
  },
  {
    category: "Pasta",
    url: "/category/pasta",
    imgUrl: pasta,
    imgUrl2x: pasta2x,
  },
  {
    category: "Pork",
    url: "/category/pork",
    imgUrl: pork,
    imgUrl2x: pork2x,
  },
  {
    category: "Seafood",
    url: "/category/seafood",
    imgUrl: seafood,
    imgUrl2x: seafood2x,
  },
  {
    category: "Side",
    url: "/category/side",
    imgUrl: side,
    imgUrl2x: side2x,
  },
  {
    category: "Starter",
    url: "/category/starter",
    imgUrl: starter,
    imgUrl2x: starter2x,
  },
  {
    category: "Vegan",
    url: "/category/vegan",
    imgUrl: vegan,
    imgUrl2x: vegan2x,
  },
  {
    category: "Vegetarian",
    url: "/category/vegetarian",
    imgUrl: vegetarian,
    imgUrl2x: vegetarian2x,
  },
];

const NUMBER_NAV_ELEMENTS = 11;

export const RecipeNavigation = () => {
  const [numberNavElements, setNumberNavElements] = useState(NUMBER_NAV_ELEMENTS);

  const renderNavigationList = CATEGORIES.slice(0, numberNavElements);

  const handlerAddMoreBtn = () => {
    setNumberNavElements((prev) => prev + NUMBER_NAV_ELEMENTS);
  };
  return (
    <nav>
      <ul className={cx(styles["navigation"])}>
        {renderNavigationList.map((category) => (
          <li key={category.url}>
            <NavigationButton
              category={category.category}
              url={category.url}
              imgUrl={category.imgUrl}
              imgUrl2x={category.imgUrl2x}
            />
          </li>
        ))}
        {numberNavElements < CATEGORIES.length && (
          <li>
            <AddMoreButton onClick={handlerAddMoreBtn} />
          </li>
        )}
      </ul>
    </nav>
  );
};
