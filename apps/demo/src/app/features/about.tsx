import { Link } from "react-router-dom";
import { BehaviorSubject, map } from "rxjs";
import AsyncPipe from "../async-pipe";

// data source, change by call next, get by call subscribe
const aboutMeInfoData = new BehaviorSubject({
  name: "tom",
  age: 24,
  address: "melbourne"
});

function About() {
  const aboutMeInfo$ = aboutMeInfoData.pipe(
    map((x) => {
      console.log("about me", x);
      return x;
    })
  );
  const aboutMeInfo = AsyncPipe({ values$: aboutMeInfo$ });
  console.log("about me renders");
  return (
    <>
      <main>
        <h2>this is about page</h2>
  name:{aboutMeInfo.name}
  <br />
  age:{aboutMeInfo.age}
  <br />
  address:{aboutMeInfo.address}
  <br />
  <button
    onClick={() => {
    const obj = {
      ...aboutMeInfo
    };
    obj.age++;
    aboutMeInfoData.next(obj);
  }}
>
  increase age
  </button>
  </main>
  <hr />
  <p>current routes:</p>
  <nav>
  <Link to="/">Home</Link>
  <br />
  <Link to="/rxjsTest">rxjs test</Link>
  </nav>
  </>
);
}

export default About;
