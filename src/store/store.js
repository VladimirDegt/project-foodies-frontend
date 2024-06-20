import { configureStore } from "@reduxjs/toolkit";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import { testimonialApi } from "./services/testimonialService.js";
import { rtkQueryCatchError } from "src/utilities/rtkQueryCatchError.js";
import { authApi } from "./services/authService.js";
import { profileApi } from "./services/profileService.js";
import profileReducer from "./features/profileSlice.js";
import { persistedAuthReducer } from "./features/authSlice.js";
import { recipeApi } from "./services/recipeService.js";
import { persistedFavoritesReducer } from "./features/favoriteRecipesSlice.js";
import { categoryApi } from "./services/categoryService.js";
import { ingredientApi } from "./services/ingredientService.js";
import { areaApi } from "./services/areaService.js";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: persistedAuthReducer,
    [testimonialApi.reducerPath]: testimonialApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [areaApi.reducerPath]: areaApi.reducer,
    favoriteRecipes: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(testimonialApi.middleware)
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(recipeApi.middleware)
      .concat(rtkQueryCatchError)
      .concat(ingredientApi.middleware)
      .concat(categoryApi.middleware)
      .concat(areaApi.middleware),
});

export const persistor = persistStore(store);
