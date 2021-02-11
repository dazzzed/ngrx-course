import { Course } from "./../model/course";
import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";

export const loadAllCourses = createAction(
  // Resolver is used to fetch data the app is going to need before displaying the screen to the user
  "[Courses Resolver] Load All Courses"
);

export const allCoursesLoaded = createAction(
  // Resolver is used to fetch data the app is going to need before displaying the screen to the user
  "[Load Courses Effect] All Courses Loaded",
  props<{ courses: Course[] }>()
);

export const courseUpdated = createAction(
  "[Edit Course Dialog] Course Updated",
  // Update type takes the id and the partial objects changes
  props<{ update: Update<Course> }>()
);
