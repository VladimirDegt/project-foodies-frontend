import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "../shared/IconButton/IconButton";
import styles from "./UserInfo.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { UserInfoItem } from "./UserInfoItem";
import withoutAvatar from "../../images/user_without_avatar.jpg";
import { selectIsAuthorizedUser, selectUserProfile } from "../../store/selectors/profileSelectors";
import { useUpdateUserAvatarMutation } from "../../store/services/profileService";
import {getAvatarURL} from "../../store/features/authSlice.js";

export const UserInfo = () => {
  const isOwnProfile = useSelector(selectIsAuthorizedUser);
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const data = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  const dataKeys = data ? Object.keys(data) : [];

  const [avatar, setAvatar] = useState(data?.avatar || withoutAvatar);

  const handleAvatarUpdate = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await updateUserAvatar(formData).unwrap();
      setAvatar(response.avatarURL);
      dispatch(getAvatarURL(response.avatarURL));
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleAvatarUpdate(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = useRef(null);
  const [iconSize, setIconSize] = useState({ width: 16, height: 16 });
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setAvatar(data?.avatar || withoutAvatar);
  }, [data?.avatar]);

  useEffect(() => {
    const updateIconSize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIconSize({ width: 16, height: 16 });
      } else {
        setIconSize({ width: 18, height: 18 });
      }
    };

    updateIconSize();
    window.addEventListener("resize", updateIconSize);

    return () => {
      window.removeEventListener("resize", updateIconSize);
    };
  }, []);

  return (
    <div className={styles.profile_card_wrapper}>
      <div className={styles.profile_card}>
        <img
          className={styles.profile_photo}
          src={avatar}
          alt={`${data?.name || "User Name"} avatar`}
        />

        {isOwnProfile && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <IconButton
              iconId="icon-plus"
              style={styles.profile_big_card_button}
              styleSVG={styles.profile_big_card_icon}
              stroke={"#FFF"}
              width={iconSize.width}
              height={iconSize.height}
              onClick={handleButtonClick}
            />
          </>
        )}

        <h3 className={styles.profile_name}>{data?.name}</h3>

        <ul className={styles.profile_info}>
          {dataKeys.map((dataKey) => {
            if (dataKey === "_id" || dataKey === "name" || dataKey === "avatar") {
              return;
            }
            return <UserInfoItem key={nanoid()} name={dataKey} value={data[dataKey]} />;
          })}
        </ul>
      </div>
    </div>
  );
};
