import { Actions } from "@ngrx/effects";
import { routerReducer } from "@ngrx/router-store";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";

// Global Application State
export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  // router stateKey
  router: routerReducer,
};

// Metareducers are processes before the normal reducers
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("State before: ", state);
    console.log("Action: ", action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
