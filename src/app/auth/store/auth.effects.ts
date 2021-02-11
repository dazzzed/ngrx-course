import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";

@Injectable()
// It's important to not take this class (AuthEffects) and import it in other parts of our application
// It will be handled only byg the ngrx lib
export class AuthEffects {
  constructor(private router: Router, private actions$: Actions) {}

  // createEffect is functional and rxjs friendly, typesafe and assures error handling
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        // ofType is a filter fn of ngrx to filter actions by type
        ofType(AuthActions.login),
        // tap is a side effect if the action that does not mutates the value in the state
        tap((action) => {
          localStorage.setItem("user", JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((action) => {
          localStorage.removeItem("user");

          this.router.navigateByUrl("/login");
        })
      ),
    // prevents infinit loop by preventing further actions are dispatched to the store
    { dispatch: false }
  );
}
