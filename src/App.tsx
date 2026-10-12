import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { ToastContainer } from './components/common/ToastContainer';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppRoutes />
        <ToastContainer />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;

