import { areCoursesLoaded } from "./courses.selectors";
import { loadAllCourses } from "./course-actions";
import { filter, finalize, first, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { AppState } from "../../reducers";
import { select, Store } from "@ngrx/store";

// Resolver runs before the router completes its transition
// Resolver will ensure the screen does not get displayed if that data hasn't been loaded yet
@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded) => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      // only emits a value if the courses have been loaded, allCoursesLoaded is set to true
      filter((coursesLoaded) => coursesLoaded),
      // Router transition will only complete when the first trigger from store loadAllCourses gets here
      first(),
      // Finalize will ensure whenever the observable either completes or errors out the loading get too false again
      finalize(() => (this.loading = false))
    );
  }
}
