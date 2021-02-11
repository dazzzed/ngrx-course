import { User } from "../model/user.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  // [] is the source of the action (good for tracking the events), where it's going to be dispatched
  // After is Event or command that the naction corresponds to
  "[Login Page] User Login",
  // The type of the payload associated to this action
  props<{ user: User }>()
);
// No arguments (props) are needed for this action
export const logout = createAction("[Top Menu] Logout");
