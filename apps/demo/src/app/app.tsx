// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route } from "react-router-dom";
import Home from "./features/home";
import About from "./features/about";
import RxjsTest from "./features/rxjsTest";
export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rxjsTest" element={<RxjsTest />} />
      </Routes>
    </>
  );
}

export default App;
