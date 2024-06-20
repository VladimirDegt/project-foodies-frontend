import { useState } from "react";
import IconButton from "../../shared/IconButton/IconButton";
import styles from "./HeaderProfile.module.css";
import styleModal from "../HeaderModal/HeaderModal.module.css";
import cx from "classnames";
import HeaderProfileMenu from "./HeaderProfileMenu";
import { useSelector } from "react-redux";
import { selectAvatarURL, selectName } from "../../../store/features/authSlice";
import { CustomModal } from "../../shared";
import HeaderModal from "../HeaderModal/HeaderModal";

const HeaderProfile = ({ isHome, onClick }) => {
  const [toogleOpen, setToogleOpen] = useState(false);
  const [toogleModal, setToogleModal] = useState(false);
  const avatarURL = useSelector(selectAvatarURL);
  const name = useSelector(selectName);

  const handlerOpenProfile = () => {
    setToogleOpen(!toogleOpen);
  };

  const handlerToogleModal = () => {
    setToogleModal(!toogleModal);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wrap_profile} onClick={handlerOpenProfile}>
        <img className={styles.img_profile} src={avatarURL} alt={name} />
        <p className={styles.name_profile}>{name}</p>
        <IconButton
          style={cx(styles.btn_arrow, toogleOpen && styles.btn_arrow_open)}
          iconId="icon-chevron-down"
          width="18"
          height="18"
          stroke="#fff"
        />
      </div>
      {toogleOpen && (
        <HeaderProfileMenu onClick={onClick} onClose={handlerOpenProfile} isHome={isHome} />
      )}

      <IconButton
        style={styles.btn_menu}
        styleSVG={styles.icon_arrow}
        iconId="icon-mobile-menu"
        width="28"
        height="28"
        stroke={isHome ? "#fff" : "#000"}
        onClick={handlerToogleModal}
      />
      {toogleModal && (
        <CustomModal
          isOpen={toogleModal}
          onClose={handlerToogleModal}
          customeStyles={styleModal.wrap_modal}
          btnStyle={styleModal.btn_close}
          width="28"
          height="28"
          stroke="#fff"
        >
          <HeaderModal handlerToogleModal={handlerToogleModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default HeaderProfile;
