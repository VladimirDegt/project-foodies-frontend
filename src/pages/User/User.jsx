import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchUserProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useFetchCurrentUserProfileQuery,
} from "../../store/services/profileService";
import { getUserProfile, setCurrentAuthUser } from "../../store/features/profileSlice";
import TabContent from "../../components/TabContent/TabContent";
import styles from "./User.module.css";
import { toast } from "react-toastify";
import { UserInfo } from "../../components/UserInfo/UserInfo";
import { Button, CustomModal, SectionTitle } from "../../components/shared";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { LogOut } from "../../components";
import { selectIsAuthorizedUser } from "../../store/selectors/profileSelectors";
import { selectId } from "../../store/features/authSlice";

const customId = "toastId";

const User = () => {
  const myId = useSelector(selectId);
  const [modalLogOutOpen, setModalLogOutOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const isAuthorizedUser = useSelector(selectIsAuthorizedUser);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: profileData, error: profileError } = useFetchUserProfileQuery(id);
  const { data: currentUser } = useFetchCurrentUserProfileQuery();

  const [followUser, { error: followError }] = useFollowUserMutation();
  const [unfollowUser, { error: unfollowError }] = useUnfollowUserMutation();

  const handleFollowUser = (userId) => {
    followUser(userId);
    if (followError) {
      toast.error("Something went wrong", {
        toastId: customId,
      });
      return;
    }

    dispatch(
      setCurrentAuthUser({
        ...currentUser,
        following: [...currentUser.following, userId],
      })
    );

    toast.success("Follow successful", {
      toastId: customId,
    });
  };

  const handleUnfollowUser = (userId) => {
    unfollowUser(userId);
    if (unfollowError) {
      toast.error("Something went wrong", {
        toastId: customId,
      });
      return;
    }

    dispatch(
      setCurrentAuthUser({
        ...currentUser,
        following: currentUser.following.filter((followingUserId) => followingUserId !== userId),
      })
    );

    toast.success("Unfollow successful", {
      toastId: customId,
    });
  };

  useEffect(() => {
    if (id !== myId && currentUser && currentUser.following) {
      const isUserFollowing = currentUser.following.some(
        (followingUserId) => followingUserId === id
      );
      setIsFollowing(isUserFollowing);
    }
  }, [currentUser, id, myId]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentAuthUser(currentUser));
    }
    if (profileData) {
      dispatch(getUserProfile(profileData));
    }
  }, [profileData, currentUser, dispatch]);

  if (profileError) {
    toast.error(profileError.data.message, {
      toastId: customId,
    });
    return;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadscrumbs}>
          <BreadCrumbs currentPage={"Profile"} />
        </div>
        <div className={styles.title}>
          <SectionTitle text={"Profile"} />
        </div>
        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create <br />
          gastronomic masterpieces with us.
        </p>
        <div className={styles.userInfoAndTabContentWerapper}>
          <div className={styles.userInfoAndBtnWrapper}>
            <UserInfo />
            {isAuthorizedUser ? (
              <Button
                type={"button"}
                variant={"logoutOrFollowBtn"}
                text={"Log Out"}
                onClick={() => setModalLogOutOpen(true)}
              />
            ) : (
              <Button
                type={"button"}
                variant={"logoutOrFollowBtn"}
                text={isFollowing ? "Unfollow" : "Follow"}
                onClick={isFollowing ? () => handleUnfollowUser(id) : () => handleFollowUser(id)}
              />
            )}
          </div>

          <TabContent handleFollowUser={handleFollowUser} handleUnfollowUser={handleUnfollowUser} />
        </div>
      </div>

      <CustomModal isOpen={modalLogOutOpen} onClose={() => setModalLogOutOpen(false)}>
        <LogOut setModalLogOutOpen={setModalLogOutOpen} />
      </CustomModal>
    </>
  );
};

export default User;
