import { isTrueDataSource, data } from "../store/store";
import {AsyncPipe} from "@reactive-react";
import { map, BehaviorSubject, tap, mergeAll } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Link } from "react-router-dom";
import { useState } from "react";

const apiId = new BehaviorSubject(1);

const RxjsTest = () => {
  const isTrue$ = isTrueDataSource.pipe(
    map((x) => {
      //console.log("x", x);
      return x;
    })
  );
  const apiResult$ = apiId.pipe(
    map((id) => {
      let _url = "https://jsonplaceholder.typicode.com/todos/" + id;
      return ajax.getJSON(_url);
    }),
    mergeAll(),
    tap((result) => {
      data.next(result);
    })
  );

  const _isTrue = AsyncPipe({ values$: isTrue$ });
  const _apiResult = AsyncPipe({ values$: apiResult$ });

  const handleDataFetch = () => {
    const id = Math.ceil(Math.random() * 10);
    apiId.next(id);
  };

  const [previous, setPrevious] = useState([]);
  const handleGetPreviousResults = () => {
    const result = [];
    const sub = data.subscribe((v) => {
      console.log("last five results", v);

      result.push(v);
    });
    console.log("array", result);
    setPrevious(result);
    sub.unsubscribe();
  };

  return (
    <div>
      {_isTrue ? "the value is true" : "the value is false"}
      <button onClick={() => isTrueDataSource.next(!_isTrue)}>toggle</button>
      <button onClick={() => handleDataFetch()}>fetch data</button>

      <div>
        <p> title: {_apiResult?.title}</p>
        <p> id :{_apiResult?.id}</p>
        <p> completed: {_apiResult?.completed ? "yes" : "no"}</p>
      </div>
      <hr />
      <p>
        past results values:
        <br />
        <button onClick={handleGetPreviousResults}>
          get past five results
        </button>
      </p>
      <p>this values are:</p>
      <ul>
        {previous.map((x) => {
          return (
            <li key={x.id + Math.random() * 10}>
              {x.id}: {x.title}
            </li>
          );
        })}
      </ul>

      <hr />
      <p>current routes:</p>
      <nav>
        <Link to="/about">about page</Link>
        <br />
        <Link to="/">home page</Link>
      </nav>
    </div>
  );
};

export default RxjsTest;
