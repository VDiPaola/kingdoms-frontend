import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../Slices/UserSlice";
import authReducer from "../Slices/AuthSlice";
import settingsReducer from "../Slices/SettingsSlice";
import gameReducer from '../Slices/GameSlice'
import FirebaseSlice from "../Slices/FirebaseSlice";


const settingsReducerPersist = persistReducer({key: "settings",version: 1,storage,}, settingsReducer);
const authReducerPersist = persistReducer({key: "auth",version: 1,storage,}, authReducer);
const userReducerPersist = persistReducer({key: "user",version: 1,storage,}, userReducer);

const store = configureStore({
  reducer: { settings: settingsReducerPersist, auth: authReducerPersist, user: userReducerPersist, game: gameReducer, firebase:FirebaseSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch