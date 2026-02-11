import { Navigate, Outlet } from 'react-router-dom';
import { useRedux } from '../hooks/useRedux';
import { ROUTES } from './routePaths';

export default function PrivateRoutes() {
  const { useSelector } = useRedux();
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}