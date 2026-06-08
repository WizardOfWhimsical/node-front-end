import { Link } from 'react-router';

function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>Page does not exist for this site</h2>
      <p>Page not found</p>
      <Link to="/">Go back home</Link>
    </>
  );
}

export default NotFound;
