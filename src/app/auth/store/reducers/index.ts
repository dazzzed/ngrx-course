import { IAuthState } from "./../IAuthState";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from "@ngrx/store";
import { AuthActions } from "../action-types";

export const initialAuthState: IAuthState = {
  user: undefined,
};

// as arguments gets the current state of the store and the action
// It's called reducer based on the reduce functional programming operation

// createReducer is just a simplified way of creating pur reducer function
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    // always return the updated data here, do not make mutations to tthe state
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
