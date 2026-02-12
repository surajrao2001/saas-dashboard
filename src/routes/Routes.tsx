import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ROUTES } from './routePaths';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';
import { AppLayout } from '../components/layout/AppLayout';
import { Dashboard } from '../pages/dashboard/Dashboard';

function RootRedirect() {
  const token = localStorage.getItem('token');
  return <Navigate to={token ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />;
}

const Routes: RouteObject[] = [
  { path: ROUTES.HOME, element: <RootRedirect /> },
  {
    element: <PublicRoutes />,
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <AppLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
];

export default Routes;