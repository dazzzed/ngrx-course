import { allCoursesLoaded } from "./../course-actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { compareCourses, Course } from "../../model/course";
import { CourseActions } from "../action-types";

export interface CoursesState extends EntityState<Course> {
  // entities is a map whose keys are the ids of the entitiesand whose values are the value of the entity
  // entities: { [key: number]: Course };
  // ids array defines the order of the entities
  // ids: number[];
  // We'll do that by using ngrx entity state
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  // Function that compares and sorts our array of entities
  sortComparer: compareCourses,
  // if we have custom  unique identifiers:
  // selectId: (course) => coursesReducer.id,
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,

  on(CourseActions.allCoursesLoaded, (state, action) =>
    // all courses are saved in the store
    adapter.addAll(action.courses, { ...state, allCoursesLoaded: true })
  ),

  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
