# reactive-react

This package integrates rxjs into react.

It currently has two apis: **useAsyncPipe, Store**

1. useAsyncPipe:
it connects rxjs to react. It accepts an observable and returns the value.

```javascript
//outside a react component
const state$ = of('first value');

//inside a react component
const _state = useAsyncPipe({values$: state$});
```
the value of _state is a string, 'first value', in this example.

2. Store:
It has similar apis as redux.

2.1 A react application can have multiple stores (unlike redux). When creating an instace of the store,
it accepts an initialState. The initialState has to be an object.
Note: the store instance needs to be defined outside a react component.

```javascript
//outside a react component
const store = new Store({ id:10 });
```
2.2 You can get the current state as observable like this:
```javascript
//outside a react component
const currentState$ =  store.getState;
```
2.3 In order to change the state, you need to dispatch an action. 
States can be changed synchronously or asynchronously. 
* To change it synchronously, just dispatch an action with a todo function: 
The todo function has two parameters, initialState and the current payload. It must return the new state. 
```javascript
store.dispach({
  type: 'increment',
  payload: 1,
  todo: (initialState, payload) => {
    const newState = {
      ...initialState,
      value: initialState.value + payload,
    };
    return newState;
  },
}) 
```
* To change it asynchronously: 
it needs a bit of work, but it is not that hard.
1) Firstly, dispatch an action without todo like this:
```javascript
store.dispatch({
  type: 'callapi',
  payload: Math.round(Math.random() * 20),
});
```
2) Secondly, use actions$ observable to filter out the target action type and do the asynchronous task. 
When you are ready to update the state, dispatch the action with todo. Here is an example:
```javascript
// the following code needs to run outside of an react component
actions$
  .pipe(
      // filter out the target async action
    filter((action) => {
      return action.type === 'callapi';
    }),
    // do the async task
    concatMap((action) => {
      if (!action) return of('');
      const _url =
        'https://jsonplaceholder.typicode.com/todos/' + action.payload;
      return ajax.getJSON(_url);
    }),
    withLatestFrom(state$),
    tap(([response, initialState]: [response: any, initialState: any]) => {
      const newState = { ...initialState, id: response.id };
      // when it is ready to update the state, dispatch the action with a todo function
      store.dispatch({
        type: 'update',
        payload: newState,
        todo: (initialState, payload) => {
          return payload;
        },
      });
    })
  )
  // do not forget to subscribe it otherwise it will not run
  .subscribe((v) => {
    console.log('complete', v);
  }); 
```
Please refer to the apps/demo/src folder for an example react code.
