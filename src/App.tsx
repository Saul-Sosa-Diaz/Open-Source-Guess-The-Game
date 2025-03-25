import './HomeScreen.styles.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeScreen } from './HomeScreen.tsx';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}


export default App;
