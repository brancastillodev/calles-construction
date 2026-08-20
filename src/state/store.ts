import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userState";
import tenantReducer from "./tenantState";

const store = configureStore({
  reducer: {
    user: userReducer,
    tenant: tenantReducer,
  },
});

export default store;