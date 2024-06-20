import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  isAuthorizedUser: false,
  recipes: [],
  favoritesRecipes: [],
  followers: [],
  following: [],
  currentAuthUser: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getUserProfile(state, { payload }) {
      state.userProfile = payload;
      state.isAuthorizedUser = "followingCount" in payload ? true : false;
    },
    setUserAddedRecipes(state, { payload }) {
      state.recipes = [...payload];
    },
    setUserFavoritesRecipes(state, { payload }) {
      state.favoritesRecipes = [...payload.data];
    },

    setUserFollowers(state, { payload }) {
      state.followers = payload.map((user) => {
        return {
          ...user,
          isFollowing:
            state.currentAuthUser?.following?.some(
              (followingUserId) => followingUserId === user._id
            ) || false,
        };
      });
    },
    setUserFollowing(state, { payload }) {
      state.following = [...payload];
    },
    setCurrentAuthUser(state, { payload }) {
      state.currentAuthUser = payload;
    },
  },
});

export default profileSlice.reducer;

export const {
  getUserProfile,
  setUserFollowers,
  setUserFollowing,
  setUserAddedRecipes,
  setUserFavoritesRecipes,
  setCurrentAuthUser,
} = profileSlice.actions;
