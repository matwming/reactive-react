import { Link } from 'react-router-dom';
import { observer, Store, useAsyncPipe } from 'reactive-react';
import Child from './child';
import Counter from './counter';
import { concatMap, filter, of, tap, withLatestFrom } from 'rxjs';
import { ajax } from 'rxjs/internal/ajax/ajax';

//create a store instance and pass initial state
const store = new Store({ id: 1 });
// get initial state and subscribe to it using AsyncPipe
export const state$ = store.getState;
export const actions$ = store.actions;

actions$
  .pipe(
    tap(observer),
    filter((action) => {
      return action.type === 'callapi';
    }),
    concatMap((action) => {
      console.log('actionsss', action);
      if (!action) return of('');
      const _url =
        'https://jsonplaceholder.typicode.com/todos/' + action.payload;
      return ajax.getJSON(_url);
    }),
    withLatestFrom(state$),
    tap(([response, initialState]: [response: any, initialState: any]) => {
      const newState = { ...initialState, id: response.id };

      store.dispatch({
        type: 'update',
        payload: newState,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        todo: (initialState, payload) => {
          return payload;
        },
      });
    })
  )
  .subscribe((v) => {
    console.log('complete', v);
  });

const StateManageExample = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const _state: { id: any } = useAsyncPipe({ values$: state$ });

  const loadData = () => {
    store.dispatch({
      type: 'callapi',
      payload: Math.round(Math.random() * 20),
    });
  };
  return (
    <div>
      <h3> This is Asynchronous use case</h3>
      This parent id is:{_state?.id}
      <br />
      <button onClick={loadData}>load data</button>
      <Child />
      <hr />
      <Counter />
      <footer>
        <hr />
        <p>current routes:</p>
        <Link to="/">home page</Link>
      </footer>
    </div>
  );
};

export default StateManageExample;
