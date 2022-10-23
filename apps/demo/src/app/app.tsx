// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import Home from './appRoute/home';
import StateManageExample from './lessons/state-management-example';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={'/state-management-example'}
          element={<StateManageExample />}
        />
      </Routes>
    </>
  );
}

export default App;
