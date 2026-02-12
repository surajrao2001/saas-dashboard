import { useRedux } from '../../hooks/useRedux';

export function Dashboard() {
  const { useSelector } = useRedux();
  const user = useSelector((s) => s.auth.user);

  return (
    <main className="p-4 sm:p-6 lg:p-8 min-w-0">
      <h1 className="text-xl font-bold mb-4 sm:text-2xl">Dashboard</h1>
      <p className="text-text-muted">Welcome, {user?.name ?? user?.email ?? 'User'}!</p>
    </main>
  );
}
