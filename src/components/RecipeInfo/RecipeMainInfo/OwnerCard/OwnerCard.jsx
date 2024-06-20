import styles from "./OwnerCard.module.css";
import withoutAvatar from "../../../../images/user_without_avatar.jpg";
import { Link } from "react-router-dom";

export const OwnerCard = ({ owner }) => {
  const { avatarURL, name, _id } = owner;

  return (
    <Link to={`/user/${_id}`} className={styles.owner_card}>
      <img
        className={styles.owner_photo}
        src={avatarURL ? avatarURL : withoutAvatar}
        alt={`${name} photo`}
      />
      <div className={styles.owner_primary_info_wrapper}>
        <span className={styles.owner_sign}>Created by:</span>
        <h4>{name}</h4>
      </div>
    </Link>
  );
};
