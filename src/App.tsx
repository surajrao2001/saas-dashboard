import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import store from './redux/store';
import routes from './routes/Routes';

const queryClient = new QueryClient();

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" />
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}
export default App;
