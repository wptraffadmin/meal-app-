import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MealsPage } from './pages/MealsPage';
import { MealPage } from './pages/MealPage';
import { SelectedMealsPage } from './pages/SelectedMealsPage';
import { Navigation } from './components/Navigation';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<MealsPage />} />
            <Route path="/meal/:id" element={<MealPage />} />
            <Route path="/selected" element={<SelectedMealsPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};
