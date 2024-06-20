import styles from "./Hero.module.css";
import cx from "classnames";
import { selectToken } from "../../store/features/authSlice.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CustomModal } from "../shared/index.js";
import { useState } from "react";
import { SignInForm, SignUpForm } from "src/components";

const Hero = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const [active, setActive] = useState("signIn");
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const [modalSignInOpen, setModalSignInOpen] = useState(false);

  const handleClickSignUp = () => {
    setActive("signUp");
    setModalSignUpOpen(true);
  };

  const handleClickSignIn = () => {
    setActive("signIn");
    setModalSignInOpen(true);
  };

  const handleCloseSignUp = () => setModalSignUpOpen(false);
  const handleCloseSignIn = () => setModalSignInOpen(false);

  const handlerClick = () => {
    if (!token) {
      handleClickSignIn();
    } else {
      navigate("/recipe/add");
    }
  };

  return (
    <section className={styles.wrap_hero}>
      <h1 className={styles.title}>Improve Your Culinary Talents</h1>
      <p className={styles.subtitle}>
        Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
        tastes of various cuisines.
      </p>
      <Button
        text="Add recipe"
        type="button"
        onClick={handlerClick}
        classname={styles.link_btn_hero}
      />
      {active === "signIn" ? (
        <CustomModal isOpen={modalSignInOpen} onClose={handleCloseSignIn}>
          <SignInForm handleClickSignUp={handleClickSignUp} handleCloseSignIn={handleCloseSignIn} />
        </CustomModal>
      ) : (
        <CustomModal isOpen={modalSignUpOpen} onClose={handleCloseSignUp}>
          <SignUpForm handleClickSignIn={handleClickSignIn} handleCloseSignUp={handleCloseSignUp}  />
        </CustomModal>
      )}

      <div className={styles.wrap_img_hero}>
        <div className={cx(styles.smole_img, styles.img_general)}></div>
        <div className={cx(styles.big_img, styles.img_general)}></div>
      </div>
    </section>
  );
};

export default Hero;
