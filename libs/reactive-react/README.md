# reactive-react

it has a hook called useAsyncPipe. Please use the hook with rxjs.

it accepts an observable and return a value.

You can use it like this:

```javascript
// define the data source
const isTrueDataSource = new BehaviorSubject(true);

// in any react component, we pipe the data source observables
const isTrue$ = isTrueDataSource.pipe(
    map((x) => {
      return x;
    })
  );

// in the same react component, pass the observable to this hook and it reuturn the value
// we can then display the value in browser
  const _isTrue = AsyncPipe({ values$: isTrue$ });
  
// diplay the value
<div>{_isTrue}</div>

// if you want to change the value, call next method from the BehaviorSubject
onClick={() => isTrueDataSource.next(!_isTrue)}>
```
For an example about how to use this hook, please refer to this link:
https://codesandbox.io/s/romantic-edison-gwftsn?file=/src/features/rxjsTest.js
