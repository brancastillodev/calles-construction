import { createAction, createReducer } from "@reduxjs/toolkit";
import { getStoredUser } from "../utils/auth";

interface UserState {
  id: string | null;
  email: string | null;
}

export const setUser = createAction<Partial<UserState>>("SET_USER");

const persisted = getStoredUser();

const initialState: UserState = {
  id: persisted?.id ?? null,
  email: persisted?.email ?? null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return { ...state, ...action.payload };
  });
});

export default userReducer;