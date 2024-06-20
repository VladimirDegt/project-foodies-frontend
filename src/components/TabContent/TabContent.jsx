import { useEffect, useRef, useState } from "react";

import styles from "./TabContent.module.css";
import TabMenu from "../TabMenu/TabMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFollowers,
  selectFollowing,
  selectIsAuthorizedUser,
  selectRecipes,
} from "../../store/selectors/profileSelectors.js";
import SmallRecipeCardList from "../SmallRecipeCard/SmallRecipeCardList.jsx";
import FollowerCardList from "../FollowerCard/FollowerCardList.jsx";
import {
  useFetchUserFollowersQuery,
  useFetchUserFollowingQuery,
  useFetchUserRecipesQuery,
} from "../../store/services/profileService.js";
import { useParams } from "react-router-dom";
import {
  setUserFollowers,
  setUserFollowing,
  setUserAddedRecipes,
} from "../../store/features/profileSlice.js";

import { useGetFavoriteRecipesQuery } from "../../store/services/recipeService.js";

import { Loader } from "../shared/Loader/Loader.jsx";

import Pagination from "../Pagination/Pagination.jsx";
import { selectFavoriteRecipes } from "../../store/selectors/selectors.js";

const myProfileTabs = [
  {
    id: "my-recipes",
    label: "MY RECIPES",
    message:
      "Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.",
  },
  {
    id: "my-favorites",
    label: "MY FAVORITES",
    message:
      "Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.",
  },
  {
    id: "followers",
    label: "FOLLOWERS",
    message:
      "There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.",
  },
  {
    id: "following",
    label: "FOLLOWING",
    message:
      "Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.",
  },
];

const userProfileTabs = [
  { id: "recipes", label: "RECIPES", message: "The current user hasn't added any recipes yet." },
  {
    id: "followers",
    label: "FOLLOWERS",
    message: "The current user hasn't any followers yet.",
  },
];

const TabContent = ({ handleFollowUser, handleUnfollowUser }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isAuthorizedUser = useSelector(selectIsAuthorizedUser);
  const userFollowers = useSelector(selectFollowers);
  const userFollowing = useSelector(selectFollowing);
  const categoryRef = useRef(null);

  const userAddedRecipes = useSelector(selectRecipes);
  const userFavoriteRecipes = useSelector(selectFavoriteRecipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeTab, setActiveTab] = useState(
    isAuthorizedUser ? myProfileTabs[0].id : userProfileTabs[0].id
  );

  const { data: myRecipes, isLoading: loadRecipes } = useFetchUserRecipesQuery(
    {
      userId: id,
      page: currentPage,
    },
    {
      skip: activeTab !== "my-recipes" && activeTab !== "recipes",
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setActiveTab(isAuthorizedUser ? myProfileTabs[0].id : userProfileTabs[0].id);
  }, [isAuthorizedUser]);

  const { data: favoriteRecipes, isLoading: loadFavorite } = useGetFavoriteRecipesQuery({
    page: currentPage,
    limit: 10,
    skip: activeTab !== "my-favorites",
  });

  const { data: followersData, isLoading: loadFollowers } = useFetchUserFollowersQuery({
    userId: id,
    page: currentPage,
    skip: activeTab !== "followers",
  });

  const { data: followingData, isLoading: loadFollowing } = useFetchUserFollowingQuery({
    skip: activeTab !== "following",
    page: currentPage,
  });

  const isDataLoading = loadRecipes || loadFavorite || loadFollowers || loadFollowing;

  useEffect(() => {
    if ((activeTab === "my-recipes" || activeTab === "recipes") && myRecipes && !loadRecipes) {
      setTotalPages(myRecipes.totalPages);
      dispatch(setUserAddedRecipes(myRecipes.data));
    }
    if (activeTab === "followers" && followersData) {
      setTotalPages(followersData.totalPages);
      dispatch(setUserFollowers(followersData.followersWithRecipes));
    } else if (activeTab === "following" && followingData) {
      setTotalPages(followingData.totalPages);
      dispatch(setUserFollowing(followingData.followingWithRecipes));
    } else if (activeTab === "my-favorites" && favoriteRecipes) {
      setTotalPages(favoriteRecipes.totalPages);
    }
  }, [
    activeTab,
    dispatch,
    followersData,
    followingData,
    favoriteRecipes,
    loadRecipes,
    myRecipes,
    currentPage,
    userFavoriteRecipes,
  ]);

  const getMessage = (profile, tab) => {
    const profileSetup = profile.find(({ id }) => id === tab);
    return profileSetup.message;
  };

  const renderContent = () => {
    if (isAuthorizedUser) {
      switch (activeTab) {
        case "my-recipes":
          if (userAddedRecipes?.length > 0) {
            return <SmallRecipeCardList data={userAddedRecipes} tab="recipe" />;
          } else return <p className={styles.message}>{getMessage(myProfileTabs, activeTab)}</p>;

        case "my-favorites":
          if (favoriteRecipes.data?.length > 0) {
            const favoriteRecipesProccessed = favoriteRecipes?.data.map((item) => {
              return item.recipe;
            });
            return <SmallRecipeCardList data={favoriteRecipesProccessed} tab="favorites" />;
          } else return <p className={styles.message}>{getMessage(myProfileTabs, activeTab)}</p>;

        case "followers":
          if (userFollowers?.length > 0) {
            return (
              <FollowerCardList
                handleFollowUser={handleFollowUser}
                handleUnfollowUser={handleUnfollowUser}
                data={userFollowers}
                tab="followers"
              />
            );
          } else return <p className={styles.message}>{getMessage(myProfileTabs, activeTab)}</p>;

        case "following":
          if (userFollowing?.length > 0) {
            return (
              <FollowerCardList
                handleFollowUser={handleFollowUser}
                handleUnfollowUser={handleUnfollowUser}
                data={userFollowing}
                tab="following"
              />
            );
          } else return <p className={styles.message}>{getMessage(myProfileTabs, activeTab)}</p>;
        default:
          return null;
      }
    } else {
      switch (activeTab) {
        case "recipes":
          if (myRecipes?.total > 0) {
            return <SmallRecipeCardList data={myRecipes.data} />;
          } else return <p className={styles.message}>{getMessage(userProfileTabs, activeTab)}</p>;
        case "followers":
          if (userFollowers?.length > 0) {
            return (
              <FollowerCardList
                handleFollowUser={handleFollowUser}
                handleUnfollowUser={handleUnfollowUser}
                data={userFollowers}
                tab="followers"
              />
            );
          } else return <p className={styles.message}>{getMessage(userProfileTabs, activeTab)}</p>;
        default:
          return null;
      }
    }
  };

  const menuItems = isAuthorizedUser ? myProfileTabs : userProfileTabs;

  return (
    <div className={styles.container} ref={categoryRef}>
      <TabMenu menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      {isDataLoading ? <Loader /> : <div className={styles.content}>{renderContent()}</div>}
      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default TabContent;
