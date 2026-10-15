import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { ToastContainer } from './components/common/ToastContainer';
import { CustomCursor } from './components/common/CustomCursor';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <SmoothScrollProvider>
          <AppRoutes />
          <ToastContainer />
          <CustomCursor />
        </SmoothScrollProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
