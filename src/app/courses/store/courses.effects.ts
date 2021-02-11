import { allCoursesLoaded } from "./course-actions";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./../services/courses-http.service";
import { ofType } from "@ngrx/effects";
import { createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { CourseActions } from "./action-types";

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      // concatMap ensures we only send one requeset at a time too the backend (mergeMap would send multiple)
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      // as the create effect expects to be returned a new action we map the response to a new action
      map((courses) => allCoursesLoaded({ courses }))
    )
  );

  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        // concatMap ensures we only do a save when previous save has saved
        concatMap((action) =>
          this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}
}
