import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";
import cx from "classnames";
import SectionSubtitle from "../../shared/SectionSubtitle/SectionSubtitle";
import IconButton from "../../shared/IconButton/IconButton";
import Icon from "../../shared/Icon/Icon";

import withoutAvatar from "../../../images/user_without_avatar.jpg";
import { useSelector } from "react-redux";
import { selectFavoriteRecipes } from "../../../store/selectors/selectors";
import { selectToken } from "../../../store/features/authSlice";
import {
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
} from "../../../store/services/recipeService";
import { useEffect, useState } from "react";
import handleFavorite from "../../../utilities/handleFavorite";
import { CustomModal } from "../../shared";
import { SignUpForm } from "../../SignUp/SignUpForm";
import { SignInForm } from "../../SignIn/SignInForm";

const RecipeCard = ({ recipe }) => {
  const { _id, title, owner, description, thumb } = recipe;

  const favoritesRecipe = useSelector(selectFavoriteRecipes);
  const [isFavorite, setIsFavorite] = useState(favoritesRecipe.includes(_id));
  const token = useSelector(selectToken);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSignInOpen, setModalSignInOpen] = useState(true);
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const [addFavoriteRecipe] = useAddFavoriteRecipeMutation();
  const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();

  useEffect(() => {
    setIsFavorite(favoritesRecipe.includes(_id));
  }, [favoritesRecipe, _id]);

  const handleClickSignToogle = () => {
    setModalSignUpOpen(!modalSignUpOpen);
    setModalSignInOpen(!modalSignInOpen);
  };

  const addToFavorites = () => {
    if (!isFavorite) {
      handleFavorite(addFavoriteRecipe, _id, "add", setIsFavorite);
    } else {
      handleFavorite(removeFavoriteRecipe, _id, "delete", setIsFavorite);
    }
  };

  return (
    <>
      <li className={cx(styles.recipeCard)}>
        <Link to={`/recipe/${_id}`}>
          <img src={thumb} alt={title} className={styles.recipeImage} />
        </Link>
        <div className={styles.textWrap}>
          <SectionSubtitle customStyle={styles.header_card} text={title} />
          <p className={styles.recipeDescription}>{description}</p>
        </div>
        <div className={styles.avatarBtnswrap}>
          <Link to={`/user/${owner._id}`} className={cx(styles.avatarWrapper)}>
            <img
              src={owner.avatar || `${withoutAvatar}`}
              alt={`${owner.name} avatar`}
              className={styles.avatar}
            />
            <span>{owner.name}</span>
          </Link>
          <ul className={styles.iconList}>
            <li>
              {token ? (
                !isFavorite ? (
                  <IconButton
                    style={styles.style_button_notFavorit}
                    iconId="icon-heart"
                    onClick={addToFavorites}
                  />
                ) : (
                  <IconButton
                    style={styles.style_button_favorit}
                    stroke="#FFF"
                    iconId="icon-heart"
                    onClick={addToFavorites}
                  />
                )
              ) : (
                <IconButton
                  style={styles.style_button_notFavorit}
                  iconId="icon-heart"
                  onClick={() => {
                    setModalIsOpen(!modalIsOpen);
                  }}
                />
              )}
            </li>
            <li>
              <Link to={`/recipe/${_id}`} className={styles.iconWrapper}>
                <Icon iconId="icon-arrow-up-right" />
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(!modalIsOpen)}>
        {modalSignUpOpen && <SignUpForm handleClickSignIn={handleClickSignToogle} />}
        {modalSignInOpen && <SignInForm handleClickSignUp={handleClickSignToogle} />}
      </CustomModal>
    </>
  );
};

export default RecipeCard;
