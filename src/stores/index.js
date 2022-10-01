import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import { persistReducer } from "redux-persist";

import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const authPersistConfig = { key: "auth", storage };
const rootReducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const syncConfig = {
  blacklist: ["persist/PERSIST"],
};
const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk, createStateSyncMiddleware(syncConfig)],
  // có thể thêm  các reducer khác ở đây (vd: cart)
});
initMessageListener(store);

export default store;
export const persistor = persistStore(store);
