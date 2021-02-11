import { IAuthState } from "./IAuthState";
import { createFeatureSelector, createSelector } from "@ngrx/store";

// Set type of selector
export const selecAuthState = createFeatureSelector<IAuthState>("auth");

// Memoized function
export const isLoggedIn = createSelector(
  selecAuthState,
  // Projector function
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
