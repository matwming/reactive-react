import { Store, useAsyncPipe } from 'reactive-react';

const store = new Store({
  value: 10,
});
const state$ = store.getSliceState('value');

const Counter = () => {
  const handlePlus = () => {
    store.dispatch({
      type: 'increment',
      payload: 1,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      todo: (initialState, payload) => {
        const newState = {
          ...initialState,
          value: initialState.value + payload,
        };
        return newState;
      },
    });
  };

  const handleMinus = () => {
    store.dispatch({
      type: 'decrement',
      payload: 1,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      todo: (initialState, payload) => {
        const newState = {
          ...initialState,
          value: initialState.value - payload,
        };
        return newState;
      },
    });
  };
  return (
    <div>
      <h3> This is Synchronous use case</h3>
      <button onClick={handleMinus}>-</button>
      <p>current value: {useAsyncPipe({ values$: state$ })}</p>
      <button onClick={handlePlus}>+</button>
    </div>
  );
};

export default Counter;
