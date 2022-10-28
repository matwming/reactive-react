import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  ReplaySubject,
  tap,
  withLatestFrom,
} from 'rxjs';

interface Action {
  type: string;
  payload: any;
  todo?: () => any;
}

interface initialState {
  [key: string]: any;
}

class Store {
  actions$ = new ReplaySubject();
  initialState$ = new BehaviorSubject({});

  update$ = this.actions$
    .pipe(
      filter((action: any) => {
        return action.type === 'update' || action.todo;
      }),
      withLatestFrom(this.initialState$),
      tap(([action, initialState]) => {
        const updateFunc = action.todo;
        const newState = updateFunc(initialState, action.payload);
        this.initialState$.next(newState);
      })
    )
    .subscribe((v) => {
      //console.log('update', v);
    });

  constructor(initialState: initialState) {
    this.initialState$.next(initialState);
  }

  get actions(): Observable<any> {
    return this.actions$.asObservable();
  }

  dispatch(action: Action): void {
    this.actions$.next(action);
  }
  get getState(): Observable<any> {
    return this.initialState$;
  }

  getSliceState(slice: string) {
    return this.initialState$.pipe(
      map((state: any) => {
        return state[slice];
      })
      //tap(observer)
    );
  }
}

export default Store;
