import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from '../components';
import { useRoutes } from '../hooks';
import { routes as ROUTES } from '../data/constant';
import { REDIRECT_TO_DASHBOARD, REDIRECT_TO_LOGIN } from './common';
import { useSelector } from 'react-redux';
import "./index.scss"

function Routes() {
  const routes = useRoutes(ROUTES.GET_ROUTES)
  const { userType, token } = useSelector(state => state.auth);

  if (routes.length === 0) {
    return <Loader />
  }

  let router;
  if (token) {
    // get layout and protested routes and add dynamic index
    const layoutRoute = routes.find(r => r.isLayout);
    router = createBrowserRouter([...REDIRECT_TO_DASHBOARD(userType), ...[layoutRoute]]);
  }
  else {
    router = createBrowserRouter(REDIRECT_TO_LOGIN());
  }
  return (
    <RouterProvider router={router} />
  );
}
export default Routes;
