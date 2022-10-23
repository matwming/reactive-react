import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <main>
        <p>Choose below code examples:</p>
      </main>
      <nav>
        <ol>
          <br />
          <li>
            {' '}
            <Link to="/state-management-example">
              {' '}
              Simple State Management Example
            </Link>
          </li>
          <br />

          <br />
        </ol>
      </nav>
    </>
  );
}

export default Home;
