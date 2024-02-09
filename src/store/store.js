// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer } from "./userSlice";
import { sideBarReducer } from "./sideBarSlice";
import { userSettingReducer } from "./intanceSettingSlice";


const store = configureStore({
  reducer: {
    userSetting: userSettingReducer,
    userInfoStore: userInfoReducer,
    sideBarStore: sideBarReducer,
  },
});

export default store;
