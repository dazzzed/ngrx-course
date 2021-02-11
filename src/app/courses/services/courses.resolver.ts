import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesService: CourseEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.coursesService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          // ngrx will guess the url by simple conventions, this case, will call /api/courses -> name of the entity pluralized
          this.coursesService.getAll().pipe(map((courses) => !!courses));
        }
      }),
      // complete transition only with data is loaded, when loaded is true
      filter((loaded) => !!loaded),
      // first operator makes sure when the first value gets emited, the observable gets completed
      first()
    );
  }
}
