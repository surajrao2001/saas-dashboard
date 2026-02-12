import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@surajrao/my-ui-library';
import { useRedux } from '../../hooks/useRedux';
import { logout } from '../../redux/slices/authSlice';
import { ROUTES } from '../../routes/routePaths';
import { AppLogo } from '../brand/AppLogo';

export function AppLayout() {
  const navigate = useNavigate();
  const { useSelector, dispatch } = useRedux();
  const user = useSelector((s) => s.auth.user);

  function handleLogout() {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  }

  return (
    <div className="min-h-screen min-w-0 flex flex-col overflow-x-hidden">
      <header className="border-b border-border bg-surface px-4 py-3 sm:px-6 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <Link to={ROUTES.DASHBOARD} className="text-lg font-bold sm:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">
          <AppLogo variant="full" />
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-text-muted truncate min-w-0 max-w-[180px] sm:max-w-none">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout} className="min-h-11 min-w-[44px] sm:min-h-0 sm:min-w-0 shrink-0">
            Log out
          </Button>
        </div>
      </header>
      <div className="flex-1 flex flex-col md:flex-row min-h-0 min-w-0">
        <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-border bg-surface px-4 py-3 md:p-4 shrink-0">
          <nav className="flex flex-row gap-2 md:flex-col md:space-y-2 md:gap-0">
            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center min-h-11 px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-muted tap-target md:block md:min-h-0"
            >
              Dashboard
            </Link>
          </nav>
        </aside>
        <div className="flex-1 overflow-auto min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
