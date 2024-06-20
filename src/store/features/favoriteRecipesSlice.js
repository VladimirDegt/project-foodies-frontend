import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState: { favorites: [] },
  reducers: {
    setFavoriteRecipes: (state, action) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, { payload }) => {
      state.favorites.push(payload);
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter((ad) => ad.id !== payload);
    },
  },
});

export const persistedFavoritesReducer = persistReducer(
  {
    key: "favoriteRecipes",
    storage,
  },
  favoriteRecipesSlice.reducer
);

export const { setFavoriteRecipes, addToFavorites, removeFromFavorites } =
  favoriteRecipesSlice.actions;
