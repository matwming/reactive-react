import { BehaviorSubject, ReplaySubject } from "rxjs";

// toggle
export const isTrueDataSource = new BehaviorSubject(true);

// stored last five api results
export const data = new ReplaySubject(5);
