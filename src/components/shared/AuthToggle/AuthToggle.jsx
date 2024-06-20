import { useState } from "react";
import cx from "classnames";
import styles from "./AuthToggle.module.css";

import { Button, CustomModal } from "../index.js";
import { SignInForm, SignUpForm } from "src/components";

const AuthToggle = () => {
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

  return (
    <>
      <div
        className={`${styles.toggleContainer} ${
          styles[active === "signIn" ? "signInActive" : "signUpActive"]
        }`}
      >
        <div className={styles.slider}></div>
        <Button
          text="SIGN IN"
          classname={cx(styles.toggleButton, styles.signIn)}
          onClick={handleClickSignIn}
        />

        <Button
          text="SIGN UP"
          classname={cx(styles.toggleButton, styles.signUp)}
          onClick={handleClickSignUp}
        />
      </div>
      {active === "signIn" ? (
        <CustomModal isOpen={modalSignInOpen} onClose={handleCloseSignIn}>
          <SignInForm handleClickSignUp={handleClickSignUp} handleCloseSignIn={handleCloseSignIn}/>
        </CustomModal>
      ) : (
        <CustomModal isOpen={modalSignUpOpen} onClose={handleCloseSignUp}>
          <SignUpForm handleClickSignIn={handleClickSignIn} handleCloseSignUp={handleCloseSignUp} />
        </CustomModal>
      )}
    </>
  );
};

export default AuthToggle;
